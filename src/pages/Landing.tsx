import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, BarChart3, Users, BookOpen } from "lucide-react";

const Landing = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = employeeId.trim();
    if (!trimmed) return;

    setLoading(true);
    setError("");

    // Navigate to report page — it will handle fetching
    navigate(`/report/${trimmed}`);
  };

  return (
    <div className="min-h-screen bg-background font-poppins flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-3 md:px-6 md:py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">M</span>
            </div>
            <span className="text-base font-semibold text-foreground md:text-lg">MyNoted AI</span>
          </div>
          <span className="hidden text-sm text-muted-foreground sm:block">
            Career Intelligence Workspace
          </span>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 md:py-20">
        <div className="w-full max-w-xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            <BarChart3 className="h-3.5 w-3.5" />
            AI-Powered Career Intelligence
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Employee Skill
            <span className="text-primary"> Report</span>
          </h1>

          <p className="mt-4 text-sm text-muted-foreground md:text-base max-w-md mx-auto leading-relaxed">
            Enter an employee ID to generate a comprehensive skill gap analysis,
            peer comparison, and personalised upskilling roadmap.
          </p>

          {/* Input */}
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="relative flex items-center gap-2 mx-auto max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Paste employee ID (UUID)"
                  value={employeeId}
                  onChange={(e) => {
                    setEmployeeId(e.target.value);
                    setError("");
                  }}
                  className="h-12 pl-10 pr-4 text-sm md:text-base rounded-xl border-border/60 bg-card shadow-sm focus-visible:ring-primary"
                />
              </div>
              <Button
                type="submit"
                disabled={!employeeId.trim() || loading}
                className="h-12 px-6 rounded-xl gap-2 shadow-sm"
              >
                {loading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">View Report</span>
              </Button>
            </div>
            {error && (
              <p className="mt-3 text-sm text-destructive">{error}</p>
            )}
          </form>

          {/* Feature pills */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: Users, label: "Peer Comparison" },
              { icon: BarChart3, label: "Skill Heatmap" },
              { icon: BookOpen, label: "Course Plans" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm"
              >
                <Icon className="h-3.5 w-3.5 text-primary" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card px-4 py-3 text-center text-xs text-muted-foreground">
        MyNoted AI · Career Intelligence Platform
      </footer>
    </div>
  );
};

export default Landing;
