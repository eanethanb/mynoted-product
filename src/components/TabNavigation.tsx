import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabNavigation = ({ tabs, activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <nav className="mb-8">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all border-2',
              activeTab === tab.id
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:bg-primary/5 hover:text-foreground'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default TabNavigation;
