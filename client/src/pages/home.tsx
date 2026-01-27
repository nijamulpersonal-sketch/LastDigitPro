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

        {/* Subscription Plans Card - COMPACT VERSION */}
        <div className="glass-dark rounded-3xl p-5 mb-8 border-amber-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-1.5 rounded-lg shadow-lg shadow-amber-500/10">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">VIP Plans</h2>
              <p className="text-[10px] text-gray-400">Choose your access level</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            {/* Compact Plan cards */}
            <div 
              onClick={() => handlePlanSelect('first-time')} 
              className="bg-white/5 border border-white/10 rounded-xl p-3 cursor-pointer hover:border-amber-500/30 transition text-center"
            >
              <div className="text-[10px] text-emerald-400 font-bold mb-1">OFFER</div>
              <div className="text-xl font-bold text-white">₹29</div>
              <div className="text-[10px] text-gray-400">30 Days</div>
            </div>
            
            <div 
              onClick={() => handlePlanSelect('regular')} 
              className="bg-white/5 border border-white/10 rounded-xl p-3 cursor-pointer hover:border-amber-500/30 transition text-center"
            >
              <div className="text-[10px] text-gray-500 font-bold mb-1">REGULAR</div>
              <div className="text-xl font-bold text-amber-400">₹1299</div>
              <div className="text-[10px] text-gray-400">30 Days</div>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <p className="text-[10px] text-gray-300">3 precise predictions daily</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <p className="text-[10px] text-gray-300">Lucky Search tool & 100% Refund</p>
            </div>
          </div>
          
          <button 
            onClick={() => handlePlanSelect('first-time')}
            className="unlock-btn w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 text-white shadow-lg"
          >
            SELECT PLAN
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
