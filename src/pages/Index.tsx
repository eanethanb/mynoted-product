import { useState } from 'react';
import Layout from '@/components/Layout';
import TabNavigation from '@/components/TabNavigation';
import ComparativeSkillAnalysis from '@/components/screens/ComparativeSkillAnalysis';
import SkillMapping from '@/components/screens/SkillMapping';
import SkillGapsAnalysis from '@/components/screens/SkillGapsAnalysis';
import SwotAnalysis from '@/components/screens/SwotAnalysis';
import SkillGapCourses from '@/components/screens/SkillGapCourses';
import CustomCourse from '@/components/screens/CustomCourse';
import PeerProfiles from '@/components/screens/PeerProfiles';

const tabs = [
  { id: 'comparative', label: 'Comparative Skill Analysis' },
  { id: 'mapping', label: 'Skill Mapping vis-à-vis Peers' },
  { id: 'gaps', label: 'Skill Gaps Analysis' },
  { id: 'swot', label: 'SWOT vis-à-vis Peers' },
  { id: 'courses', label: 'Your Skill Gap Courses' },
  { id: 'custom', label: 'Custom Course for Your Skill Gap' },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('comparative');

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'comparative':
        return <ComparativeSkillAnalysis />;
      case 'mapping':
        return (
          <>
            <SkillMapping />
            <div className="mt-8">
              <PeerProfiles />
            </div>
          </>
        );
      case 'gaps':
        return <SkillGapsAnalysis />;
      case 'swot':
        return <SwotAnalysis />;
      case 'courses':
        return <SkillGapCourses />;
      case 'custom':
        return <CustomCourse />;
      default:
        return <ComparativeSkillAnalysis />;
    }
  };

  return (
    <Layout>
      <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      {renderActiveScreen()}
    </Layout>
  );
};

export default Index;
