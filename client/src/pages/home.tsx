import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
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
  MessageSquare
} from "lucide-react";
import { useLocation } from "wouter";
import { PrivacyPolicyModal } from "@/components/modals/privacy-policy-modal";
import { SubscriptionModal } from "@/components/modals/subscription-modal";
import { SettingsModal } from "@/components/modals/settings-modal";
import { ProfileModal } from "@/components/modals/profile-modal";
import { ChatBotModal } from "@/components/modals/chatbot-modal";

export default function Home() {
  const [location, setLocation] = useLocation();
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'first-time' | 'regular' | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user_profile');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
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
    setUser(updatedUser);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* AI Chat Bot Floating Button */}
      <button 
        onClick={() => setShowChatBot(true)}
        className="fixed bottom-6 right-6 z-50 chatbot-btn flex items-center gap-2 px-5 py-3 rounded-full font-semibold transition-all duration-300 text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/30 hover:scale-105 active:scale-95"
      >
        <MessageSquare className="w-5 h-5" />
        <span>Support</span>
      </button>

      {/* Main Dashboard */}
      <div className="max-w-md mx-auto px-4 pt-4">
        {/* Header - Compact & Premium */}
        <div className="text-center mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Last Digit Pro Logo" className="w-8 h-8 rounded-full object-cover border border-amber-400/30" />
              <span className="text-sm font-black text-white tracking-tighter">LAST DIGIT PRO</span>
            </div>
            <button 
              onClick={() => setShowProfile(true)}
              className="p-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2 group"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 overflow-hidden">
                {user?.photo ? (
                  <img src={user.photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <UserCircle className="w-5 h-5 text-white" />
                )}
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-amber-400 transition-colors">Profile</span>
            </button>
          </div>

          <div className="glass rounded-2xl px-4 py-3 mb-2 gold-glow border-amber-400/20">
            <h1 className="text-2xl font-black bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-600 bg-clip-text text-transparent tracking-tighter uppercase">
              Premium Dashboard
            </h1>
            <div className="flex justify-center items-center gap-2 mt-1">
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

        {/* Compact VIP Access Card - Premium Glassmorphism Edition */}
        <div className="relative overflow-hidden glass-dark rounded-[1.5rem] p-4 mb-6 border border-white/10 shadow-[0_0_20px_rgba(251,191,36,0.1)]">
          {/* Animated Glaze Effect */}
          <div className="absolute -inset-full h-[300%] w-[300%] bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] animate-[shimmer_5s_infinite] pointer-events-none"></div>
          
          {/* Subtle Glow Points */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 blur-[40px] -z-10"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500/10 blur-[40px] -z-10"></div>

          {/* Trusted Badge */}
          <div className="absolute -top-1 -right-1 z-20">
            <div className="bg-gradient-to-r from-amber-400 to-yellow-500 text-black text-[7px] font-black px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.3)] uppercase tracking-wider">
              Trusted
            </div>
          </div>

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
              className="relative overflow-hidden bg-amber-400/[0.03] border border-amber-400/10 rounded-xl p-3 cursor-pointer hover:bg-amber-400/[0.08] hover:border-amber-400/40 transition-all duration-500 text-center group"
            >
              <div className="text-[8px] text-amber-400/60 font-bold uppercase mb-0.5 tracking-widest">Premium</div>
              <div className="text-2xl font-black text-amber-400 group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">₹1199</div>
              <div className="text-[8px] text-gray-500 font-medium uppercase mt-0.5">30 Days</div>
            </div>
          </div>

          <div className="flex gap-1.5 mb-3 relative z-10">
            {['01:00 PM', '06:00 PM', '08:00 PM'].map((time) => (
              <div key={time} className="flex-1 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-emerald-400 font-bold text-[9px] text-center shadow-inner group hover:bg-white/[0.08] transition-colors">
                {time}
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-rose-500/10 to-transparent border-l-2 border-rose-500 rounded-r-lg p-2.5 mb-4 relative z-10">
            <div className="flex gap-2 items-center">
              <div className="p-1 bg-rose-500/20 rounded-md">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-500" />
              </div>
              <p className="text-[9px] text-gray-300 leading-tight">
                <span className="text-rose-400 font-bold uppercase block mb-0.5">Refund Guarantee</span>
                If predictions miss, payment is refunded.
              </p>
            </div>
          </div>

          <button 
            onClick={() => handlePlanSelect('first-time')}
            className="relative w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-600 text-slate-900 font-black text-xs shadow-[0_4px_15px_rgba(251,191,36,0.2)] hover:shadow-[0_6px_20px_rgba(251,191,36,0.4)] active:scale-[0.98] transition-all duration-300 uppercase tracking-widest overflow-hidden group"
          >
            <span className="relative z-10">Unlock VIP Access</span>
            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Lucky Search Card */}
          <div 
            onClick={() => setLocation('/lucky-search')}
            className="glass card-hover rounded-2xl p-4 cursor-pointer relative group"
          >
            <div className="absolute top-3 right-3">
              <Lock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-2 rounded-lg shadow-lg shadow-purple-500/20">
                <Search className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-white">Lucky Search</h3>
            </div>
            <p className="text-xs text-gray-400">VIP prediction analytics tool</p>
          </div>

          {/* Dear Digits Card */}
          <div 
            onClick={() => setLocation('/dear-digits')}
            className="glass card-hover rounded-2xl p-4 cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg shadow-lg shadow-blue-500/20">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-white">Dear Digits</h3>
            </div>
            <p className="text-xs text-gray-400">15-day chart analysis</p>
          </div>

          {/* Lottery Fax Card */}
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

          {/* Settings Card */}
          <div onClick={handleSettingsOpen} className="glass card-hover rounded-2xl p-4 cursor-pointer">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gradient-to-br from-gray-500 to-gray-700 p-2 rounded-lg shadow-lg">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-white">Settings</h3>
            </div>
            <p className="text-xs text-gray-400">App preferences</p>
          </div>
        </div>

        {/* Refund Guarantee */}
        <div className="glass rounded-2xl p-5 mb-6 border border-rose-500/30">
          <div className="flex items-start gap-3">
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 p-2 rounded-full shadow-lg shadow-rose-500/20">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white mb-1">100% Refund Guarantee</h3>
              <p className="text-sm text-gray-300">If our 3 daily predictions miss the target, we'll refund your payment immediately. No questions asked.</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center pb-8">
          <p className="text-xs text-gray-500">This app provides analytical insights for informational purposes only. Always verify with official sources.</p>
        </div>
      </div>

      {/* Modals */}
      <SettingsModal 
        isOpen={showSettings} 
        onClose={handleSettingsClose} 
        onOpenPrivacy={handlePrivacyOpen} 
      />
      
      <PrivacyPolicyModal 
        isOpen={showPrivacy} 
        onClose={handlePrivacyClose} 
      />
      
      <SubscriptionModal 
        isOpen={showSubscription} 
        onClose={() => setShowSubscription(false)} 
        planType={selectedPlan}
      />

      <ProfileModal
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        onUpdate={handleProfileUpdate}
      />

      <ChatBotModal
        isOpen={showChatBot}
        onClose={() => setShowChatBot(false)}
      />
    </div>
  );
}
