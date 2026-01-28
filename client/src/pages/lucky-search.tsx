import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, Clock, Sparkles, CheckCircle, Info } from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ActivationModal } from "@/components/modals/activation-modal";

// Helper to generate seed-based random numbers (consistent for all users based on date)
const getDailyNumbers = (time: string, count: number) => {
  const date = new Date().toISOString().split('T')[0];
  const seed = `${date}-${time}`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash |= 0;
  }
  
  const results = [];
  for (let i = 0; i < count; i++) {
    const pseudoRandom = Math.abs(Math.sin(hash + i) * 10000);
    results.push(Math.floor(pseudoRandom % 10));
  }
  return results;
};

const TIME_CONFIG = {
  "1:00 PM": { color: "from-purple-500 to-purple-700", shadow: "shadow-purple-500/20" },
  "6:00 PM": { color: "from-indigo-500 to-indigo-700", shadow: "shadow-indigo-500/20" },
  "8:00 PM": { color: "from-pink-500 to-pink-700", shadow: "shadow-pink-500/20" },
} as const;

export default function LuckySearch() {
  const [showTimePopup, setShowTimePopup] = useState(false);
  const [selectedTime, setSelectedTime] = useState<keyof typeof TIME_CONFIG | null>(null);
  const [showActivationModal, setShowActivationModal] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  // Get daily numbers for the selected time
  const currentNumbers = useMemo(() => {
    if (!selectedTime) return [];
    return getDailyNumbers(selectedTime, 4);
  }, [selectedTime]);

  useEffect(() => {
    const activated = localStorage.getItem('vip_activated') === 'true';
    setIsActivated(activated);
    if (!activated) {
      setShowActivationModal(true);
    } else {
      setShowTimePopup(true);
    }
  }, []);

  const handleActivationSuccess = () => {
    setIsActivated(true);
    localStorage.setItem('vip_activated', 'true');
    setShowActivationModal(false);
    setShowTimePopup(true);
  };

  const handleTimeSelect = (time: keyof typeof TIME_CONFIG) => {
    setSelectedTime(time);
    setShowTimePopup(false);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-md mx-auto">
        <header className="flex items-center gap-4 mb-8">
          <Link href="/">
            <button className="p-2 hover:bg-white/5 rounded-xl bg-white/10 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Lucky Search
          </h1>
        </header>

        {isActivated ? (
          <>
            {selectedTime ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="glass-dark p-6 rounded-3xl border border-white/10 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4">
                    <CheckCircle className="w-6 h-6 text-emerald-400 opacity-50" />
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-6">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 font-medium tracking-wide uppercase text-xs">{selectedTime} Prediction</span>
                  </div>
                  
                  <div className="flex justify-center gap-3">
                    {currentNumbers.map((num, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${TIME_CONFIG[selectedTime].color} flex items-center justify-center text-xl font-bold shadow-xl ${TIME_CONFIG[selectedTime].shadow} border border-white/20`}
                      >
                        {num}
                      </motion.div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setShowTimePopup(true)}
                    className="mt-8 px-5 py-2 rounded-full border border-white/10 text-[10px] text-gray-400 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2 mx-auto"
                  >
                    <Clock className="w-3 h-3" />
                    Select Different Time
                  </button>
                </div>

                <div className="glass rounded-2xl p-5 border border-white/10 flex gap-4">
                  <div className="bg-amber-500/20 p-2.5 rounded-xl h-fit">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1">AI Recommendation</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      High-probability candidates for the {selectedTime} draw based on daily historical cycles.
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="glass-dark p-12 rounded-[3rem] border border-white/10 text-center space-y-6">
                <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto border border-purple-500/30">
                  <Sparkles className="w-10 h-10 text-purple-400" />
                </div>
                <h2 className="text-xl font-bold">Select Draw Time</h2>
                <p className="text-gray-400">Please select a time to view your personalized predictions.</p>
                <button 
                  onClick={() => setShowTimePopup(true)}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 font-bold shadow-lg shadow-purple-500/20"
                >
                  Choose Time
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="glass-dark p-12 rounded-[3rem] border border-white/10 text-center space-y-6">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto border border-slate-700">
              <Sparkles className="w-10 h-10 text-slate-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-300">Locked Feature</h2>
            <p className="text-slate-500">This feature requires VIP activation. Please click below to activate.</p>
            <button 
              onClick={() => setShowActivationModal(true)}
              className="w-full py-4 rounded-2xl bg-slate-800 text-slate-300 font-bold border border-slate-700"
            >
              Unlock Now
            </button>
          </div>
        )}

        {/* Activation Modal */}
        <ActivationModal 
          isOpen={showActivationModal}
          onClose={() => setShowActivationModal(false)}
          onSuccess={handleActivationSuccess}
        />

        {/* Time Selection Popup */}
        <AnimatePresence>
          {showTimePopup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                className="bg-white w-full max-w-sm rounded-[2.5rem] p-10 space-y-8 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)]"
              >
                <div className="text-center space-y-3">
                  <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-6" />
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">Select Time</h2>
                  <p className="text-gray-500 font-medium">Choose your preferred draw</p>
                </div>

                <div className="space-y-5">
                  <button
                    onClick={() => handleTimeSelect("1:00 PM")}
                    className="w-full py-5 rounded-full bg-[#a855f7] text-white font-extrabold text-xl shadow-[0_10px_20px_-5px_rgba(168,85,247,0.4)] hover:shadow-[0_15px_25px_-5px_rgba(168,85,247,0.5)] transition-all active:scale-95"
                  >
                    1:00 PM
                  </button>
                  <button
                    onClick={() => handleTimeSelect("6:00 PM")}
                    className="w-full py-5 rounded-full bg-[#6366f1] text-white font-extrabold text-xl shadow-[0_10px_20px_-5px_rgba(99,102,241,0.4)] hover:shadow-[0_15px_25px_-5px_rgba(99,102,241,0.5)] transition-all active:scale-95"
                  >
                    6:00 PM
                  </button>
                  <button
                    onClick={() => handleTimeSelect("8:00 PM")}
                    className="w-full py-5 rounded-full bg-[#ec4899] text-white font-extrabold text-xl shadow-[0_10px_20px_-5px_rgba(236,72,153,0.4)] hover:shadow-[0_15px_25px_-5px_rgba(236,72,153,0.5)] transition-all active:scale-95"
                  >
                    8:00 PM
                  </button>
                </div>
                
                <button 
                  onClick={() => setShowTimePopup(false)}
                  className="w-full text-gray-400 font-bold hover:text-gray-600 transition-colors pt-2"
                >
                  Close
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
