import { useState, useEffect } from "react";
import { X, User, Mail, Shield, BadgeCheck, LogOut, Camera, Save } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (user: any) => void;
}

export function ProfileModal({ isOpen, onClose, onUpdate }: ProfileModalProps) {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    uid: "",
    createdAt: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const userData = JSON.parse(localStorage.getItem('user_profile') || '{}');
      setProfile({
        name: userData.name || "Guest User",
        email: userData.email || "guest@example.com",
        uid: userData.uid || "GUEST-12345",
        createdAt: userData.createdAt || new Date().toISOString()
      });
    }
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem('user_profile', JSON.stringify(profile));
    onUpdate(profile);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-dark border-amber-500/30 text-white max-w-sm p-0 rounded-[2.5rem] overflow-hidden gap-0">
        <div className="relative p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-white tracking-tight">VIP Profile</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-2xl shadow-amber-500/30 p-1">
                <div className="w-full h-full rounded-[1.8rem] bg-slate-900 flex items-center justify-center overflow-hidden">
                  <User className="w-12 h-12 text-amber-500" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 p-2 bg-emerald-500 rounded-xl shadow-lg border-2 border-slate-900">
                <BadgeCheck className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-xl font-bold text-white">{profile.name}</h3>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-1">Premium Member</p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="p-4 rounded-3xl bg-white/5 border border-white/5 space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest ml-1">Account Name</label>
                <div className="flex items-center gap-3 px-1">
                  <User className="w-4 h-4 text-amber-500" />
                  {isEditing ? (
                    <input
                      className="bg-transparent border-b border-amber-500/30 text-sm focus:outline-none w-full"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    />
                  ) : (
                    <span className="text-sm font-medium text-white">{profile.name}</span>
                  )}
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest ml-1">Email ID</label>
                <div className="flex items-center gap-3 px-1">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-white/60">{profile.email}</span>
                </div>
              </div>

              <div className="space-y-1 pt-2 border-t border-white/5">
                <label className="text-[9px] font-bold text-gray-500 uppercase tracking-widest ml-1">Member Since</label>
                <div className="flex items-center gap-3 px-1">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-medium text-white/60">
                    {new Date(profile.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            {isEditing ? (
              <button 
                onClick={handleSave}
                className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 font-black text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex-1 py-4 rounded-2xl bg-white/10 text-white font-black text-xs uppercase tracking-widest border border-white/10 active:scale-95 transition-all"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
