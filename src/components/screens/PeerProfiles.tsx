import { useState, useRef } from 'react';
import { peers } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Edit2, Plus, X, Link, Upload as UploadIcon, Check, FileText, PartyPopper, Image, Trash2 } from 'lucide-react';
import WaitlistModal from '@/components/WaitlistModal';
import Disclaimer from '@/components/Disclaimer';

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
  const [peerList, setPeerList] = useState(peers);
  const [peerEntries, setPeerEntries] = useState<PeerEntry[]>([createEmptyPeerEntry()]);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  // Profile upload states
  const [showProfileWaitlistModal, setShowProfileWaitlistModal] = useState(false);
  const [profileWaitlistJoined, setProfileWaitlistJoined] = useState(false);

  const updatePeerEntry = (index: number, field: keyof PeerEntry, value: string | File | null) => {
    setPeerEntries(prev => prev.map((entry, i) => {
      if (i !== index) return entry;
      if (field === 'image') {
        const file = value as File | null;
        return {
          ...entry,
          image: file,
          imagePreview: file ? URL.createObjectURL(file) : null,
        };
      }
      return { ...entry, [field]: value };
    }));
  };

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image must be less than 5MB');
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('Only JPG and PNG formats are accepted');
        return;
      }
      updatePeerEntry(index, 'image', file);
    }
  };

  const removeImage = (index: number) => {
    updatePeerEntry(index, 'image', null);
  };

  const addAnotherPeer = () => {
    setPeerEntries(prev => [...prev, createEmptyPeerEntry()]);
  };

  const removePeerEntry = (index: number) => {
    if (peerEntries.length > 1) {
      setPeerEntries(prev => prev.filter((_, i) => i !== index));
    }
  };

  const resetPeerEntries = () => {
    setPeerEntries([createEmptyPeerEntry()]);
  };

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
      <div className="mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-semibold text-foreground md:text-lg">Peer Profiles</h2>
        <Button variant="outline" size="sm" onClick={() => setShowEditModal(true)}>
          <Edit2 className="mr-2 h-4 w-4" />
          Edit Peer Set
        </Button>
      </div>

      {/* Add Your Profile Block */}
      <div className="mb-4 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 via-accent/30 to-background p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-foreground">Add Your Profile <span className="text-muted-foreground font-normal">(Optional)</span></h3>
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

      <div className="space-y-3">
        {peerList.map((peer) => (
          <div
            key={peer.id}
            className={`rounded-lg border bg-card p-3 transition-shadow hover:shadow-sm md:p-4 ${
              peer.isUser ? 'border-primary bg-primary/5' : 'border-border'
            }`}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-foreground md:text-base">{peer.name}</h3>
                </div>
                <p className="mt-1 text-xs text-muted-foreground md:text-sm">{peer.description}</p>
              </div>
              <div className="flex shrink-0 gap-3 text-xs md:text-sm">
                <span className="text-primary">P/T: {peer.productTechScore}</span>
                <span className="text-success">GTM: {peer.gtmScore}</span>
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
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Peer Set</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-sm font-medium text-foreground">Current Peers</h4>
              <div className="space-y-2">
                {peerList
                  .filter((p) => !p.isUser)
                  .map((peer) => (
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
              <h4 className="mb-3 text-sm font-medium text-foreground">Add New Peer</h4>
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                {peerEntries.map((entry, index) => (
                  <div key={index} className="rounded-lg border border-border bg-muted/20 p-3 space-y-3">
                    {peerEntries.length > 1 && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">Peer {index + 1}</span>
                        <button
                          onClick={() => removePeerEntry(index)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                    
                    {/* URL Input */}
                    <div className="relative">
                      <Link className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Paste LinkedIn URL"
                        value={entry.url}
                        onChange={(e) => updatePeerEntry(index, 'url', e.target.value)}
                        className="pl-9"
                      />
                    </div>

                    {/* Peer Context */}
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-muted-foreground">
                        Peer Context <span className="font-normal">(Optional)</span>
                      </Label>
                      <Textarea
                        placeholder="Paste copied text from your peer's LinkedIn profile, or add brief notes about their role or experience..."
                        value={entry.context}
                        onChange={(e) => updatePeerEntry(index, 'context', e.target.value.slice(0, 1000))}
                        className="min-h-[80px] text-sm resize-none"
                        maxLength={1000}
                      />
                      <p className="text-[10px] text-muted-foreground/70">
                        Paste copied text from your peer's LinkedIn profile, or upload one screenshot of their profile. You may also add brief notes about their role or experience to improve accuracy.
                      </p>
                      <p className="text-[10px] text-muted-foreground/50 text-right">
                        {entry.context.length}/1,000
                      </p>
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-muted-foreground">
                        Profile Screenshot <span className="font-normal">(Optional)</span>
                      </Label>
                      {entry.imagePreview ? (
                        <div className="relative rounded-md border border-border bg-background p-2">
                          <div className="flex items-center gap-2">
                            <img 
                              src={entry.imagePreview} 
                              alt="Preview" 
                              className="h-12 w-12 rounded object-cover"
                            />
                            <span className="text-xs text-foreground truncate flex-1">
                              {entry.image?.name}
                            </span>
                            <button
                              onClick={() => removeImage(index)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => fileInputRefs.current[index]?.click()}
                          className="w-full rounded-md border border-dashed border-border bg-background px-3 py-3 text-xs text-muted-foreground hover:border-primary/50 hover:bg-accent/30 transition-colors"
                        >
                          <Image className="h-4 w-4 mx-auto mb-1" />
                          Upload LinkedIn profile screenshot
                        </button>
                      )}
                      <input
                        ref={(el) => { fileInputRefs.current[index] = el; }}
                        type="file"
                        accept="image/jpeg,image/png"
                        onChange={(e) => handleImageUpload(index, e)}
                        className="hidden"
                      />
                      <p className="text-[10px] text-muted-foreground/70">
                        Upload one LinkedIn profile screenshot (optional) · JPG, PNG · Max 5MB
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Another Peer */}
              <button
                onClick={addAnotherPeer}
                className="mt-3 flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
                Add another peer
              </button>

              <div className="mt-4 flex gap-2">
                <Button onClick={handleAddPeer} className="flex-1">
                  Add Peer{peerEntries.length > 1 ? 's' : ''}
                </Button>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Free tier: 2 peer edits. Upgrade for unlimited edits.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Profile Waitlist Modal */}
      <Dialog open={showProfileWaitlistModal} onOpenChange={setShowProfileWaitlistModal}>
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
                  We're building profile-based analysis to make your report more accurate and personalised.
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4 rounded-xl border border-border bg-accent/30 p-4">
                <p className="text-sm font-medium text-foreground mb-3">What this will include:</p>
                <ul className="space-y-2.5">
                  <li className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">Upload 1 resume or LinkedIn PDF</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">Use it for 1 AI run only</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">Improves skill analysis & peer comparison</span>
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
                  You're on the waitlist 🎉
                </DialogTitle>
                <DialogDescription className="mt-3 text-sm text-muted-foreground">
                  Thanks for joining!
                  <br />
                  We're working on this feature and will reach out once it's ready for you to try.
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
