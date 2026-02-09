import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import TabNavigation from "@/components/TabNavigation";
import PeerProfiles from "@/components/screens/PeerProfiles";
import ComparativeSkillAnalysis from "@/components/screens/ComparativeSkillAnalysis";
import SkillMapping from "@/components/screens/SkillMapping";
import SkillGapsAnalysis from "@/components/screens/SkillGapsAnalysis";
import SkillGapCourses from "@/components/screens/SkillGapCourses";
import CreateCourse from "@/components/screens/CreateCourse";

const tabs = [
  { id: "peers", label: "Peer Profiles" },
  { id: "comparative", label: "Comparative Skill Analysis" },
  { id: "mapping", label: "Skill Mapping vis-à-vis Peers" },
  { id: "gaps", label: "Skill Gap Analysis" },
  { id: "courses", label: "Recommended Courses" },
  { id: "create", label: "Create Free Course" },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("peers");
  const [visitedTabs, setVisitedTabs] = useState<string[]>(["peers"]);

  useEffect(() => {
    if (!visitedTabs.includes(activeTab)) {
      setVisitedTabs((prev) => [...prev, activeTab]);
    }
  }, [activeTab, visitedTabs]);

  const renderActiveScreen = () => {
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
    <Layout activeTab={activeTab} visitedTabs={visitedTabs}>
      <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      {renderActiveScreen()}
    </Layout>
  );
};

export default Index;

