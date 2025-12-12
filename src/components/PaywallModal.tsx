import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Sparkles } from 'lucide-react';

interface PaywallModalProps {
  open: boolean;
  onClose: () => void;
}

const features = [
  'Unlimited peer editing',
  'Unlimited skill refinements',
  'Unlimited quadrant simulations',
  'Unlimited custom courses',
  'Unlimited JD → Course',
  'Unlimited Manager Feedback → Course',
  'Resume upload for more accurate recommendations',
  'Set future goals',
  'Save multiple versions of reports',
  'AI-refined learning path',
];

const PaywallModal = ({ open, onClose }: PaywallModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl font-semibold">
            Unlock Unlimited Personalisation & Career Intelligence
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                <Check className="h-3 w-3 text-primary-foreground" />
              </div>
              <span className="text-sm text-foreground">{feature}</span>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Button className="w-full" size="lg" variant="premium">
            Upgrade to MyNoted Pro
          </Button>
          <button
            onClick={onClose}
            className="mt-3 w-full text-center text-sm text-muted-foreground hover:text-foreground"
          >
            Maybe later
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaywallModal;
