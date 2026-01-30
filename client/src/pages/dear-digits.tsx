import { useState } from "react";
import { ChevronLeft, Search, Calendar, Filter } from "lucide-react";
import { Link } from "wouter";

// Generate mock data for the last 20 days
const generateMockData = () => {
  const data = [];
  const baseDate = new Date(); // Use actual current date
  
  const values = [
    { mor: "4", day: "-", evn: "-" }, // Today (30-01-26 in screenshot)
    { mor: "5", day: "1", evn: "5" }, // 29-01-26
    { mor: "5", day: "2", evn: "6" }, // 28-01-26
    { mor: "7", day: "0", evn: "0" }, // 27-01-26
    { mor: "-", day: "-", evn: "-" }, // 26-01-26
    { mor: "8", day: "3", evn: "2" }, // 25-01-26
    { mor: "1", day: "1", evn: "5" },
    { mor: "4", day: "6", evn: "0" },
    { mor: "7", day: "8", evn: "0" },
    { mor: "2", day: "7", evn: "6" },
    { mor: "3", day: "2", evn: "3" },
    { mor: "8", day: "7", evn: "0" },
    { mor: "9", day: "1", evn: "2" },
    { mor: "1", day: "9", evn: "4" },
    { mor: "7", day: "8", evn: "9" },
    { mor: "9", day: "0", evn: "2" },
    { mor: "6", day: "6", evn: "2" },
    { mor: "3", day: "7", evn: "2" },
    { mor: "4", day: "7", evn: "0" },
    { mor: "7", day: "1", evn: "2" },
  ];

  for (let i = 0; i < 20; i++) {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() - i);
    const dateStr = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear().toString().slice(-2)}`;
    
    data.push({
      date: dateStr,
      mor: values[i]?.mor || "-",
      day: values[i]?.day || "-",
      evn: values[i]?.evn || "-"
    });
  }
  return data;
};

const CHART_DATA = generateMockData();

export default function DearDigits() {
  const [searchTerm, setSearchTerm] = useState("");

  const isHighlighted = (val: string) => {
    if (!searchTerm || val === "-") return false;
    return val === searchTerm;
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      {/* Header - Matching Screenshot */}
      <header className="bg-[#d53369] text-white p-4 flex items-center gap-4 shadow-md sticky top-0 z-20">
        <Link href="/">
          <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <ChevronLeft className="w-7 h-7" />
          </button>
        </Link>
        <h1 className="text-xl font-bold">Dear : First Prize Last Digit</h1>
      </header>

      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {/* Search Box - Matching Screenshot */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center gap-3">
            <span className="text-slate-700 font-bold whitespace-nowrap">Search :</span>
            <div className="relative flex-1">
              <input 
                type="number"
                min="0"
                max="9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value.slice(0, 1))}
                placeholder="Search Number"
                className="w-full border-2 border-slate-300 rounded px-3 py-1.5 focus:outline-none focus:border-blue-400 transition-colors text-slate-800 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Table - Matching Screenshot */}
        <div className="bg-white rounded shadow-sm overflow-hidden border border-slate-200">
          <div className="grid grid-cols-4 bg-[#4caf50] text-white font-bold text-center">
            <div className="py-2.5 border-r border-white/20">DATE</div>
            <div className="py-2.5 border-r border-white/20">MOR</div>
            <div className="py-2.5 border-r border-white/20">DAY</div>
            <div className="py-2.5">EVN</div>
          </div>

          <div className="divide-y divide-slate-200">
            {CHART_DATA.map((row, idx) => (
              <div key={idx} className="grid grid-cols-4 text-center items-center">
                <div className="py-2.5 bg-[#e1eaf1] text-slate-700 font-medium border-r border-slate-200">
                  {row.date}
                </div>
                
                <div className={`py-2.5 border-r border-slate-200 font-bold transition-colors duration-200 ${isHighlighted(row.mor) ? 'bg-yellow-300 text-slate-900' : 'text-slate-800'}`}>
                  {row.mor}
                </div>
                
                <div className={`py-2.5 border-r border-slate-200 font-bold transition-colors duration-200 ${isHighlighted(row.day) ? 'bg-yellow-300 text-slate-900' : 'text-slate-800'}`}>
                  {row.day}
                </div>
                
                <div className={`py-2.5 font-bold transition-colors duration-200 ${isHighlighted(row.evn) ? 'bg-yellow-300 text-slate-900' : 'text-slate-800'}`}>
                  {row.evn}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instruction Footer */}
        <div className="bg-white p-4 rounded-lg border border-slate-200 flex gap-3 items-start">
          <Filter className="w-5 h-5 text-[#d53369] shrink-0 mt-0.5" />
          <p className="text-sm text-slate-600">
            Enter a number (0-9) in the search box to highlight its occurrences in the 20-day chart.
          </p>
        </div>
      </div>
    </div>
  );
}
