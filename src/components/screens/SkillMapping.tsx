import { useState } from "react";
import { peers, axisOptions, quadrant, clusterDefinition } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PaywallModal from "@/components/PaywallModal";
import Disclaimer from "@/components/Disclaimer";
import { RefreshCw } from "lucide-react";

type AxisOption = {
  id: string;
  label: string;
};

const SkillMapping = () => {
  const [xAxis, setXAxis] = useState(
    (axisOptions.xAxis[0] as AxisOption | undefined)?.id ?? "x"
  );
  const [yAxis, setYAxis] = useState(
    (axisOptions.yAxis[0] as AxisOption | undefined)?.id ?? "y"
  );
  const [recalcCount, setRecalcCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);

  const handleRecalculate = () => {
    if (recalcCount >= 1) {
      setShowPaywall(true);
      return;
    }
    setRecalcCount((prev) => prev + 1);
  };

  const getAxisLabel = (axis: "x" | "y", id: string) => {
    const list =
      axis === "x"
        ? (axisOptions.xAxis as AxisOption[])
        : (axisOptions.yAxis as AxisOption[]);
    const found = list.find((opt) => opt.id === id);
    return found?.label ?? id;
  };

  // Use quadrant data for positions (x, y are 0-10 scale)
  const getPeerPosition = (peerId: string) => {
    const q = quadrant.find((q) => q.personId === peerId);
    if (q) {
      return { x: (q.x / 10) * 100, y: 100 - (q.y / 10) * 100 };
    }
    // Fallback to peer xScore/yScore
    const peer = peers.find((p) => p.id === peerId);
    if (peer) {
      return { x: (peer.xScore / 10) * 100, y: 100 - (peer.yScore / 10) * 100 };
    }
    return { x: 50, y: 50 };
  };

  const xAxisLabel = getAxisLabel("x", xAxis);
  const yAxisLabel = getAxisLabel("y", yAxis);

  // Short display name: first name only
  const getShortName = (peer: typeof peers[0]) => {
    if (peer.isUser) return peer.name.split(" ")[0];
    return peer.name.split(" ")[0];
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold text-foreground">
          Skill Mapping vis-à-vis Peers
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Positioning analysis among {clusterDefinition?.axes?.x?.label ?? "peers"} cohort
        </p>
      </div>

      {/* Axis Selectors */}
      <div className="mb-4 rounded-lg border border-primary/20 bg-accent/30 p-4">
        <p className="mb-3 text-sm text-muted-foreground">
          Adjust axes to reflect your role.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">X-axis:</span>
            <Select value={xAxis} onValueChange={setXAxis}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(axisOptions.xAxis as AxisOption[]).map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Y-axis:</span>
            <Select value={yAxis} onValueChange={setYAxis}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(axisOptions.yAxis as AxisOption[]).map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleRecalculate} variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Recalculate Position
          </Button>
        </div>
      </div>

      {/* Quadrant Chart */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="relative mx-auto aspect-square max-w-2xl">
          {/* Quadrant Labels */}
          <div className="absolute left-0 top-0 text-xs text-muted-foreground">
            <div>Low {xAxisLabel}</div>
            <div>High {yAxisLabel}</div>
          </div>
          <div className="absolute right-0 top-0 text-right">
            <div className="text-xs font-medium text-success">Target Zone</div>
            <div className="text-xs text-success">
              High {xAxisLabel} + {yAxisLabel}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 text-xs text-muted-foreground">
            <div>Low {xAxisLabel}</div>
            <div>Low {yAxisLabel}</div>
          </div>
          <div className="absolute bottom-0 right-0 text-right text-xs text-muted-foreground">
            <div>High {xAxisLabel}</div>
            <div>Low {yAxisLabel}</div>
          </div>

          {/* Quadrant Grid */}
          <div className="absolute inset-8 border border-border">
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
              <div className="border-b border-r border-border bg-muted/30" />
              <div className="border-b border-border bg-success/10" />
              <div className="border-r border-border" />
              <div />
            </div>

            {/* Axis Labels */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
              {xAxisLabel}
            </div>
            <div className="absolute -left-6 top-1/2 origin-center -translate-y-1/2 -rotate-90 text-xs text-muted-foreground">
              {yAxisLabel}
            </div>

            {/* Peer Points */}
            {peers.map((peer) => {
              const pos = getPeerPosition(peer.id);
              return (
                <div
                  key={peer.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                  <div
                    className={`flex h-8 items-center justify-center rounded-full px-3 text-xs font-medium ${
                      peer.isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/80 text-primary-foreground"
                    }`}
                  >
                    {getShortName(peer)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary" />
          <span className="text-muted-foreground">
            Top Left (High {yAxisLabel}, Low {xAxisLabel}) - Strong {yAxisLabel}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-success" />
          <span className="text-muted-foreground">
            Top Right (High {yAxisLabel}, High {xAxisLabel}) - Complete profile —
            target zone
          </span>
        </div>
      </div>

      <Disclaimer />

      <PaywallModal open={showPaywall} onClose={() => setShowPaywall(false)} />
    </div>
  );
};

export default SkillMapping;
