import { useState, useEffect } from "react";
import { X, Settings, Shield, Bell, Zap, LogOut, ChevronRight, Moon, User } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPrivacy: () => void;
}

export function SettingsModal({ isOpen, onClose, onOpenPrivacy }: SettingsModalProps) {
  const { toast } = useToast();
  
  const handleLogout = () => {
    localStorage.removeItem('user_profile');
    localStorage.removeItem('is_logged_in');
    onClose();
    window.location.href = "/login";
    toast({ title: "Logged Out", description: "Successfully signed out." });
  };

  const settingsItems = [
    { icon: <Shield className="w-5 h-5 text-emerald-400" />, title: "Privacy Policy", sub: "Data protection & security", action: onOpenPrivacy },
    { icon: <Bell className="w-5 h-5 text-amber-400" />, title: "Notifications", sub: "Daily prediction alerts" },
    { icon: <Zap className="w-5 h-5 text-purple-400" />, title: "Premium VIP", sub: "Access exclusive digits" },
    { icon: <Moon className="w-5 h-5 text-blue-400" />, title: "Dark Mode", sub: "Glassmorphism active" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-dark border-amber-500/30 text-white max-w-sm p-0 rounded-[2.5rem] overflow-hidden gap-0">
        <div className="relative p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl border border-white/10 shadow-xl shadow-black/20">
                <Settings className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">Settings</h2>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Premium Configuration</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="space-y-3 mb-8">
            {settingsItems.map((item, idx) => (
              <button 
                key={idx}
                onClick={item.action}
                className="w-full flex items-center justify-between p-4 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group active:scale-95"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-xl bg-white/5 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">{item.title}</p>
                    {item.sub && <p className="text-[9px] font-medium text-gray-500 uppercase tracking-widest">{item.sub}</p>}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-amber-500 transition-colors" />
              </button>
            ))}
          </div>

          <button 
            onClick={handleLogout}
            className="w-full py-4 rounded-2xl bg-rose-500/10 text-rose-500 font-black text-xs uppercase tracking-widest border border-rose-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 hover:bg-rose-500/20"
          >
            <LogOut className="w-4 h-4" />
            Logout Account
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
