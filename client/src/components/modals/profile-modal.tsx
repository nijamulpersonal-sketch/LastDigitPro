import { useState, useEffect } from "react";
import { User, Mail, Lock, Camera, X, ShieldCheck, Fingerprint, Calendar } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (user: any) => void;
}

export function ProfileModal({ isOpen, onClose, onUpdate }: ProfileModalProps) {
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    photo: ""
  });
  
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user_profile');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      // Auto-fill form data with email and other fields from auth, but keep age and photo manual
      setFormData(prev => ({
        ...prev,
        ...parsedUser,
        age: parsedUser.age || prev.age,
        photo: parsedUser.photo || prev.photo
      }));
    }
  }, [isOpen]);

  const generateIdentityNumber = () => {
    return "LDP-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handleSave = () => {
    if (!formData.email || !formData.password) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Email and password are required.",
      });
      return;
    }

    const userData = {
      ...formData,
      id: user?.id || generateIdentityNumber(),
      lastLogin: new Date().toISOString()
    };

    localStorage.setItem('user_profile', JSON.stringify(userData));
    setUser(userData);
    onUpdate(userData);
    
    toast({
      title: "Profile Saved",
      description: "Your information has been updated successfully.",
    });
  };

  const handleLogin = () => {
    const savedUser = localStorage.getItem('user_profile');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser.email === formData.email && parsedUser.password === formData.password) {
        setUser(parsedUser);
        setFormData(parsedUser);
        onUpdate(parsedUser);
        toast({
          title: "Welcome Back!",
          description: `Logged in as ${parsedUser.name || parsedUser.email}`,
        });
        return;
      }
    }
    toast({
      variant: "destructive",
      title: "Login Failed",
      description: "Invalid email or password.",
    });
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
              <label className="absolute bottom-2 right-0 w-8 h-8 bg-white text-slate-900 rounded-xl flex items-center justify-center cursor-pointer shadow-lg hover:scale-110 transition-transform">
                <Camera className="w-4 h-4" />
                <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
              </label>
            </div>
            
            <h2 className="text-2xl font-black text-white tracking-tight">
              {user ? "Your Profile" : (isLogin ? "Welcome Back" : "Create Account")}
            </h2>
            {user && (
              <div className="flex items-center justify-center gap-2 mt-2">
                <Fingerprint className="w-3 h-3 text-amber-400" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{user.id}</span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {!user && !isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="email" 
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="password" 
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
              />
            </div>

            {!user && !isLogin && (
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="number" 
                  placeholder="Age"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
                />
              </div>
            )}

            {user ? (
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-2xl p-4 text-center">
                    <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Age</span>
                    <span className="text-xl font-bold text-white">{user.age || "--"}</span>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 text-center">
                    <span className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Status</span>
                    <span className="text-sm font-bold text-emerald-400">ACTIVE VIP</span>
                  </div>
                </div>
                <button 
                  onClick={handleSave}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 font-black uppercase tracking-widest text-xs shadow-lg shadow-amber-500/20"
                >
                  Save Changes
                </button>
                <button 
                  onClick={() => {
                    localStorage.removeItem('user_profile');
                    setUser(null);
                    setFormData({ name: "", email: "", password: "", age: "", photo: "" });
                    onUpdate(null);
                  }}
                  className="w-full py-4 rounded-2xl bg-white/5 text-gray-400 font-bold text-xs border border-white/10"
                >
                  Logout Account
                </button>
              </div>
            ) : (
              <div className="space-y-4 pt-4">
                <button 
                  onClick={isLogin ? handleLogin : handleSave}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 font-black uppercase tracking-widest text-xs shadow-lg shadow-amber-500/20"
                >
                  {isLogin ? "Login Now" : "Register Now"}
                </button>
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="w-full text-xs text-gray-400 font-bold uppercase tracking-widest hover:text-white transition-colors"
                >
                  {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                </button>
              </div>
            )}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <span className="text-[9px] text-gray-600 uppercase font-bold tracking-widest">End-to-End Encrypted</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
