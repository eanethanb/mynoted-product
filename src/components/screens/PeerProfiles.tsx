
// src/components/screens/PeerProfiles.tsx

import { useMemo, useState } from "react";
import { peers as reportPeers, meta, executiveSummary } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,

} from "@/components/ui/dialog";
import {
  Edit2,
  Plus,
  X,
  Link,
  Upload as UploadIcon,
  Check,
  FileText,
  PartyPopper,
} from "lucide-react";
import WaitlistModal from "@/components/WaitlistModal";
import Disclaimer from "@/components/Disclaimer";

interface PeerEntry {
  url: string;
  context: string;
  image: File | null;
  imagePreview: string | null;
}

const createEmptyPeerEntry = (): PeerEntry => ({
  url: '',
  context: '',
  image: null,
  imagePreview: null,
});

const PeerProfiles = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showWaitlist, setShowWaitlist] = useState(false);

  const [peerList] = useState<any[]>(reportPeers);
  const [newPeerUrl, setNewPeerUrl] = useState("");

  const [peerEntries, setPeerEntries] = useState<PeerEntry[]>([createEmptyPeerEntry()]);

  const addAnotherPeer = () => {
    setPeerEntries((prev) => [...prev, createEmptyPeerEntry()]);
  };

  const resetPeerEntries = () => {
    setPeerEntries([createEmptyPeerEntry()]);
    setNewPeerUrl("");
  };

  const [showProfileWaitlistModal, setShowProfileWaitlistModal] = useState(false);
  const [profileWaitlistJoined, setProfileWaitlistJoined] = useState(false);

  const nonUserPeers = useMemo(
    () => peerList.filter((p: any) => !p?.isUser),
    [peerList]
  );

  const handleRemovePeer = (_peerId: string) => {
    setShowWaitlist(true);
  };

  const handleAddPeer = () => {
    setShowWaitlist(true);
  };

  const handleUploadClick = () => {
    setShowProfileWaitlistModal(true);
  };

  const handleJoinProfileWaitlist = () => {
    setProfileWaitlistJoined(true);
  };

  return (
    <div className="animate-fade-in">
      {/* Header + Edit button */}
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-semibold text-foreground md:text-lg">
          Peer Profiles
        </h2>
        <Button variant="outline" size="sm" onClick={() => setShowEditModal(true)}>
          <Edit2 className="mr-2 h-4 w-4" />
          Edit Peer Set
        </Button>
      </div>

      {/* Add Your Profile block */}
      <div className="mb-4 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 via-accent/30 to-background p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-foreground">
              Add Your Profile{" "}
              <span className="text-muted-foreground font-normal">(Optional)</span>
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Improve accuracy by adding your resume or LinkedIn profile.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
              onClick={handleUploadClick}
            >
              <UploadIcon className="mr-2 h-3.5 w-3.5" />
              Upload Resume
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
              onClick={handleUploadClick}
            >
              <UploadIcon className="mr-2 h-3.5 w-3.5" />
              Upload LinkedIn PDF
            </Button>
          </div>
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground/70">
          This improves skill analysis and peer comparison accuracy.
        </p>
      </div>

      {/* Peer cards */}
      <div className="space-y-3">
        {peerList.map((peer: any) => (
          <div
            key={peer.id}
            className={`rounded-lg border bg-card p-3 transition-shadow hover:shadow-sm md:p-4 ${
              peer.isUser ? "border-primary bg-primary/5" : "border-border"
            }`}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div className="flex-1 min-w-0">

                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground md:text-base">
                    {peer.name}{" "}
                    <span className="font-normal text-muted-foreground">
                      ({peer.title}, {peer.company})
                    </span>
                  </h3>
                  {peer.isUser && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                      You
                    </span>
                  )}

                </div>
                <p className="mt-1 text-xs text-muted-foreground md:text-sm">
                  {peer.description}
                </p>
              </div>
              <div className="flex shrink-0 gap-3 text-xs md:text-sm">
                <span className="text-primary">X: {peer.xScore}</span>
                <span className="text-success">Y: {peer.yScore}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Peer Set Modal */}
      <Dialog open={showEditModal} onOpenChange={(open) => {
        setShowEditModal(open);
        if (!open) resetPeerEntries();
      }}>
        <DialogContent className="w-[100vw] max-w-[100vw] sm:w-[92vw] sm:max-w-[560px] md:max-w-[600px] p-0 gap-0 max-h-[90vh] flex flex-col">
          <DialogHeader className="px-4 py-4 sm:px-6 border-b border-border shrink-0">
            <DialogTitle>Edit Peer Set</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-sm font-medium text-foreground">
                Current Peers
              </h4>
              <div className="space-y-2">
                {nonUserPeers.map((peer: any) => (
                  <div
                    key={peer.id}
                    className="flex items-center justify-between rounded-md border border-border bg-muted/30 px-3 py-2"
                  >
                    <span className="text-sm text-foreground">{peer.name}</span>
                    <button
                      onClick={() => handleRemovePeer(peer.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}

              </div>
            </div>

            <div>

              <h4 className="mb-2 text-sm font-medium text-foreground">
                Add New Peer
              </h4>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Link className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Paste LinkedIn URL"
                    value={newPeerUrl}
                    onChange={(e) => setNewPeerUrl(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button onClick={handleAddPeer} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <button
                onClick={addAnotherPeer}
                className="mt-3 mb-4 flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                Add another peer
              </button>
            </div>
          </div>

          <div className="px-4 py-4 sm:px-6 border-t border-border bg-background shrink-0">
            <Button onClick={handleAddPeer} className="w-full">
              Add Peer{peerEntries.length > 1 ? 's' : ''}
            </Button>
            <p className="mt-2 text-xs text-muted-foreground text-center">
              Free tier: 2 peer edits. Upgrade for unlimited edits.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Profile-based analysis waitlist modal */}
      <Dialog
        open={showProfileWaitlistModal}
        onOpenChange={setShowProfileWaitlistModal}
      >
        <DialogContent className="sm:max-w-md">
          {!profileWaitlistJoined ? (
            <>
              <DialogHeader className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <DialogTitle className="text-xl font-semibold">
                  Profile-Based Analysis — Coming Soon
                </DialogTitle>
                <DialogDescription className="mt-2 text-sm text-muted-foreground">
                  We&apos;re building profile-based analysis to make your report more
                  accurate and personalised.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 rounded-xl border border-border bg-accent/30 p-4">
                <p className="mb-3 text-sm font-medium text-foreground">
                  What this will include:
                </p>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">
                      Upload 1 resume or LinkedIn PDF
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">
                      Use it for 1 AI run only
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">
                      Improves skill analysis & peer comparison
                    </span>
                  </li>
                </ul>
              </div>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                One-time use · No payment required
              </p>

              <div className="mt-4 flex flex-col gap-2">
                <Button
                  onClick={handleJoinProfileWaitlist}
                  className="w-full rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  Join the Waitlist
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowProfileWaitlistModal(false)}
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
                  You&apos;re on the waitlist 🎉
                </DialogTitle>
                <DialogDescription className="mt-3 text-sm text-muted-foreground">
                  Thanks for joining!
                  <br />
                  We&apos;re working on this feature and will reach out once it&apos;s
                  ready for you to try.
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6">
                <Button
                  onClick={() => {
                    setShowProfileWaitlistModal(false);
                    setProfileWaitlistJoined(false);
                  }}
                  className="w-full rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  Return to report
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Disclaimer />
      <WaitlistModal open={showWaitlist} onClose={() => setShowWaitlist(false)} />
    </div>
  );
};

export default PeerProfiles;
