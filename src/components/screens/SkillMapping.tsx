import { useState } from "react";
import { peers, axisOptions } from "@/data/mockData";
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

// Local type to describe axis option shape
type AxisOption = {
  id: string;
  label: string;
};

const SkillMapping = () => {
  // Use the first option's id as default, fall back to simple strings if needed
  const [xAxis, setXAxis] = useState(
    (axisOptions.xAxis[0] as AxisOption | undefined)?.id ?? "Product"
  );
  const [yAxis, setYAxis] = useState(
    (axisOptions.yAxis[0] as AxisOption | undefined)?.id ?? "Leadership"
  );
  const [recalcCount, setRecalcCount] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);

  const handleRecalculate = () => {
    if (recalcCount >= 1) {
      setShowPaywall(true);
      return;
    }
    setRecalcCount((prev) => prev + 1);
    // Future: trigger real recalculation here
  };

  // Get display label from id
  const getAxisLabel = (axis: "x" | "y", id: string) => {
    const list =
      axis === "x"
        ? (axisOptions.xAxis as AxisOption[])
        : (axisOptions.yAxis as AxisOption[]);
    const found = list.find((opt) => opt.id === id);
    return found?.label ?? id;
  };

  // Position mapping for peers on the quadrant
  const getPeerPosition = (peer: (typeof peers)[0]) => {
    // Normalize to percentage positions
    const x = (peer.productTechScore / 10) * 100;
    const y = 100 - (peer.gtmScore / 10) * 100; // Invert Y for CSS
    return { x, y };
  };

  const xAxisLabel = getAxisLabel("x", xAxis);
  const yAxisLabel = getAxisLabel("y", yAxis);

  return (
    <div className="animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold text-foreground">
          Skill Mapping vis-à-vis Peers
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Positioning analysis among retail leadership cohort
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
            <div>High GTM</div>
          </div>
          <div className="absolute right-0 top-0 text-right">
            <div className="text-xs font-medium text-success">Target Zone</div>
            <div className="text-xs text-success">
              High {xAxisLabel} + GTM
            </div>
          </div>
          <div className="absolute bottom-0 left-0 text-xs text-muted-foreground">
            <div>Low {xAxisLabel}</div>
            <div>Low GTM</div>
          </div>
          <div className="absolute bottom-0 right-0 text-right text-xs text-muted-foreground">
            <div>High {xAxisLabel}</div>
            <div>Low GTM</div>
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
              {xAxisLabel}/Tech Depth
            </div>
            <div className="absolute -left-6 top-1/2 origin-center -translate-y-1/2 -rotate-90 text-xs text-muted-foreground">
              {yAxisLabel}
            </div>

            {/* Peer Points */}
            {peers.map((peer) => {
              const pos = getPeerPosition(peer);
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
                    {peer.isUser ? "Betsy" : peer.name.split(" ")[0]}
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
            Top Left (High GTM, Low {xAxisLabel}) - Strong operators & GTM
            leaders
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-success" />
          <span className="text-muted-foreground">
            Top Right (High GTM, High {xAxisLabel}) - Complete CEO profile —
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
