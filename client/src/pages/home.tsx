import { useState } from "react";
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
  Lock
} from "lucide-react";
import { useLocation } from "wouter";
import { PrivacyPolicyModal } from "@/components/modals/privacy-policy-modal";
import { SubscriptionModal } from "@/components/modals/subscription-modal";
import { SettingsModal } from "@/components/modals/settings-modal";

export default function Home() {
  const [location, setLocation] = useLocation();
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'first-time' | 'regular' | null>(null);

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

  return (
    <div className="min-h-screen pb-20">
      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/916294712704?text=Hello%20Last%20Digit%20Pro%20team,%20I%20need%20assistance" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 whatsapp-btn flex items-center gap-2 px-5 py-3 rounded-full font-semibold transition-all duration-300 text-white"
      >
        <MessageCircle className="w-5 h-5" />
        <span>Support</span>
      </a>

      {/* Main Dashboard */}
      <div className="max-w-md mx-auto px-4 pt-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="glass rounded-3xl p-6 mb-4 gold-glow">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-300 to-yellow-500 bg-clip-text text-transparent">
              LAST DIGIT PRO
            </h1>
            <p className="text-gray-300 mt-2">Premium Lottery Insights & Predictions</p>
            <div className="mt-4 flex justify-center items-center gap-3">
              <div className="flex items-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400 mr-1" />
                <span className="text-xs text-gray-300">Secure VIP Access</span>
              </div>
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-amber-400 mr-1" />
                <span className="text-xs text-gray-300">3 Daily Updates</span>
              </div>
            </div>
          </div>
        </div>

        {/* VIP Daily Access Card */}
        <div className="relative glass-dark rounded-[2.5rem] p-8 mb-10 border-2 border-amber-400/50 shadow-2xl shadow-amber-400/10">
          {/* Trusted Badge */}
          <div className="absolute -top-3 -right-3">
            <div className="bg-amber-400 text-black text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg border-2 border-slate-900 uppercase tracking-wider">
              Trusted
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <Crown className="w-8 h-8 text-amber-400" />
            <h2 className="text-3xl font-black text-white tracking-tight">VIP Daily Access</h2>
          </div>
          
          <div className="flex items-baseline gap-4 mb-8">
            <span className="text-5xl font-black text-amber-400">₹499</span>
            <span className="text-xl text-gray-500 line-through font-medium">₹1599</span>
            <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-md border border-emerald-500/20">
              68.8% OFF
            </span>
          </div>

          <div className="flex gap-3 mb-8">
            {['01:00 PM', '06:00 PM', '08:00 PM'].map((time) => (
              <div key={time} className="flex-1 py-3 px-2 rounded-2xl bg-slate-800/50 border border-slate-700 text-emerald-400 font-bold text-sm text-center">
                {time}
              </div>
            ))}
          </div>

          <div className="bg-rose-500/10 border border-rose-500/20 rounded-3xl p-6 mb-8 relative overflow-hidden group">
            <div className="flex gap-4 relative z-10">
              <div className="bg-rose-500 p-2.5 rounded-2xl shadow-lg shadow-rose-500/40 shrink-0 h-fit">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-rose-400 font-black text-lg uppercase tracking-tight mb-2">100% Refund Guarantee</h3>
                <p className="text-gray-300 text-sm leading-relaxed font-medium">
                  If our <span className="text-white font-bold underline decoration-rose-500/50">3 Daily Predictions</span> miss the target, your full payment will be refunded to your account immediately.
                </p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => handlePlanSelect('regular')}
            className="w-full py-5 rounded-[2rem] bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-900 font-black text-xl shadow-xl shadow-amber-400/30 transition-all active:scale-95 uppercase tracking-wide"
          >
            Unlock VIP Predictions
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
            onClick={() => setLocation('/lottery-fax')}
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
    </div>
  );
}
