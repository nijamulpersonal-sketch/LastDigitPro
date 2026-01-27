import { Settings, Shield, Star, RefreshCcw, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPrivacy: () => void;
}

export function SettingsModal({ isOpen, onClose, onOpenPrivacy }: SettingsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-dark border-amber-500/30 text-white max-w-sm p-6 rounded-3xl gap-0">
        <div className="text-center mb-6">
          <div className="bg-gradient-to-br from-gray-400 to-gray-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Settings</h2>
          <p className="text-gray-400 text-sm">Manage your app preferences</p>
        </div>
        
        <div className="space-y-4 mb-6">
          <button 
            onClick={onOpenPrivacy}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/5"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span className="font-medium">Privacy Policy</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/5">
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-amber-400" />
              <span className="font-medium">Rate Us</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/5">
            <div className="flex items-center gap-3">
              <RefreshCcw className="w-5 h-5 text-blue-400" />
              <span className="font-medium">Restore Purchases</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        
        <button 
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold hover:opacity-90 transition"
        >
          Close
        </button>
      </DialogContent>
    </Dialog>
  );
}
