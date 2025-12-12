import { useState } from 'react';
import { peers } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Edit2, Plus, X, Link } from 'lucide-react';
import PaywallModal from '@/components/PaywallModal';
import Disclaimer from '@/components/Disclaimer';

const PeerProfiles = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [editCount, setEditCount] = useState(0);
  const [peerList, setPeerList] = useState(peers);
  const [newPeerUrl, setNewPeerUrl] = useState('');
  const [removedPeer, setRemovedPeer] = useState<string | null>(null);

  const handleRemovePeer = (peerId: string) => {
    if (editCount >= 2) {
      setShowPaywall(true);
      return;
    }
    setPeerList((prev) => prev.filter((p) => p.id !== peerId));
    setRemovedPeer(peerId);
    setEditCount((prev) => prev + 1);
  };

  const handleAddPeer = () => {
    if (editCount >= 2) {
      setShowPaywall(true);
      return;
    }
    if (newPeerUrl.includes('linkedin.com')) {
      // Simulate adding peer
      setNewPeerUrl('');
      setEditCount((prev) => prev + 1);
      setShowEditModal(false);
    }
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
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="sm:max-w-md">
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
              <h4 className="mb-2 text-sm font-medium text-foreground">Add New Peer</h4>
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
              <p className="mt-1.5 text-xs text-muted-foreground">
                Free tier: 2 peer edits. Upgrade for unlimited edits.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Disclaimer />

      <PaywallModal open={showPaywall} onClose={() => setShowPaywall(false)} />
    </div>
  );
};

export default PeerProfiles;
