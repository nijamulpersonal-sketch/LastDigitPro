import { TrendingUp, ChevronLeft, Calendar } from "lucide-react";
import { Link } from "wouter";

export default function DearDigits() {
  const chartData = [
    { date: "Jan 27", num: "4521", status: "WIN" },
    { date: "Jan 26", num: "8902", status: "MISS" },
    { date: "Jan 25", num: "1274", status: "WIN" },
    { date: "Jan 24", num: "6630", status: "WIN" },
    { date: "Jan 23", num: "3049", status: "MISS" },
    { date: "Jan 22", num: "7712", status: "WIN" },
  ];

  return (
    <div className="min-h-screen pb-20 pt-6 px-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <button className="p-2 rounded-xl bg-white/10 text-white">
              <ChevronLeft className="w-6 h-6" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-white">Dear Digits</h1>
        </div>

        <div className="glass-dark rounded-3xl p-6 mb-6 border-cyan-500/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">15-Day Performance</h2>
              <p className="text-sm text-gray-400">Recent winning patterns</p>
            </div>
          </div>

          <div className="space-y-3">
            {chartData.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-300">{item.date}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-lg font-bold text-white tracking-wider">{item.num}</span>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                    item.status === 'WIN' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
