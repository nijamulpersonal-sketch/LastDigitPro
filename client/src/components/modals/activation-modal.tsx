import { useState } from "react";
import { Key, ShieldCheck, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface ActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ActivationModal({ isOpen, onClose, onSuccess }: ActivationModalProps) {
  const [code, setCode] = useState("");
  const { toast } = useToast();

  const handleActivate = () => {
    // Mock activation code check
    if (code.trim() === "VIP777") {
      onSuccess();
      toast({
        title: "Feature Unlocked!",
        description: "You now have full access to Premium Predictions.",
      });
      onClose();
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Code",
        description: "Please enter a valid Access Code or contact support.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-dark border-amber-500/30 text-white max-w-sm p-6 rounded-3xl gap-0">
        <DialogHeader className="mb-6">
          <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/20">
            <Key className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-2xl font-bold text-white text-center">Activate VIP Access</DialogTitle>
          <p className="text-gray-400 text-sm text-center mt-2">Enter your Access Code to unlock search</p>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <input 
              type="text" 
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="ENTER ACCESS CODE"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-center text-xl font-bold tracking-widest text-amber-400 placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50 transition"
            />
          </div>
          
          <button 
            onClick={handleActivate}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-700 text-white font-bold text-lg shadow-lg shadow-amber-500/20"
          >
            ACTIVATE NOW
          </button>
          
          <p className="text-[10px] text-gray-500 text-center">
            Don't have a code? Contact support via WhatsApp to get your unique access code.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
