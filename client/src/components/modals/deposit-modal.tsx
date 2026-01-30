import { useState } from "react";
import { X, CreditCard, ChevronRight, CheckCircle2, Wallet } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  userBalance: number;
  onDepositSuccess: (newBalance: number) => void;
}

export function DepositModal({ isOpen, onClose, userBalance, onDepositSuccess }: DepositModalProps) {
  const { toast } = useToast();
  const [selectedAmount, setSelectedAmount] = useState<number>(300);
  const [loading, setLoading] = useState(false);

  const amounts = [300, 500, 700, 1000, 1500, 1999];

  const handleRecharge = async () => {
    setLoading(true);
    try {
      const db = (window as any).firebase.firestore();
      const currentUser = (window as any).firebase.auth().currentUser;
      
      if (currentUser) {
        const newBalance = userBalance + selectedAmount;
        
        // Update database
        await db.collection("users").doc(currentUser.uid).update({
          balance: newBalance,
          lastDeposit: selectedAmount,
          deposit_at: (window as any).firebase.firestore.FieldValue.serverTimestamp()
        });

        // Log transaction
        await db.collection("transactions").add({
          uid: currentUser.uid,
          amount: selectedAmount,
          type: "deposit",
          status: "success",
          timestamp: (window as any).firebase.firestore.FieldValue.serverTimestamp()
        });

        onDepositSuccess(newBalance);
        toast({
          title: "Recharge Successful",
          description: `₹${selectedAmount} has been added to your wallet.`,
        });
        onClose();
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Recharge Failed",
        description: error.message,
      });
    }
    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-dark border-emerald-500/30 text-white max-w-sm p-0 rounded-[2.5rem] overflow-hidden gap-0">
        <div className="relative p-8">
          <div className="absolute top-6 right-6">
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                <Wallet className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Wallet</p>
                <p className="text-lg font-black text-white">₹{userBalance}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-black text-white tracking-tight mb-1">Select Recharge Amount</h2>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Choose a predefined amount</p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-8">
            {amounts.map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedAmount(amount)}
                className={`relative overflow-hidden py-4 rounded-2xl border transition-all duration-300 ${
                  selectedAmount === amount 
                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {selectedAmount === amount && (
                  <div className="absolute top-1.5 right-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  </div>
                )}
                <span className="text-sm font-black">₹{amount}</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleRecharge}
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            {loading ? (
              "Processing..."
            ) : (
              <>
                <span>Recharge Now</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <div className="mt-8 flex items-center justify-center gap-2 opacity-40">
            <CreditCard className="w-3 h-3 text-emerald-500" />
            <span className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">Secure Payment Gateway</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
