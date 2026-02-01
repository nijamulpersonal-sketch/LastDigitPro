import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { useState, useEffect } from "react";
import {
  ShieldCheck,
  Clock,
  Crown,
  CheckCircle,
  Search,
  TrendingUp,
  FileText,
  Settings,
  MessageCircle,
  Lock,
  UserCircle,
  MessageSquare,
  Users,
  Home as HomeIcon,
  History,
  CreditCard,
  DollarSign
} from "lucide-react";
import { useLocation } from "wouter";
import { PrivacyPolicyModal } from "@/components/modals/privacy-policy-modal";
import { SubscriptionModal } from "@/components/modals/subscription-modal";
import { SettingsModal } from "@/components/modals/settings-modal";
import { ProfileModal } from "@/components/modals/profile-modal";
import { ChatBotModal } from "@/components/modals/chatbot-modal";
import { BankAccountModal } from "@/components/modals/bank-account-modal";
import { DepositModal } from "@/components/modals/deposit-modal";

export default function Home() {
  const [location, setLocation] = useLocation();
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const [showBank, setShowBank] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'first-time' | 'regular' | null>(null);
  const [user, setUser] = useState<any>(null);
  const [userBalance, setUserBalance] = useState<number>(0);
  const [activeUsers, setActiveUsers] = useState(124);

  useEffect(() => {
    const savedUser = localStorage.getItem('user_profile');
    if (!savedUser && location !== "/login") {
      setLocation("/login");
      return;
    }

    // Live Firestore Listener for specified fields only
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser: any) => {
      if (firebaseUser) {
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const unsubscribeSnapshot = onSnapshot(userDocRef, (docSnap: any) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            // Strictly only use allowed fields
            const userData = {
              uid: firebaseUser.uid,
              name: data.name || "User",
              email: data.email || firebaseUser.email,
              balance: data.balance || 0,
              createdAt: data.createdAt || firebaseUser.metadata.creationTime
            };
            setUser(userData);
            setUserBalance(userData.balance);
            localStorage.setItem('user_profile', JSON.stringify(userData));
          }
        });
        return () => unsubscribeSnapshot();
      }
    });

    const updateActiveUsers = () => {  
      const now = new Date();  
      const hour = now.getHours();  
      const minute = now.getMinutes();  
      let min = 10, max = 150;  

      if (hour === 12 && minute <= 56) {  
        min = 350; max = 500;  
      } else if ((hour === 17 && minute >= 30) || (hour >= 18 && hour < 20)) {  
        min = 350; max = 500;  
      } else if (hour >= 20 || hour < 12) {  
        min = 10; max = 40;  
      } else {  
        min = 50; max = 200;  
      }  

      const randomUsers = Math.floor(Math.random() * (max - min + 1)) + min;  
      setActiveUsers(randomUsers);  
    };  

    updateActiveUsers();  
    const interval = setInterval(updateActiveUsers, 5000); 
    return () => {
      clearInterval(interval);
      unsubscribeAuth();
    };

  }, []);

  const handlePlanSelect = (plan: 'first-time' | 'regular') => {
    setSelectedPlan(plan);
    setShowSubscription(true);
  };

  const handleSettingsOpen = () => setShowSettings(true);
  const handleSettingsClose = () => setShowSettings(false);

  const handlePrivacyOpen = () => {
    setShowSettings(false);
    setTimeout(() => setShowPrivacy(true), 100);
  };
  const handlePrivacyClose = () => setShowPrivacy(false);

  const handleProfileUpdate = (updatedUser: any) => {
    // Ensure only allowed fields are saved during updates
    const sanitized = {
      uid: updatedUser.uid,
      name: updatedUser.name,
      email: updatedUser.email,
      balance: updatedUser.balance,
      createdAt: updatedUser.createdAt
    };
    setUser(sanitized);
    localStorage.setItem('user_profile', JSON.stringify(sanitized));
  };

  const handleDepositSuccess = (newBalance: number) => {
    setUserBalance(newBalance);
    if (user) {
      const updatedUser = { ...user, balance: newBalance };
      localStorage.setItem('user_profile', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };

  return (
    <div className="min-h-screen pb-24 bg-slate-900 selection:bg-amber-500/30">
      <button
        onClick={() => setShowChatBot(true)}
        className="fixed bottom-28 right-6 z-50 chatbot-btn flex items-center gap-2 px-5 py-3 rounded-full font-semibold transition-all duration-300 text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/30 hover:scale-105 active:scale-95"
      >
        <MessageSquare className="w-5 h-5" />
        <span>Support</span>
      </button>

      <div className="max-w-md mx-auto px-4 pt-4">  
        <div className="text-center mb-6">  
          <div className="flex justify-between items-center mb-4">  
            <div className="flex items-center gap-2">  
              <h1 className="text-xl font-black bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600 bg-clip-text text-transparent tracking-tighter">  
                LAST DIGIT PRO  
              </h1>  
            </div>  

            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full animate-pulse">  
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />  
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1">  
                <Users className="w-3 h-3" />  
                {activeUsers} Live  
              </span>  
            </div>  

            <button   
              onClick={() => setShowProfile(true)}  
              className="p-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 group"  
            >  
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 overflow-hidden">  
                <UserCircle className="w-5 h-5 text-white" />  
              </div>  
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-amber-400 transition-colors">Profile</span>  
            </button>  
          </div>  

          <div className="glass-dark rounded-2xl p-3 mb-4 border border-white/10 flex items-center justify-between shadow-xl">  
            <div className="flex items-center gap-3">  
              <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">  
                <CreditCard className="w-5 h-5 text-emerald-400" />  
              </div>  
              <div>  
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Available Balance</p>  
                <p className="text-lg font-black text-white leading-none">₹{userBalance}</p>  
              </div>  
            </div>  
            <button   
              onClick={() => setShowDeposit(true)}  
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-2"  
            >  
              <img src="https://flagcdn.com/w20/in.png" alt="IND" className="w-4 h-3 rounded-sm" />  
              Deposite  
            </button>  
          </div>  

          <div className="glass rounded-2xl px-4 py-3 mb-2 gold-glow border-amber-400/20">  
            <div className="flex justify-center items-center gap-2">  
              <div className="flex items-center">  
                <ShieldCheck className="w-3 h-3 text-emerald-400 mr-1" />  
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Secure</span>  
              </div>  
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>  
              <div className="flex items-center">  
                <Clock className="w-3 h-3 text-amber-400 mr-1" />  
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Live Updates</span>  
              </div>  
            </div>  
          </div>  
        </div>  

        <div className="relative overflow-hidden glass-dark rounded-[1.5rem] p-4 mb-6 border border-white/10 shadow-[0_0_20px_rgba(251,191,36,0.1)]">  
          <div className="absolute -inset-full h-[300%] w-[300%] bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] animate-[shimmer_5s_infinite] pointer-events-none"></div>  
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 blur-[40px] -z-10"></div>  
          <div className="flex items-center gap-2 mb-4 relative z-10">  
            <div className="p-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl shadow-lg shadow-amber-500/20">  
              <Crown className="w-5 h-5 text-white" />  
            </div>  
            <div>  
              <h2 className="text-lg font-bold text-white tracking-tight leading-none mb-0.5">Subscription Plans</h2>  
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Choose your plan</p>  
            </div>  
          </div>  
          <div className="grid grid-cols-2 gap-2.5 mb-3 relative z-10">  
            <div   
              onClick={() => handlePlanSelect('first-time')}  
              className="relative overflow-hidden bg-white/[0.03] border border-white/10 rounded-xl p-3 cursor-pointer hover:bg-white/[0.08] hover:border-amber-500/40 transition-all duration-500 text-center group"  
            >  
              <div className="text-[8px] text-emerald-400 font-bold uppercase mb-0.5 tracking-widest">Trial Offer</div>  
              <div className="text-2xl font-black text-white group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">₹29</div>  
              <div className="text-[8px] text-gray-500 font-medium uppercase mt-0.5">12 Days</div>  
            </div>  
            <div   
              onClick={() => handlePlanSelect('regular')}  
              className="relative overflow-hidden bg-amber-400/[0.03] border border-amber-400/10 rounded-xl p-3 cursor-pointer hover:bg-white/[0.08] hover:border-amber-500/40 transition-all duration-500 text-center group"  
            >  
              <div className="text-[8px] text-amber-400/60 font-bold uppercase mb-0.5 tracking-widest">Premium</div>  
              <div className="text-2xl font-black text-amber-400 group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">₹1199</div>  
              <div className="text-[8px] text-gray-500 font-medium uppercase mt-0.5">30 Days</div>  
            </div>  
          </div>  
          <div className="flex gap-1.5 mb-3 relative z-10">  
            {['01:00 PM', '06:00 PM', '08:00 PM'].map((time) => (  
              <div key={time} className="flex-1 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-emerald-400 font-bold text-[9px] text-center shadow-inner">  
                {time}  
              </div>  
            ))}  
          </div>  
          <button   
            onClick={() => handlePlanSelect('first-time')}  
            className="relative w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-600 text-slate-900 font-black text-xs shadow-[0_4px_15_rgba(251,191,36,0.2)] hover:shadow-[0_6px_20px_rgba(251,191,36,0.4)] active:scale-[0.98] transition-all duration-300 uppercase tracking-widest overflow-hidden group"  
          >  
            <span className="relative z-10">Unlock VIP Access</span>  
          </button>  
        </div>  

        <div className="grid grid-cols-2 gap-4 mb-8">  
          <div onClick={() => setLocation('/lucky-search')} className="glass card-hover rounded-2xl p-4 cursor-pointer relative group">  
            <div className="absolute top-3 right-3"><Lock className="w-4 h-4 text-amber-400" /></div>  
            <div className="flex items-center gap-3 mb-2">  
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-2 rounded-lg"><Search className="w-5 h-5 text-white" /></div>  
              <h3 className="font-semibold text-white">Lucky Search</h3>  
            </div>  
            <p className="text-xs text-gray-400">VIP prediction tool</p>  
          </div>  
          <div onClick={() => setLocation('/dear-digits')} className="glass card-hover rounded-2xl p-4 cursor-pointer">  
            <div className="flex items-center gap-3 mb-2">  
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg"><TrendingUp className="w-5 h-5 text-white" /></div>  
              <h3 className="font-semibold text-white">Dear Digits</h3>  
            </div>  
            <p className="text-xs text-gray-400">20-day chart analysis</p>  
          </div>  
          <div   
            onClick={() => window.open('https://lotterysambad.one/', '_blank')}  
            className="glass card-hover rounded-2xl p-4 cursor-pointer"  
          >  
            <div className="flex items-center gap-3 mb-2">  
              <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-2 rounded-lg shadow-lg shadow-rose-500/20">  
                <FileText className="w-5 h-5 text-white" />  
              </div>  
              <h3 className="font-semibold text-white">Lottery Fax</h3>  
            </div>  
            <p className="text-xs text-gray-400">Official results archive</p>  
          </div>  
          <div onClick={handleSettingsOpen} className="glass card-hover rounded-2xl p-4 cursor-pointer">  
            <div className="flex items-center gap-3 mb-2">  
              <div className="bg-gradient-to-br from-gray-500 to-gray-700 p-2 rounded-lg">  
                <Settings className="w-5 h-5 text-white" />  
              </div>  
              <h3 className="font-semibold text-white">Settings</h3>  
            </div>  
            <p className="text-xs text-gray-400">App preferences</p>  
          </div>  
        </div>  

        <div className="glass rounded-2xl p-5 mb-6 border border-rose-500/30">  
          <div className="flex items-start gap-3">  
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 p-2 rounded-full"><ShieldCheck className="w-5 h-5 text-white" /></div>  
            <div>  
              <h3 className="font-bold text-white mb-1">100% Refund Guarantee</h3>  
              <p className="text-sm text-gray-300">Predictions miss, payment refunded.</p>  
            </div>  
          </div>  
        </div>  
      </div>  

      <nav className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-6 pt-2 pointer-events-none">  
        <div className="max-w-md mx-auto pointer-events-auto">  
          <div className="glass-dark border border-white/10 rounded-[2rem] p-2 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl flex items-center justify-between relative overflow-hidden">  
            <div className="absolute -inset-full h-[300%] w-[300%] bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.03)_50%,transparent_75%)] animate-[shimmer_8s_infinite] pointer-events-none"></div>  

            <button className="flex-1 flex flex-col items-center justify-center gap-1 py-2 group/nav relative">  
              <div className="p-2 rounded-2xl bg-amber-500/10 text-amber-500">  
                <HomeIcon className="w-5 h-5" />  
              </div>  
              <span className="text-[10px] font-bold uppercase tracking-tighter text-amber-500">Home</span>  
              <div className="absolute -bottom-1 w-1 h-1 bg-amber-500 rounded-full shadow-[0_0_10px_#f59e0b]"></div>  
            </button>  

            <button className="flex-1 flex flex-col items-center justify-center gap-1 py-2 opacity-50 hover:opacity-100 transition-all">  
              <div className="p-2 rounded-2xl bg-white/5 text-gray-400">  
                <History className="w-5 h-5" />  
              </div>  
              <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-400">History</span>  
            </button>  

            <button   
              onClick={() => setShowBank(true)}  
              className="flex-1 flex flex-col items-center justify-center gap-1 py-2 opacity-50 hover:opacity-100 transition-all"  
            >  
              <div className="p-2 rounded-2xl bg-white/5 text-gray-400">  
                <CreditCard className="w-5 h-5 text-gray-400" />  
              </div>  
              <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-400">Bank</span>  
            </button>  

            <button onClick={handleSettingsOpen} className="flex-1 flex flex-col items-center justify-center gap-1 py-2 opacity-50 hover:opacity-100 transition-all">  
              <div className="p-2 rounded-2xl bg-white/5 text-gray-400">  
                <Settings className="w-5 h-5" />  
              </div>  
              <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-400">Settings</span>  
            </button>  
          </div>  
        </div>  
      </nav>  

      <SettingsModal isOpen={showSettings} onClose={handleSettingsClose} onOpenPrivacy={handlePrivacyOpen} />  
      <PrivacyPolicyModal isOpen={showPrivacy} onClose={handlePrivacyClose} />  
      <SubscriptionModal isOpen={showSubscription} onClose={() => setShowSubscription(false)} planType={selectedPlan} />  
      <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} onUpdate={handleProfileUpdate} />  
      <ChatBotModal isOpen={showChatBot} onClose={() => setShowChatBot(false)} />  
      <BankAccountModal isOpen={showBank} onClose={() => setShowBank(false)} />  
      <DepositModal 
        isOpen={showDeposit} 
        onClose={() => setShowDeposit(false)} 
        userBalance={userBalance}
        onDepositSuccess={handleDepositSuccess}
      />
    </div>
  );
}
