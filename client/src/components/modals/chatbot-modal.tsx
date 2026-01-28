import { useState, useEffect, useRef } from "react";
import { Send, X, Bot, User, Sparkles } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: 'bot' | 'user';
  text: string;
}

interface ChatBotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const KNOWLEDGE_BASE = [
  {
    keywords: ["refund", "paisa wapas", "return", "refund kab hoga"],
    response: "Chinta mat Karen, aapka refund 48 ghante (hours) mein ho jaega. Humari team is par kaam kar rahi hai. (Don't worry, your refund will be processed within 48 hours.)"
  },
  {
    keywords: ["hi", "hello", "hey", "namaste", "okay", "ok", "thik hai", "achha"],
    response: "Ji! Main aapki aur kaise madad kar sakta hoon? (How else can I help you?)"
  },
  {
    keywords: ["activation", "code", "axis code", "khul nahi raha", "locked"],
    response: "VIP features kholne ke liye aapko Access Code ki zarurat hogi. Payment ke baad WhatsApp par message karke apna code le sakte hain. (You need an Access Code to unlock VIP features. Message us on WhatsApp after payment.)"
  },
  {
    keywords: ["price", "kitna hai", "payment", "recharge", "subscription"],
    response: "Humare paas do plans hain: Trial Pack ₹29 (12 days) aur Premium Plan ₹1199 (30 days). Aap dashboard se subscribe kar sakte hain."
  },
  {
    keywords: ["lucky search", "prediction", "number", "kaise dekhen"],
    response: "Lucky Search mein aapko daily 4 unique numbers milte hain Draw time ke hisab se. Slot open hone par aap numbers dekh sakte hain."
  }
];

export function ChatBotModal({ isOpen, onClose }: ChatBotModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Namaste! Main Last Digit Pro AI Assistant hoon. Main aapki kaise madad kar sakta hoon?" }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.toLowerCase();
    const newMessages = [...messages, { role: 'user', text: input }];
    setMessages(newMessages);
    setInput("");

    // Find matching response
    setTimeout(() => {
      let botResponse = "Maaf kijiyega, mujhe ye samajh nahi aaya. Kya aap thoda detail mein bata sakte hain? Humari team aapko jaldi hi call karegi. (Sorry, I didn't get that. Our team will contact you soon.)";
      
      for (const entry of KNOWLEDGE_BASE) {
        if (entry.keywords.some(keyword => userMessage.includes(keyword))) {
          botResponse = entry.response;
          break;
        }
      }

      setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    }, 800);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-dark border-purple-500/30 text-white max-w-sm p-0 rounded-[2rem] overflow-hidden gap-0 flex flex-col h-[500px]">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-sm">LDP Assistant</h3>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Online</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Chat Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide"
        >
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-purple-600 text-white rounded-tr-none' 
                    : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-slate-900/50 border-t border-white/10">
          <div className="flex gap-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
            />
            <button 
              onClick={handleSend}
              className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
