// src/components/ChatBot.tsx
import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { submitChat } from "../lib/api";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const SERVICES_LIST = "• Web Development\n• Mobile Applications\n• AI Solutions\n• Data Analytics\n• Payment Integration";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Hey! Welcome to TECHIVE. Here are our services:\n\n" + SERVICES_LIST + "\n\nHow can we help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [userReplied, setUserReplied] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning!";
    if (hour < 17) return "Good afternoon!";
    return "Good evening!";
  };

  const sendMessage = async () => {
    if (!input.trim() || sending) return;
    const userMessage: Message = {
      id: Date.now(),
      text: input.trim(),
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSending(true);

    try {
      await submitChat({ name: "Website Visitor", email: "visitor@techive.co.ke", phone: "", message: userMessage.text });
    } catch {
      // proceed even if API fails
    }

    setTimeout(() => {
      if (!userReplied) {
        setUserReplied(true);
        const botMessage: Message = {
          id: Date.now() + 1,
          text: `${getTimeBasedGreeting()} We have received your query. Our team will contact you shortly. Have a nice day!`,
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const botMessage: Message = {
          id: Date.now() + 1,
          text: "Thank you for your message. Our team will get back to you within one business day.",
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      }
      setSending(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[340px] max-h-[460px] bg-white border border-border rounded-2xl shadow-depth-lg flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-brand-gradient px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full size-10 flex items-center justify-center">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <p className="font-heading font-bold text-sm text-white">TECHIVE Support</p>
                <p className="font-body text-[11px] text-white/80">Usually replies in minutes</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-bg">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm font-body leading-relaxed whitespace-pre-line ${
                    m.sender === "user"
                      ? "bg-brand-gradient text-white rounded-br-md"
                      : "bg-white border border-border text-ink rounded-bl-md"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="bg-white border border-border px-4 py-2.5 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-border bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 border border-border rounded-btn px-3 py-2 text-sm outline-none focus:border-cyan focus:ring-2 focus:ring-cyan/20 transition-all"
                disabled={sending}
              />
              <button
                onClick={sendMessage}
                disabled={sending || !input.trim()}
                className="bg-brand-gradient rounded-btn px-3 py-2 text-white disabled:opacity-60 hover:shadow-depth-sm transition-all"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        className={`relative rounded-full p-4 shadow-depth-lg flex items-center justify-center transition-all hover:scale-105 ${
          open ? "bg-ink text-white" : "bg-brand-gradient text-white"
        }`}
        aria-label="Open chat"
      >
        {!open && (
          <span className="absolute inset-0 rounded-full bg-brand-gradient animate-ping opacity-40" />
        )}
        <MessageCircle size={24} className="relative z-10" />
      </button>
    </div>
  );
}
