import { useState, useEffect } from "react";
import { X, History, Trash2, Calendar, Trophy, Star } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HistoryModal({ isOpen, onClose }: HistoryModalProps) {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const savedHistory = JSON.parse(localStorage.getItem('prediction_history') || '[]');
      setHistory(savedHistory.sort((a: any, b: any) => b.timestamp - a.timestamp));
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-dark border-amber-500/30 text-white max-w-md p-0 rounded-[2.5rem] overflow-hidden gap-0">
        <div className="relative p-8 h-[80vh] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl shadow-lg shadow-amber-500/20">
                <History className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">VIP History</h2>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Your Lucky Numbers</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-20 opacity-40">
                <Star className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                <p className="font-bold text-sm uppercase tracking-widest">No predictions yet</p>
              </div>
            ) : (
              history.map((item, idx) => (
                <div key={idx} className="glass-dark border border-white/5 rounded-3xl p-5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-2xl group-hover:bg-amber-500/10 transition-all"></div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-amber-500" />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {new Date(item.timestamp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                      </span>
                    </div>
                    <div className="px-3 py-1 bg-amber-500/10 rounded-full">
                      <span className="text-[9px] font-black text-amber-500 uppercase tracking-tighter">SUCCESS</span>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center">
                    {item.numbers?.map((num: string, i: number) => (
                      <div key={i} className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xl font-black text-slate-900 shadow-lg shadow-amber-500/20 transform group-hover:scale-110 transition-all duration-300" style={{ transitionDelay: `${i * 50}ms` }}>
                        {num}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between text-[9px] font-bold text-gray-500 uppercase tracking-widest pt-4 border-t border-white/5">
                    <span>Draw Time: {item.drawTime || '08:00 PM'}</span>
                    <Trophy className="w-3 h-3 text-amber-500/50" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
