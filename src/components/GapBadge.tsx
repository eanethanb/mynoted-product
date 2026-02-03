import { cn } from '@/lib/utils';

interface GapBadgeProps {
  score: number;
  className?: string;
}

const GapBadge = ({ score, className }: GapBadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md bg-gap-badge px-2.5 py-1 text-xs font-medium text-gap-badge-foreground',
        className
      )}
    >
      Gap: {score}
    </span>
  );
};

export default GapBadge;
