import { CheckCircle, CreditCard, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  planType: 'first-time' | 'regular' | null;
}

export function SubscriptionModal({ isOpen, onClose, planType }: SubscriptionModalProps) {
  const isFirstTime = planType === 'first-time';
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-dark border-amber-500/30 text-white max-w-sm p-6 rounded-3xl gap-0">
        <div className="text-center mb-6">
          <div className="bg-gradient-to-br from-amber-400 to-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/20">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {isFirstTime ? "First Time User Offer" : "Regular Plan"}
          </h2>
          <p className="text-gray-400 text-sm">30 Days Access</p>
        </div>
        
        <div className="mb-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-4xl font-bold text-amber-400">
              {isFirstTime ? "₹29" : "₹1299"}
            </span>
            {isFirstTime && (
              <span className="text-lg text-gray-400 line-through">₹1299</span>
            )}
          </div>
          {isFirstTime && (
            <div className="mt-1 text-emerald-400 text-sm font-semibold">Save 97% • Limited Time</div>
          )}
        </div>
        
        <div className="space-y-3 mb-8">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-200">Unlock all VIP predictions</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-200">Access to Lucky Search tool</p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-200">100% refund guarantee</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <a 
            href={`upi://pay?pa=nijamul.mal@ptyes&pn=LastDigitPro&am=${isFirstTime ? '29' : '1199'}&cu=INR`}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-700 text-white font-bold hover:opacity-90 transition shadow-lg shadow-emerald-500/20 text-center block"
          >
            Pay via UPI
          </a>
          <button 
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-white/5 text-gray-300 font-semibold hover:bg-white/10 transition"
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
