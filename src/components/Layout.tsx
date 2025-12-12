import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background font-poppins">
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">M</span>
            </div>
            <span className="text-lg font-semibold text-foreground">MyNoted AI</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Career Intelligence Workspace</span>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
