import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReportProvider } from "@/contexts/ReportContext";
import Layout from "@/components/Layout";
import TabNavigation from "@/components/TabNavigation";
import PeerProfiles from "@/components/screens/PeerProfiles";
import ComparativeSkillAnalysis from "@/components/screens/ComparativeSkillAnalysis";
import SkillMapping from "@/components/screens/SkillMapping";
import SkillGapsAnalysis from "@/components/screens/SkillGapsAnalysis";
import SkillGapCourses from "@/components/screens/SkillGapCourses";
import CreateCourse from "@/components/screens/CreateCourse";
import reportDataFallback from "@/data/reportData.json";

const tabs = [
  { id: "peers", label: "Peer Profiles" },
  { id: "comparative", label: "Comparative Skill Analysis" },
  { id: "mapping", label: "Skill Mapping" },
  { id: "gaps", label: "Skill Gaps Analysis" },
  { id: "courses", label: "Recommended Courses" },
  { id: "create", label: "Create Free Course" },
];

const ReportPage = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("peers");
  const [visitedTabs, setVisitedTabs] = useState<string[]>(["peers"]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (!visitedTabs.includes(tabId)) {
      setVisitedTabs((prev) => [...prev, tabId]);
    }
  };

  useEffect(() => {
    if (!employeeId) return;

    const fetchReport = async () => {
      setLoading(true);
      setError("");
      try {
        if (employeeId === "demo") {
          setReport(reportDataFallback);
          return;
        }

        const response = await fetch(
          "https://jzczviibesugpvbesujz.supabase.co/rest/v1/rpc/get_employee_report",
          {
            method: "POST",
            headers: {
              "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6Y3p2aWliZXN1Z3B2YmVzdWp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMjkyOTIsImV4cCI6MjA4NTcwNTI5Mn0.Up1wgn6TBQh6wV3vYGaFQuHuUhCPgb8j3Kf8H9h6kfE",
              "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6Y3p2aWliZXN1Z3B2YmVzdWp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMjkyOTIsImV4cCI6MjA4NTcwNTI5Mn0.Up1wgn6TBQh6wV3vYGaFQuHuUhCPgb8j3Kf8H9h6kfE",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ p_employee_id: employeeId }),
          }
        );

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || "Failed to fetch report");
        }

        const data = await response.json();
        if (!data) throw new Error("No report found");

        setReport(data);
      } catch (err: any) {
        const msg = err?.message || String(err);
        console.error("Report fetch failed:", msg, err);
        if (employeeId === "demo") {
          setReport(reportDataFallback);
        } else {
          setError(msg);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [employeeId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground text-lg animate-pulse">
          Loading report…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-2 max-w-lg px-4">
          <p className="text-destructive text-lg font-semibold">
            Failed to load report
          </p>
          <p className="text-muted-foreground text-sm break-all">{error}</p>
        </div>
      </div>
    );
  }

  if (!report) return null;

  const renderScreen = () => {
    switch (activeTab) {
      case "peers":
        return <PeerProfiles />;
      case "comparative":
        return <ComparativeSkillAnalysis />;
      case "mapping":
        return <SkillMapping />;
      case "gaps":
        return <SkillGapsAnalysis />;
      case "courses":
        return <SkillGapCourses />;
      case "create":
        return <CreateCourse />;
      default:
        return <PeerProfiles />;
    }
  };

  return (
    <ReportProvider report={report} employeeId={employeeId!}>
      <Layout activeTab={activeTab} visitedTabs={visitedTabs}>
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        {renderScreen()}
      </Layout>
    </ReportProvider>
  );
};

export default ReportPage;
