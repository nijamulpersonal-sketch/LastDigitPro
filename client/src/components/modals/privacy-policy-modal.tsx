import { X, Shield, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-dark border-amber-500/30 text-white max-w-md max-h-[80vh] p-0 gap-0">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-2 rounded-xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-white">Privacy Policy</DialogTitle>
              <DialogDescription className="text-gray-400">Effective Date: January 27, 2026</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <ScrollArea className="h-full max-h-[60vh] px-6 pb-6">
          <div className="space-y-4 text-sm text-gray-300">
            <section>
              <h3 className="text-emerald-400 font-semibold mb-2">1. Information We Collect</h3>
              <p className="mb-2">We collect minimal information necessary to operate and improve the app.</p>
              
              <h4 className="text-white font-medium mt-2">a) Information You Provide</h4>
              <p>We do not require account registration. However, if you contact support, we may collect your email address and message content.</p>
              
              <h4 className="text-white font-medium mt-2">b) Automatically Collected Information</h4>
              <p>We collect device type, OS version, app version, and IP address for security and performance.</p>

              <h4 className="text-white font-medium mt-2">c) Prediction Input Data</h4>
              <p>Numbers entered for prediction are processed but not publicly visible or sold.</p>
            </section>

            <section>
              <h3 className="text-emerald-400 font-semibold mb-2">2. How We Use Your Information</h3>
              <ul className="list-disc pl-4 space-y-1">
                <li>Provide number prediction features</li>
                <li>Improve app performance and accuracy</li>
                <li>Fix bugs and technical problems</li>
                <li>Respond to user support requests</li>
                <li>Maintain security and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h3 className="text-emerald-400 font-semibold mb-2">3. Data Sharing</h3>
              <p>We do not sell your data. We may share it with service providers (hosting), for legal requirements, or during business transfers.</p>
            </section>

            <section>
              <h3 className="text-emerald-400 font-semibold mb-2">4. Contact Information</h3>
              <p>If you have any questions about this Privacy Policy, contact:</p>
              <div className="mt-2 bg-white/5 p-3 rounded-lg border border-white/10">
                <p><span className="text-gray-400">Owner:</span> NSK</p>
                <p><span className="text-gray-400">Email:</span> lastdigitpro765@gmail.com</p>
                <p><span className="text-gray-400">Country:</span> India</p>
              </div>
            </section>
          </div>
        </ScrollArea>

        <div className="p-6 pt-2 border-t border-white/10">
          <button 
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold hover:opacity-90 transition"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
