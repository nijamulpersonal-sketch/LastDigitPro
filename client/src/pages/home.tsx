import { useState, useEffect } from "react";
import { 
  ShieldCheck, Clock, Crown, Search, TrendingUp, FileText, Settings,
  Lock, UserCircle, MessageSquare, Users, Home as HomeIcon,
  History, CreditCard
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
  const [activeUsers, setActiveUsers] = useState(124);

  // ✅ NEW DEPOSIT STATES
  const [showDeposit, setShowDeposit] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(300);
  const FIXED_AMOUNTS = [300, 500, 700, 1000, 1500, 1999];

  useEffect(() => {
    const savedUser = localStorage.getItem('user_profile');
    if (!savedUser && location !== "/login") {
      setLocation("/login");
      return;
    }
    if (savedUser) setUser(JSON.parse(savedUser));

    const updateActiveUsers = () => {
      const now = new Date();
      const hour = now.getHours();
      let min = 10, max = 150;
      if (hour === 12) { min = 350; max = 500; }
      else if (hour >= 17 && hour < 20) { min = 350; max = 500; }
      else if (hour >= 20 || hour < 12) { min = 10; max = 40; }
      else { min = 50; max = 200; }
      setActiveUsers(Math.floor(Math.random() * (max - min + 1)) + min);
    };

    updateActiveUsers();
    const interval = setInterval(updateActiveUsers, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePlanSelect = (plan: 'first-time' | 'regular') => {
    setSelectedPlan(plan);
    setShowSubscription(true);
  };

  const handleProfileUpdate = (updatedUser: any) => setUser(updatedUser);

  // ✅ PAYMENT FUNCTION
  const startPayment = async (amount: number) => {
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }),
    });
    const data = await res.json();
    window.location.href = data.paymentUrl;
  };

  return (
    <div className="min-h-screen pb-24 bg-slate-900 text-white">

      {/* Floating Support */}
      <button onClick={() => setShowChatBot(true)}
        className="fixed bottom-28 right-6 z-50 px-5 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
        <MessageSquare className="w-5 h-5 inline mr-2"/>Support
      </button>

      <div className="max-w-md mx-auto px-4 pt-4">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-black bg-gradient-to-r from-amber-300 to-amber-600 bg-clip-text text-transparent">
            LAST DIGIT PRO
          </h1>

          <div className="flex items-center gap-2 text-emerald-400 text-xs">
            <Users className="w-3 h-3"/> {activeUsers} Live
          </div>

          <button onClick={() => setShowProfile(true)} className="p-1 rounded-xl bg-white/10">
            {user?.photo ? <img src={user.photo} className="w-7 h-7 rounded-lg"/> : <UserCircle/>}
          </button>
        </div>

        {/* Wallet */}
        <div className="glass-dark rounded-2xl p-3 mb-4 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-400">Available Balance</p>
            <p className="text-lg font-bold">₹{user?.balance || "0"}</p>
          </div>
          <button
            onClick={() => setShowDeposit(true)}
            className="px-5 py-2 rounded-xl bg-emerald-500 font-bold text-black flex gap-2 items-center"
          >
            <img src="https://flagcdn.com/w20/in.png" className="w-4 h-3"/> Deposit
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4">
          <div onClick={() => setLocation('/lucky-search')} className="glass p-4 rounded-xl cursor-pointer">
            <Search/> Lucky Search
          </div>
          <div onClick={() => setLocation('/dear-digits')} className="glass p-4 rounded-xl cursor-pointer">
            <TrendingUp/> Dear Digits
          </div>
        </div>
      </div>

      {/* ================= DEPOSIT MODAL ================= */}
      {showDeposit && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 p-6 rounded-2xl w-[90%] max-w-sm border border-white/10">

            <h2 className="text-lg font-bold mb-4 text-center">Select Recharge Amount</h2>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {FIXED_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setSelectedAmount(amt)}
                  className={`py-3 rounded-xl font-bold ${
                    selectedAmount === amt
                      ? "bg-gradient-to-r from-amber-400 to-amber-600 text-black"
                      : "bg-white/10 border border-white/10"
                  }`}
                >
                  ₹{amt}
                </button>
              ))}
            </div>

            <button
              onClick={() => startPayment(selectedAmount)}
              className="w-full py-3 rounded-xl bg-emerald-500 font-bold text-black mb-3"
            >
              Pay Now
            </button>

            <button onClick={() => setShowDeposit(false)} className="w-full text-sm text-gray-400">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <PrivacyPolicyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <SubscriptionModal isOpen={showSubscription} onClose={() => setShowSubscription(false)} planType={selectedPlan} />
      <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} onUpdate={handleProfileUpdate} />
      <ChatBotModal isOpen={showChatBot} onClose={() => setShowChatBot(false)} />
      <BankAccountModal isOpen={showBank} onClose={() => setShowBank(false)} />
    </div>
  );
}
