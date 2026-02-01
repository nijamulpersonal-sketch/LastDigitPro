import { useState, useEffect } from "react";
import { X, Building2, Landmark, ShieldCheck, DollarSign } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { doc, onSnapshot, updateDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebase";

interface BankAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BankAccountModal({ isOpen, onClose }: BankAccountModalProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [bankData, setBankData] = useState({
    accountHolderName: "",
    accountNumber: "",
    reAccountNumber: "",
    ifscCode: "",
    bankName: "",
    upiId: ""
  });
  const [withdrawMethod, setWithdrawMethod] = useState<'bank' | 'upi'>('bank');
  const [isSaved, setIsSaved] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [userBalance, setUserBalance] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserBalance(data.balance || 0);
            
            if (data.bankDetails) {
              setBankData({
                accountHolderName: data.bankDetails.accountHolderName || "",
                accountNumber: data.bankDetails.accountNumber || "",
                reAccountNumber: data.bankDetails.accountNumber || "",
                ifscCode: data.bankDetails.ifscCode || "",
                bankName: data.bankDetails.bankName || "",
                upiId: data.bankDetails.upiId || ""
              });
              setIsSaved(true);
            }
          }
        });
        
        return () => unsubscribe();
      }
    }
  }, [isOpen]);

  const handleSaveBank = async () => {
    if (!bankData.accountHolderName || !bankData.accountNumber || !bankData.reAccountNumber || !bankData.ifscCode || !bankData.bankName || !bankData.upiId) {
      return toast({ variant: "destructive", title: "Error", description: "Please fill all fields" });
    }
    if (bankData.accountNumber !== bankData.reAccountNumber) {
      return toast({ variant: "destructive", title: "Error", description: "Account numbers do not match" });
    }

    setLoading(true);
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        await updateDoc(userDocRef, {
          bankDetails: {
            accountHolderName: bankData.accountHolderName,
            accountNumber: bankData.accountNumber,
            ifscCode: bankData.ifscCode,
            bankName: bankData.bankName,
            upiId: bankData.upiId,
            updatedAt: serverTimestamp()
          }
        });

        setIsSaved(true);
        toast({ title: "Success", description: "Bank details saved securely." });
      }
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
    setLoading(false);
  };

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount < 200) {
      return toast({ variant: "destructive", title: "Error", description: "Minimum withdrawal is ₹200" });
    }
    if (amount > userBalance) {
      return toast({ variant: "destructive", title: "Error", description: "Insufficient balance" });
    }

    setLoading(true);
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await addDoc(collection(db, "withdrawals"), {
          uid: currentUser.uid,
          amount: amount,
          status: "pending",
          method: withdrawMethod,
          details: withdrawMethod === 'bank' ? bankData.accountNumber : bankData.upiId,
          timestamp: serverTimestamp()
        });

        const userDocRef = doc(db, "users", currentUser.uid);
        await updateDoc(userDocRef, {
          balance: userBalance - amount
        });

        setWithdrawAmount("");
        toast({ title: "Request Sent", description: `Withdrawal request for ₹${amount} submitted` });
      }
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-dark border-amber-500/30 text-white max-w-sm p-0 rounded-[2.5rem] overflow-hidden gap-0">
        <div className="relative p-8 overflow-y-auto max-h-[85vh]">
          <div className="absolute top-6 right-6">
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="text-center mb-6">
            <div className="inline-flex p-4 bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl shadow-xl shadow-amber-500/20 mb-4">
              <Landmark className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">Bank Binding</h2>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Private & Secure</p>
          </div>

          <div className="space-y-4">
            {!isSaved ? (
              <div className="space-y-3">
                <input 
                  type="text" 
                  placeholder="Account Holder Name"
                  value={bankData.accountHolderName}
                  onChange={(e) => setBankData({...bankData, accountHolderName: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:border-amber-500/50"
                />
                <input 
                  type="text" 
                  placeholder="Bank Name"
                  value={bankData.bankName}
                  onChange={(e) => setBankData({...bankData, bankName: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:border-amber-500/50"
                />
                <input 
                  type="text" 
                  placeholder="IFSC Code"
                  value={bankData.ifscCode}
                  onChange={(e) => setBankData({...bankData, ifscCode: e.target.value.toUpperCase()})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:border-amber-500/50"
                />
                <input 
                  type="password" 
                  placeholder="Account Number"
                  value={bankData.accountNumber}
                  onChange={(e) => setBankData({...bankData, accountNumber: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:border-amber-500/50"
                />
                <input 
                  type="text" 
                  placeholder="Re-enter Account Number"
                  value={bankData.reAccountNumber}
                  onChange={(e) => setBankData({...bankData, reAccountNumber: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:border-amber-500/50"
                />
                <input 
                  type="text" 
                  placeholder="UPI ID"
                  value={bankData.upiId}
                  onChange={(e) => setBankData({...bankData, upiId: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:border-amber-500/50"
                />
                <button 
                  onClick={handleSaveBank}
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 font-black uppercase tracking-widest text-xs shadow-lg active:scale-95 transition-all"
                >
                  {loading ? "Saving..." : "Save Bank Details"}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-xs space-y-2">
                  <div className="flex justify-between"><span className="text-gray-500 uppercase font-bold tracking-widest">Holder:</span> <span className="text-white font-medium">{bankData.accountHolderName}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500 uppercase font-bold tracking-widest">Bank:</span> <span className="text-white font-medium">{bankData.bankName}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500 uppercase font-bold tracking-widest">A/C:</span> <span className="text-white font-medium">********{bankData.accountNumber.slice(-4)}</span></div>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase">Available Balance</p>
                    <p className="text-lg font-black text-white">₹{userBalance}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/5">
                    <button 
                      onClick={() => setWithdrawMethod('bank')}
                      className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${withdrawMethod === 'bank' ? 'bg-amber-500 text-slate-900' : 'text-gray-400'}`}
                    >Bank</button>
                    <button 
                      onClick={() => setWithdrawMethod('upi')}
                      className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${withdrawMethod === 'upi' ? 'bg-amber-500 text-slate-900' : 'text-gray-400'}`}
                    >UPI</button>
                  </div>

                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      type="number" 
                      placeholder="Enter Amount (Min ₹200)"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-amber-500/50"
                    />
                  </div>

                  <button 
                    onClick={handleWithdraw}
                    disabled={loading || !withdrawAmount}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black uppercase tracking-widest text-xs shadow-lg active:scale-95 transition-all disabled:opacity-50"
                  >
                    Withdraw Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
