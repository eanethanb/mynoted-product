import { useState } from "react";
import { useReportData } from "@/contexts/ReportContext";
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
  const { peers, axisOptions } = useReportData();

  // Default to the first x and y axis options
  const defaultXId = (axisOptions.xAxis[0] as AxisOption | undefined)?.id ?? "x0";
  const defaultYId = (axisOptions.yAxis[0] as AxisOption | undefined)?.id ?? "y0";

  const [xAxis, setXAxis] = useState(defaultXId);
  const [yAxis, setYAxis] = useState(defaultYId);
  const [showPaywall, setShowPaywall] = useState(false);

  const handleRecalculate = () => {
    setShowPaywall(true);
  };

  // When user changes axis selection, show paywall
  const handleXAxisChange = (value: string) => {
    if (value !== defaultXId) {
      setShowPaywall(true);
      return;
    }
    setXAxis(value);
  };

  const handleYAxisChange = (value: string) => {
    if (value !== defaultYId) {
      setShowPaywall(true);
      return;
    }
    setYAxis(value);
  };

  const getAxisLabel = (axis: "x" | "y", id: string) => {
    const list =
      axis === "x"
        ? (axisOptions.xAxis as AxisOption[])
        : (axisOptions.yAxis as AxisOption[]);
    const found = list.find((opt) => opt.id === id);
    return found?.label ?? id;
  };

  // Use peer xScore/yScore for default axis positioning (0-10 scale)
  const getPeerPosition = (peerId: string) => {
    const peer = peers.find((p: any) => p.id === peerId);
    if (peer) {
      return { x: (peer.xScore / 10) * 100, y: 100 - (peer.yScore / 10) * 100 };
    }
    return { x: 50, y: 50 };
  };

  const xAxisLabel = getAxisLabel("x", xAxis);
  const yAxisLabel = getAxisLabel("y", yAxis);

  // Short display name: first name only
  const getShortName = (peer: typeof peers[0]) => {
    return peer.name.split(" ")[0];
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-semibold text-foreground">
          Skill Mapping vis-à-vis Peers
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Positioning analysis among peer cohort
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
            <Select value={xAxis} onValueChange={handleXAxisChange}>
              <SelectTrigger className="w-64">
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
            <Select value={yAxis} onValueChange={handleYAxisChange}>
              <SelectTrigger className="w-64">
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
          <div className="absolute left-0 top-0 max-w-[100px] text-[10px] leading-tight text-muted-foreground/70">
            Strong {yAxisLabel?.split("&")[0]?.trim()}
          </div>
          <div className="absolute right-0 top-0 text-right max-w-[100px]">
            <div className="text-[10px] font-semibold text-success">★ Target Zone</div>
          </div>
          <div className="absolute bottom-0 left-0 max-w-[100px] text-[10px] leading-tight text-muted-foreground/50">
            Developing
          </div>
          <div className="absolute bottom-0 right-0 text-right max-w-[100px] text-[10px] leading-tight text-muted-foreground/70">
            Strong {xAxisLabel?.split("&")[0]?.trim()}
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
            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[11px] font-medium text-muted-foreground whitespace-nowrap">
              → {xAxisLabel}
            </div>
            <div className="absolute -left-7 top-1/2 origin-center -translate-y-1/2 -rotate-90 text-[11px] font-medium text-muted-foreground whitespace-nowrap">
              ↑ {yAxisLabel}
            </div>

            {/* Peer Points */}
            {peers.map((peer: any) => {
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
      <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span>You</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-primary/60" />
          <span>Peer</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-success" />
          <span>Target Zone (top-right)</span>
        </div>
      </div>

      <Disclaimer />

      <PaywallModal open={showPaywall} onClose={() => setShowPaywall(false)} />
    </div>
  );
};

export default SkillMapping;
