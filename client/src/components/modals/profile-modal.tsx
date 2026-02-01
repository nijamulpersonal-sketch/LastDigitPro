import { useState, useEffect } from "react";
import { X, ShieldCheck, Fingerprint, Clock, User, LogOut } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { auth } from "@/firebase";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (user: any) => void;
}

export function ProfileModal({ isOpen, onClose, onUpdate }: ProfileModalProps) {
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [lastLogin, setLastLogin] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      const savedUser = localStorage.getItem('user_profile');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        // Strictly only use allowed fields
        const sanitized = {
          uid: parsedUser.uid,
          name: parsedUser.name || "User",
          email: parsedUser.email,
          balance: parsedUser.balance || 0,
          createdAt: parsedUser.createdAt
        };
        setUser(sanitized);

        const currentUser = auth.currentUser;
        if (currentUser && currentUser.metadata.lastSignInTime) {
          const lastSignIn = new Date(currentUser.metadata.lastSignInTime);
          setLastLogin(lastSignIn.toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }));
        }
      }
    }
  }, [isOpen]);

  const handleLogout = () => {
    auth.signOut();
    localStorage.removeItem('user_profile');
    onUpdate(null);
    onClose();
    toast({ title: "Logged Out", description: "Successfully signed out of your account." });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-dark border-amber-500/30 text-white max-w-sm p-0 rounded-[2.5rem] overflow-hidden gap-0">
        <div className="relative p-8">
          <div className="absolute top-6 right-6">
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 p-1 shadow-2xl shadow-amber-500/20 mb-4 overflow-hidden">
              <div className="w-full h-full rounded-[1.4rem] bg-slate-900 flex items-center justify-center">
                <User className="w-10 h-10 text-amber-500" />
              </div>
            </div>
            
            <h2 className="text-2xl font-black text-white tracking-tight">
              {user?.name || "User Profile"}
            </h2>
            <div className="flex items-center justify-center gap-2 mt-2">
              <Fingerprint className="w-3 h-3 text-amber-400" />
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Permanent ID: {user?.uid}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Email Address</p>
                <p className="text-sm font-medium text-white">{user?.email}</p>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Created At</p>
                    <p className="text-sm font-medium text-white">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN') : 'N/A'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Balance</p>
                    <p className="text-sm font-black text-emerald-400">₹{user?.balance}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/10">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Last Login</span>
                </div>
                <span className="text-sm font-bold text-white tracking-tight">{lastLogin || "Just now"}</span>
              </div>
            </div>

            <button 
              onClick={handleLogout}
              className="w-full mt-4 py-4 rounded-2xl bg-white/5 text-rose-400 font-bold text-xs border border-white/10 hover:bg-rose-500/10 hover:text-rose-400 transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout Account
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 opacity-30">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <span className="text-[9px] text-gray-600 uppercase font-bold tracking-widest">End-to-End Encrypted</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
