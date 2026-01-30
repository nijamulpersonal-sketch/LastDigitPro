import { useState, useEffect } from "react";
import { User, Camera, X, ShieldCheck, Fingerprint } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (user: any) => void;
}

export function ProfileModal({ isOpen, onClose, onUpdate }: ProfileModalProps) {
  const { toast } = useToast();

  const [lastLogin, setLastLogin] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    photo: ""
  });

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const savedUser = localStorage.getItem("user_profile");
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setFormData(prev => ({
          ...prev,
          ...parsedUser,
          photo: parsedUser.photo || prev.photo
        }));
      }

      const firebaseAuth = (window as any).firebase.auth();
      const db = (window as any).firebase.firestore();
      const currentUser = firebaseAuth.currentUser;

      if (currentUser) {
        const userRef = db.collection("users").doc(currentUser.uid);
        const snap = await userRef.get();
        const data = snap.data();

        if (data?.firstLoginAt) {
          const date = data.firstLoginAt.toDate();
          setLastLogin(formatDate(date));
        } else {
          const now = new Date();
          await userRef.update({ firstLoginAt: now });
          setLastLogin(formatDate(now));
        }
      }
    };

    loadProfile();
  }, [isOpen]);

  const formatDate = (date: Date) => {
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const db = (window as any).firebase.firestore();
      const currentUser = (window as any).firebase.auth().currentUser;

      if (currentUser) {
        const userData = {
          name: formData.name,
          age: formData.age,
          photo: formData.photo,
          lastUpdate: (window as any).firebase.firestore.FieldValue.serverTimestamp()
        };

        await db.collection("users").doc(currentUser.uid).update(userData);

        const fullProfile = {
          ...user,
          ...formData,
          lastUpdate: new Date().toISOString()
        };

        localStorage.setItem("user_profile", JSON.stringify(fullProfile));
        setUser(fullProfile);
        onUpdate(fullProfile);

        toast({
          title: "Profile Saved",
          description: "Your information has been updated successfully.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error Saving",
        description: error.message,
      });
    }
    setLoading(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user_profile");
    setUser(null);
    onUpdate(null);
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
            <div className="relative inline-block group">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 p-1 shadow-2xl shadow-amber-500/20 mb-4 overflow-hidden">
                <div className="w-full h-full rounded-[1.4rem] bg-slate-900 flex items-center justify-center overflow-hidden">
                  {formData.photo ? (
                    <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-amber-500" />
                  )}
                </div>
              </div>
              {user && (
                <label className="absolute bottom-2 right-0 w-8 h-8 bg-white text-slate-900 rounded-xl flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform">
                  <Camera className="w-4 h-4" />
                  <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                </label>
              )}
            </div>

            <h2 className="text-2xl font-black text-white tracking-tight">
              {user?.name || "Guest"}
            </h2>

            {user && (
              <div className="flex items-center justify-center gap-2 mt-2">
                <Fingerprint className="w-3 h-3 text-amber-400" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  {user?.id || "USER"}
                </span>
              </div>
            )}
          </div>

          {user ? (
            <div className="space-y-4 pt-4">
              <div className="bg-neutral-900 p-4 rounded-2xl text-center">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">First Login</p>
                <p className="text-sm font-semibold text-white">{lastLogin || "N/A"}</p>
              </div>

              <button
                onClick={handleSave}
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 font-black uppercase tracking-widest text-xs shadow-lg shadow-amber-500/20"
              >
                Save Changes
              </button>

              <button
                onClick={handleLogout}
                className="w-full py-4 rounded-2xl bg-white/5 text-gray-400 font-bold text-xs border border-white/10"
              >
                Logout Account
              </button>
            </div>
          ) : (
            <div className="space-y-4 pt-4">
              <button
                onClick={onClose}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 font-black uppercase tracking-widest text-xs shadow-lg shadow-amber-500/20"
              >
                Login Account
              </button>
              <p className="text-center text-xs text-gray-500">
                Please log in to access your profile
              </p>
            </div>
          )}

          <div className="mt-8 flex items-center justify-center gap-2">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <span className="text-[9px] text-gray-600 uppercase font-bold tracking-widest">
              End-to-End Encrypted
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
