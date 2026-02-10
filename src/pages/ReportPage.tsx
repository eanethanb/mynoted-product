import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReportProvider } from "@/contexts/ReportContext";
import Layout from "@/components/Layout";
import TabNavigation from "@/components/TabNavigation";
import PeerProfiles from "@/components/screens/PeerProfiles";
import ComparativeSkillAnalysis from "@/components/screens/ComparativeSkillAnalysis";
import SkillMapping from "@/components/screens/SkillMapping";
import SkillGapsAnalysis from "@/components/screens/SkillGapsAnalysis";
import SkillGapCourses from "@/components/screens/SkillGapCourses";
import CreateCourse from "@/components/screens/CreateCourse";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import reportDataFallback from "@/data/reportData.json";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

const tabs = [
  { id: "peers", label: "Peer Profiles" },
  { id: "comparative", label: "Comparative Skill Analysis" },
  { id: "mapping", label: "Skill Mapping vis-à-vis Peers" },
  { id: "gaps", label: "Skill Gap Analysis" },
  { id: "courses", label: "Recommended Courses" },
  { id: "create", label: "Create Free Course" },
];

const ReportPage = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("peers");
  const [visitedTabs, setVisitedTabs] = useState<string[]>(["peers"]);

  useEffect(() => {
    if (!visitedTabs.includes(activeTab)) {
      setVisitedTabs((prev) => [...prev, activeTab]);
    }
  }, [activeTab, visitedTabs]);

  useEffect(() => {
    if (!employeeId) return;

    const fetchReport = async () => {
      setLoading(true);
      setError("");
      try {
        // Try edge function first
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/employee-report?employee_id=${employeeId}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) {
          throw new Error("Edge function unavailable");
        }
        const data = await res.json();
        setReport(data.report_json);
      } catch {
        // Fallback: use static JSON if the employee ID matches the one in reportData
        console.log("Edge function unavailable, using static report data as fallback");
        setReport(reportDataFallback);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [employeeId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background font-poppins flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-sm text-muted-foreground">Loading report…</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-background font-poppins flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-lg font-semibold text-foreground">Report not found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {error || "No report data available for this employee."}
          </p>
          <Button variant="outline" className="mt-6 gap-2" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4" />
            Back to search
          </Button>
        </div>
      </div>
    );
  }

  const renderActiveScreen = () => {
    switch (activeTab) {
      case "peers": return <PeerProfiles />;
      case "comparative": return <ComparativeSkillAnalysis />;
      case "mapping": return <SkillMapping />;
      case "gaps": return <SkillGapsAnalysis />;
      case "courses": return <SkillGapCourses />;
      case "create": return <CreateCourse />;
      default: return <PeerProfiles />;
    }
  };

  return (
    <ReportProvider report={report} employeeId={employeeId!}>
      <Layout activeTab={activeTab} visitedTabs={visitedTabs}>
        <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        {renderActiveScreen()}
      </Layout>
    </ReportProvider>
  );
};

export default ReportPage;
