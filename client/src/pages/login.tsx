import { useState, useEffect } from "react";
import { ChevronLeft, Phone, Lock, CheckCircle, Mail, Save } from "lucide-react";
import { Link, useLocation } from "wouter";

declare global {
  interface Window {
    firebase: any;
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}

export default function Login() {
  const [location, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSaveEmail = async () => {
    if (!email) return alert("Enter email");
    setLoading(true);
    try {
      // Logic for simple profile saving or alternative login
      localStorage.setItem('user_profile', JSON.stringify({ email }));
      setLocation("/");
    } catch (error: any) {
      alert(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-amber-500/30">
      <header className="bg-slate-800/50 backdrop-blur-md border-b border-white/5 p-4 flex items-center gap-4 sticky top-0 z-20">
        <Link href="/">
          <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <ChevronLeft className="w-7 h-7" />
          </button>
        </Link>
        <h1 className="text-xl font-bold bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">Login to Last Digit Pro</h1>
      </header>

      <div className="max-w-md mx-auto p-6 mt-10">
        <div className="glass rounded-[2rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
          
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 bg-blue-500/10 rounded-2xl mb-2">
                <Mail className="w-8 h-8 text-blue-500" />
              </div>
              <h2 className="text-2xl font-black tracking-tight">Welcome</h2>
              <p className="text-gray-400 text-sm">Please provide your email address to continue</p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input 
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all font-medium"
                />
              </div>
              <button 
                onClick={handleSaveEmail}
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                {loading ? "Processing..." : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
