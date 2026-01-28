import { useState } from "react";
import { Key, ShieldCheck, X, MessageCircle, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
        title: "Activation Successful!",
        description: "Your premium features are now unlocked.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid Code",
        description: "Please enter a valid Access Code or contact support via WhatsApp.",
      });
    }
  };

  const handleWhatsAppRedirect = () => {
    window.open("https://wa.me/916294712704?text=Hello, I need the Access Code for Lucky Search.", "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#0f172a] border-slate-800 text-white max-w-sm p-8 rounded-[2.5rem] gap-0 shadow-2xl overflow-hidden">
        <div className="text-center space-y-6">
          {/* Success Icon */}
          <div className="relative">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white tracking-tight">Payment Successful!</h2>
            <p className="text-slate-400 text-sm leading-relaxed px-4">
              To activate your subscription and access features, you need an Access Code.
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-5 h-5 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-amber-500 text-xs font-bold">i</span>
            </div>
            <p className="text-[11px] text-slate-400 text-left">
              Click the button below to get your code via WhatsApp.
            </p>
          </div>

          {/* WhatsApp Button */}
          <button 
            onClick={handleWhatsAppRedirect}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-lg flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20 hover:opacity-90 transition-all active:scale-[0.98]"
          >
            <MessageCircle className="w-6 h-6" />
            Get Access Code
          </button>

          <div className="flex items-center gap-4 py-2">
            <div className="h-px bg-slate-800 flex-1" />
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Or enter your code</span>
            <div className="h-px bg-slate-800 flex-1" />
          </div>

          {/* Code Input */}
          <div className="space-y-4">
            <input 
              type="text" 
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="ENTER ACCESS CODE"
              className="w-full bg-slate-900/50 border border-emerald-500/50 rounded-2xl px-4 py-4 text-center text-xl font-black tracking-[0.2em] text-emerald-400 placeholder:text-slate-700 focus:outline-none focus:border-emerald-500 transition-all shadow-inner"
            />
            
            <button 
              onClick={handleActivate}
              className="w-full py-4 rounded-2xl bg-emerald-500 text-white font-black text-lg shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-all active:scale-[0.98]"
            >
              Activate Subscription
            </button>
            
            <button 
              onClick={onClose}
              className="w-full text-slate-500 font-bold text-sm hover:text-slate-300 transition-colors"
            >
              Activate Later
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
