import { useState, useEffect } from "react";
import { ChevronLeft, Mail, Lock, LogIn, UserPlus, ShieldCheck, UserCircle } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Login() {
  const [location, setLocation] = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (isRegistering && !name)) {
      setStatus("Please fill all fields");
      return;
    }
    
    setLoading(true);
    setStatus("Processing...");
    try {
      const db = (window as any).firebase.firestore();
      const auth = (window as any).firebase.auth();
      
      let userCredential;
      if (isRegistering) {
        userCredential = await auth.createUserWithEmailAndPassword(email, password);
        await db.collection("users").doc(userCredential.user.uid).set({
          name,
          email,
          balance: 0,
          createdAt: (window as any).firebase.firestore.FieldValue.serverTimestamp(),
          phone: ""
        });
        setStatus("Registration successful!");
      } else {
        userCredential = await auth.signInWithEmailAndPassword(email, password);
        setStatus("Login successful!");
      }

      const user = userCredential.user;
      const savedProfile = localStorage.getItem('user_profile');
      const existingProfile = savedProfile ? JSON.parse(savedProfile) : {};
      
      const updatedProfile = {
        ...existingProfile,
        uid: user.uid,
        email: user.email,
        name: name || existingProfile.name || "",
        age: existingProfile.age || "",
        photo: existingProfile.photo || null
      };
      
      localStorage.setItem('user_profile', JSON.stringify(updatedProfile));
      setTimeout(() => setLocation("/"), 1000);
    } catch (error: any) {
      setStatus(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-amber-500/30 overflow-hidden relative">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full"></div>

      <header className="bg-slate-800/50 backdrop-blur-md border-b border-white/5 p-4 flex items-center gap-4 sticky top-0 z-20">
        <Link href="/">
          <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <ChevronLeft className="w-7 h-7" />
          </button>
        </Link>
        <h1 className="text-xl font-bold bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">Last Digit Pro</h1>
      </header>

      <div className="max-w-md mx-auto p-6 mt-8 relative z-10">
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex p-4 bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl shadow-xl shadow-amber-500/20 mb-4">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-black tracking-tight">{isRegistering ? "Create Account" : "Welcome Back"}</h2>
          <p className="text-gray-400 text-sm">{isRegistering ? "Join our community" : "Login to access dashboard"}</p>
        </div>

        <div className="glass rounded-[2.5rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
          
          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-4">
              {isRegistering && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative group">
                    <UserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-amber-400 transition-colors" />
                    <input 
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all font-medium"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-amber-400 transition-colors" />
                  <input 
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-amber-400 transition-colors" />
                  <input 
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {status && (
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs font-medium text-amber-400 text-center">
                {status}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600 text-slate-900 font-black text-sm uppercase tracking-widest shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
            >
              {isRegistering ? <UserPlus className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
              {loading ? "Processing..." : (isRegistering ? "Register" : "Login")}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <button 
              onClick={() => {
                setIsRegistering(!isRegistering);
                setStatus("");
              }}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              {isRegistering ? "Already have an account?" : "Don't have an account?"}
              <span className="text-amber-400 font-bold underline decoration-amber-400/30 underline-offset-4">
                {isRegistering ? "Login" : "Register"}
              </span>
            </button>
          </div>
        </div>

        {/* Security Trust Badges */}
        <div className="mt-8 flex justify-center items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">SSL Secure</span>
          </div>
          <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">End-to-End</span>
          </div>
        </div>
      </div>
    </div>
  );
}
