import { useState } from "react";
import { useLocation } from "wouter";
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Crown,
  Eye,
  EyeOff
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock Authentication
    setTimeout(() => {
      localStorage.setItem('is_logged_in', 'true');
      localStorage.setItem('user_profile', JSON.stringify({
        uid: 'user-' + Math.random().toString(36).substr(2, 9),
        name: isLogin ? "Welcome Back" : formData.name,
        email: formData.email,
        createdAt: new Date().toISOString()
      }));
      
      toast({
        title: isLogin ? "Welcome Back!" : "Account Created",
        description: isLogin ? "Successfully logged into Last Digit Pro." : "Welcome to our premium community.",
      });
      
      setLocation("/");
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-amber-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl shadow-xl shadow-amber-500/20 mb-6">
            <Crown className="w-8 h-8 text-slate-900" />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2 uppercase">
            Last Digit <span className="text-amber-500">Pro</span>
          </h1>
          <p className="text-gray-400 text-sm font-medium tracking-wide">
            {isLogin ? "Premium Lottery Predictions" : "Join the Winning Circle"}
          </p>
        </div>

        <div className="glass-dark p-8 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles className="w-12 h-12 text-white" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-500" />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-gradient-to-r from-amber-400 to-amber-600 py-4 rounded-2xl text-slate-900 font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 group"
            >
              {loading ? "Processing..." : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 flex flex-col items-center gap-4">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-amber-500 transition-colors"
            >
              {isLogin ? "Need an account? Sign Up" : "Already have an account? Sign In"}
            </button>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6 opacity-30">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-white" />
            <span className="text-[10px] font-black text-white uppercase tracking-tighter">SECURE</span>
          </div>
          <div className="w-1 h-1 bg-white rounded-full" />
          <div className="flex items-center gap-1.5">
            <Crown className="w-3 h-3 text-white" />
            <span className="text-[10px] font-black text-white uppercase tracking-tighter">PREMIUM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
