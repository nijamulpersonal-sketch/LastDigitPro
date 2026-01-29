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
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"phone" | "otp" | "profile">("phone");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!window.firebase) return;
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new window.firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible'
      });
    }
  }, []);

  const handleSendOtp = async () => {
    if (!phone) return alert("Enter phone number");
    setLoading(true);
    try {
      const confirmationResult = await window.firebase.auth().signInWithPhoneNumber(phone.startsWith('+') ? phone : `+91${phone}`, window.recaptchaVerifier);
      window.confirmationResult = confirmationResult;
      setStep("otp");
      logActivity("otp_sent");
    } catch (error: any) {
      alert(error.message);
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    if (!otp) return alert("Enter OTP");
    setLoading(true);
    try {
      const result = await window.confirmationResult.confirm(otp);
      const firebaseUser = result.user;
      setUser(firebaseUser);
      
      const db = window.firebase.firestore();
      const userRef = db.collection("users").doc(firebaseUser.uid);
      const doc = await userRef.get();
      
      if (!doc.exists) {
        await userRef.set({
          phone: firebaseUser.phoneNumber,
          email: "",
          balance: 0,
          createdAt: window.firebase.firestore.FieldValue.serverTimestamp()
        });
      }
      
      setStep("profile");
      logActivity("otp_verified");
    } catch (error: any) {
      alert("Invalid OTP");
    }
    setLoading(false);
  };

  const handleSaveEmail = async () => {
    if (!email) return alert("Enter email");
    setLoading(true);
    try {
      const db = window.firebase.firestore();
      await db.collection("users").doc(user.uid).update({ email });
      logActivity("email_saved");
      localStorage.setItem('user_profile', JSON.stringify({ uid: user.uid, phone: user.phoneNumber, email }));
      setLocation("/");
    } catch (error: any) {
      alert(error.message);
    }
    setLoading(false);
  };

  const logActivity = async (action: string) => {
    const currentUser = window.firebase.auth().currentUser;
    if (!currentUser) return;
    try {
      await window.firebase.firestore().collection("activity_logs").add({
        uid: currentUser.uid,
        action,
        timestamp: window.firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch (e) { console.error(e); }
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
        <div id="recaptcha-container"></div>
        
        <div className="glass rounded-[2rem] p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
          
          {step === "phone" && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 bg-amber-500/10 rounded-2xl mb-2">
                  <Phone className="w-8 h-8 text-amber-500" />
                </div>
                <h2 className="text-2xl font-black tracking-tight">Welcome Back</h2>
                <p className="text-gray-400 text-sm">Enter your phone number to continue</p>
              </div>

              <div className="space-y-4">
                <div className="relative group">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">+91</span>
                  <input 
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-14 pr-4 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all font-medium text-lg"
                  />
                </div>
                <button 
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-900 font-black text-sm uppercase tracking-widest shadow-lg shadow-amber-500/20 active:scale-95 transition-all disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </div>
            </div>
          )}

          {step === "otp" && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 bg-emerald-500/10 rounded-2xl mb-2">
                  <Lock className="w-8 h-8 text-emerald-500" />
                </div>
                <h2 className="text-2xl font-black tracking-tight">Verification</h2>
                <p className="text-gray-400 text-sm">Enter the 6-digit code sent to your phone</p>
              </div>

              <div className="space-y-4">
                <input 
                  type="number"
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-center text-2xl font-black tracking-[1em] focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 outline-none transition-all"
                />
                <button 
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-emerald-500/20 active:scale-95 transition-all disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
                <button 
                  onClick={() => setStep("phone")}
                  className="w-full text-gray-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
                >
                  Change Number
                </button>
              </div>
            </div>
          )}

          {step === "profile" && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 bg-blue-500/10 rounded-2xl mb-2">
                  <Mail className="w-8 h-8 text-blue-500" />
                </div>
                <h2 className="text-2xl font-black tracking-tight">Profile Details</h2>
                <p className="text-gray-400 text-sm">Please provide your email address</p>
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
                  {loading ? "Saving..." : "Save Email & Finish"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
