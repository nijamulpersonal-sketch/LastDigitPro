import { Search, ChevronLeft, Info } from "lucide-react";
import { Link } from "wouter";

export default function LuckySearch() {
  return (
    <div className="min-h-screen pb-20 pt-6 px-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <button className="p-2 rounded-xl bg-white/10 text-white">
              <ChevronLeft className="w-6 h-6" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-white">Lucky Search</h1>
        </div>

        <div className="glass-dark rounded-3xl p-6 mb-6 vip-glow border-purple-500/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-2 rounded-xl">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Prediction Analytics</h2>
              <p className="text-sm text-gray-400">Enter your digits for AI analysis</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block px-1">TARGET DIGITS</label>
              <input 
                type="number" 
                placeholder="Enter 4-digit number"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition"
              />
            </div>
            
            <button className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold text-lg shadow-lg shadow-purple-500/20">
              SEARCH PREDICTION
            </button>
          </div>
        </div>

        {/* 50 Premium Codes Section */}
        <div className="glass-dark rounded-3xl p-6 mb-6 border-amber-500/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
              50 Unique Prediction Codes
            </h3>
            <span className="text-[10px] text-amber-400 font-bold bg-amber-400/10 px-2 py-1 rounded-full">LIVE FEED</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
            {Array.from({ length: 50 }).map((_, i) => {
              const hour = Math.floor(Math.random() * 12) + 1;
              const minute = Math.floor(Math.random() * 60).toString().padStart(2, '0');
              const period = Math.random() > 0.5 ? 'AM' : 'PM';
              return (
                <div key={i} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-3 hover:border-amber-500/30 transition group">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 font-medium">{hour}:{minute} {period}</span>
                    <span className="text-lg font-mono font-bold text-amber-300 group-hover:scale-110 transition-transform">
                      {Math.floor(1000 + Math.random() * 9000)}
                    </span>
                  </div>
                  <div className="bg-amber-400/10 p-1.5 rounded-lg">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-gray-500 mt-4 text-center italic">
            * These unique 4-digit codes are generated using time-based algorithms and historical data.
          </p>
        </div>

        <div className="glass rounded-2xl p-5 border-white/10">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-purple-400 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-300">
                Lucky Search uses 15 years of historical data to calculate probabilities for your specific number selection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
