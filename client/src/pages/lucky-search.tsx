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
