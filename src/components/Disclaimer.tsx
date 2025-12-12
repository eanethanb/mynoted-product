import { AlertCircle } from 'lucide-react';

const Disclaimer = () => {
  return (
    <div className="mt-8 border-t border-border pt-6">
      <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-4">
        <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">
          AI-generated insight only. Not professional advice. No guarantees of job placement or accuracy.
          MyNoted assumes no liability for actions or outcomes based on this report.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
