import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, PartyPopper } from 'lucide-react';

interface WaitlistModalProps {
  open: boolean;
  onClose: () => void;
}

const featureChecklist = [
  'Edit up to 2 peers',
  'Add & prioritise up to 2 skill gaps',
  'Refine skill mapping',
  'Create 1 personalised course (Topics, PDFs, Textbooks)',
  'Add JD or manager feedback (1 time)',
  'Re-run AI once',
];

const WaitlistModal = ({ open, onClose }: WaitlistModalProps) => {
  const [hasJoined, setHasJoined] = useState(false);

  const handleJoinWaitlist = () => {
    setHasJoined(true);
  };

  const handleClose = () => {
    setHasJoined(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {!hasJoined ? (
          <>
            <DialogHeader className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <DialogTitle className="text-xl font-semibold">
                One-Time Free Preview — Coming Soon
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm text-muted-foreground">
                We're building MyNoted AI's collaborative editing experience.
                When it's ready, you'll get one free, full preview to personalise and re-run your report.
              </DialogDescription>
            </DialogHeader>

            {/* Feature Checklist */}
            <div className="mt-4 rounded-xl border border-border bg-accent/30 p-4">
              <ul className="space-y-2.5">
                {featureChecklist.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Helper Text */}
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Free · One-time · No payment required
            </p>

            {/* CTAs */}
            <div className="mt-4 flex flex-col gap-2">
              <Button
                onClick={handleJoinWaitlist}
                className="w-full rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                Join the Waitlist
              </Button>
              <Button
                variant="ghost"
                onClick={handleClose}
                className="w-full text-muted-foreground hover:text-foreground"
              >
                Not now
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader className="text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
                <PartyPopper className="h-7 w-7 text-success" />
              </div>
              <DialogTitle className="text-xl font-semibold">
                You're on the waitlist 🎉
              </DialogTitle>
              <DialogDescription className="mt-3 text-sm text-muted-foreground">
                Thanks for joining!
                <br />
                We're working on these features and will reach out as soon as they're ready for you to try.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6">
              <Button
                onClick={handleClose}
                className="w-full rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                Return to report
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WaitlistModal;
