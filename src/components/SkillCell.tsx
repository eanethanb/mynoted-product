import { cn } from '@/lib/utils';

interface SkillCellProps {
  score: number;
  isUser?: boolean;
}

const getSkillColor = (score: number): string => {
  switch (score) {
    case 0:
      return 'bg-skill-novice text-foreground';
    case 1:
      return 'bg-skill-developing text-foreground';
    case 2:
      return 'bg-skill-proficient text-primary-foreground';
    case 3:
      return 'bg-skill-expert text-primary-foreground';
    default:
      return 'bg-skill-novice text-foreground';
  }
};

const SkillCell = ({ score, isUser }: SkillCellProps) => {
  return (
    <div
      className={cn(
        'flex h-10 w-full items-center justify-center text-sm font-medium',
        getSkillColor(score),
        isUser && 'ring-2 ring-primary ring-offset-1'
      )}
    >
      {score}
    </div>
  );
};

export default SkillCell;
