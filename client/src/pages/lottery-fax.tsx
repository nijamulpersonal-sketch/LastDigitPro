import { FileText, ChevronLeft, Download } from "lucide-react";
import { Link } from "wouter";

export default function LotteryFax() {
  const archives = [
    { title: "Morning Results", time: "1:00 PM", date: "Jan 27, 2026" },
    { title: "Day Results", time: "6:00 PM", date: "Jan 27, 2026" },
    { title: "Night Results", time: "8:00 PM", date: "Jan 27, 2026" },
    { title: "Morning Results", time: "1:00 PM", date: "Jan 26, 2026" },
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
          <h1 className="text-2xl font-bold text-white">Lottery Fax</h1>
        </div>

        <div className="glass-dark rounded-3xl p-6 mb-6 border-pink-500/30">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-2 rounded-xl">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Results Archive</h2>
              <p className="text-sm text-gray-400">Official fax result copies</p>
            </div>
          </div>

          <div className="space-y-4">
            {archives.map((item, i) => (
              <div key={i} className="group flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-pink-500/30 transition">
                <div>
                  <h3 className="font-bold text-white">{item.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">{item.date}</span>
                    <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                    <span className="text-xs text-pink-400">{item.time}</span>
                  </div>
                </div>
                <button className="p-2 rounded-lg bg-white/5 text-gray-400 group-hover:text-pink-400 group-hover:bg-pink-400/10 transition">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
