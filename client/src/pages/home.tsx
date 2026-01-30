import { useState, useEffect } from "react";
import {
  ShieldCheck,
  Clock,
  Crown,
  Search,
  TrendingUp,
  FileText,
  Settings,
  Lock,
  UserCircle,
  MessageSquare,
  Users,
  Home as HomeIcon,
  History,
  CreditCard
} from "lucide-react";
import { useLocation } from "wouter";
import { PrivacyPolicyModal } from "@/components/modals/privacy-policy-modal";
import { SubscriptionModal } from "@/components/modals/subscription-modal";
import { SettingsModal } from "@/components/modals/settings-modal";
import { ProfileModal } from "@/components/modals/profile-modal";
import { ChatBotModal } from "@/components/modals/chatbot-modal";
import { BankAccountModal } from "@/components/modals/bank-account-modal";

export default function Home() {
  const [location, setLocation] = useLocation();
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const [showBank, setShowBank] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'first-time' | 'regular' | null>(null);
  const [user, setUser] = useState<any>(null);
  const [activeUsers, setActiveUsers] = useState(120);

  useEffect(() => {
    const savedUser = localStorage.getItem('user_profile');
    if (!savedUser && location !== "/login") {
      setLocation("/login");
      return;
    }
    if (savedUser) setUser(JSON.parse(savedUser));

    const interval = setInterval(() => {
      setActiveUsers(Math.floor(Math.random() * 50) + 100);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePlanSelect = (plan: 'first-time' | 'regular') => {
    setSelectedPlan(plan);
    setShowSubscription(true);
  };

  const handleProfileUpdate = (updatedUser: any) => setUser(updatedUser);

  return (
    <div className="min-h-screen pb-24 bg-slate-900 text-white">
      
      {/* Support Button */}
      <button
        onClick={() => setShowChatBot(true)}
        className="fixed bottom-28 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg"
      >
        <MessageSquare className="w-5 h-5" />
        Support
      </button>

      <div className="max-w-md mx-auto px-4 pt-4">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-black text-amber-400">LAST DIGIT PRO</h1>

          <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold">
            <Users className="w-4 h-4" />
            {activeUsers} Live
          </div>

          <button onClick={() => setShowProfile(true)}>
            {user?.photo ? (
              <img src={user.photo} className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <UserCircle className="w-8 h-8" />
            )}
          </button>
        </div>

        {/* Wallet Section */}
        <div className="bg-slate-800 rounded-xl p-4 flex justify-between items-center mb-6 border border-white/10">
          <div>
            <p className="text-xs text-gray-400">Available Balance</p>
            <p className="text-xl font-bold">₹{user?.balance || 0}</p>
          </div>
          <button
            onClick={() => alert("Deposit system coming soon")}
            className="bg-emerald-500 px-4 py-2 rounded-lg text-sm font-bold"
          >
            Deposit
          </button>
        </div>

        {/* Subscription Plans */}
        <div className="bg-slate-800 rounded-xl p-5 mb-6 border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <Crown className="text-amber-400" />
            <h2 className="font-bold">Subscription Plans</h2>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div onClick={() => handlePlanSelect('first-time')} className="bg-slate-700 p-4 rounded-lg text-center cursor-pointer">
              <p className="text-emerald-400 text-xs font-bold">TRIAL</p>
              <p className="text-2xl font-black">₹29</p>
              <p className="text-xs text-gray-400">12 Days</p>
            </div>
            <div onClick={() => handlePlanSelect('regular')} className="bg-amber-500/10 p-4 rounded-lg text-center cursor-pointer border border-amber-400">
              <p className="text-amber-400 text-xs font-bold">PREMIUM</p>
              <p className="text-2xl font-black text-amber-400">₹1199</p>
              <p className="text-xs text-gray-400">30 Days</p>
            </div>
          </div>

          <button
            onClick={() => handlePlanSelect('regular')}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold"
          >
            Unlock VIP Access
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div onClick={() => setLocation('/lucky-search')} className="bg-slate-800 p-4 rounded-xl">
            <Search className="mb-2" />
            Lucky Search
          </div>
          <div onClick={() => setLocation('/dear-digits')} className="bg-slate-800 p-4 rounded-xl">
            <TrendingUp className="mb-2" />
            Dear Digits
          </div>
          <div onClick={() => window.open('https://lotterysambad.one/', '_blank')} className="bg-slate-800 p-4 rounded-xl">
            <FileText className="mb-2" />
            Lottery Fax
          </div>
          <div onClick={() => setShowSettings(true)} className="bg-slate-800 p-4 rounded-xl">
            <Settings className="mb-2" />
            Settings
          </div>
        </div>

      </div>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-white/10 flex justify-around py-3 text-xs">
        <button className="text-amber-400 flex flex-col items-center"><HomeIcon />Home</button>
        <button className="opacity-50 flex flex-col items-center"><History />History</button>
        <button onClick={() => setShowBank(true)} className="opacity-50 flex flex-col items-center"><CreditCard />Bank</button>
        <button onClick={() => setShowSettings(true)} className="opacity-50 flex flex-col items-center"><Settings />Settings</button>
      </nav>

      {/* Modals */}
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} onOpenPrivacy={() => setShowPrivacy(true)} />
      <PrivacyPolicyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <SubscriptionModal isOpen={showSubscription} onClose={() => setShowSubscription(false)} planType={selectedPlan} />
      <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} onUpdate={handleProfileUpdate} />
      <ChatBotModal isOpen={showChatBot} onClose={() => setShowChatBot(false)} />
      <BankAccountModal isOpen={showBank} onClose={() => setShowBank(false)} />
    </div>
  );
}
