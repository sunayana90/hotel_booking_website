import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes, FaPaperPlane, FaQuestion } from "react-icons/fa";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "👋 Hello! Welcome to Luxe Haven. How can I assist you today?" }
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickSuggestions = [
    "🏨 Room Information",
    "📅 Make a Booking",
    "💰 Pricing",
    "🍽️ Dining Options",
    "📞 Contact Us",
    "✨ Amenities",
  ];

  // 🧠 PREDEFINED HOTEL KNOWLEDGE
  const predefinedAnswers = [
    {
      keywords: ["room", "rooms", "suite"],
      reply: "🏨 We offer Standard, Deluxe, Executive, and Presidential rooms with luxury amenities."
    },
    {
      keywords: ["booking", "book", "reserve"],
      reply: "📅 You can book rooms directly from the Book Now page. Booking confirmation is instant."
    },
    {
      keywords: ["menu", "food", "restaurant"],
      reply: "🍽️ Our restaurant serves multi-cuisine dishes. Room service is available 24/7."
    },
    {
      keywords: ["contact", "phone", "email"],
      reply: "📞 Call us at +91 22 1234 5678 or email info@luxehaven.com"
    },
    {
      keywords: ["location", "address"],
      reply: "📍 Luxe Haven, Mumbai, Maharashtra, India."
    }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔍 Check predefined answers first
  const getPredefinedReply = (text) => {
    const lower = text.toLowerCase();
    for (const item of predefinedAnswers) {
      if (item.keywords.some(k => lower.includes(k))) {
        return item.reply;
      }
    }
    return null;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const userText = userInput;
    setMessages(prev => [...prev, { type: "user", text: userText }]);
    setUserInput("");
    setIsTyping(true);

    // ✅ 1. Try predefined answer first (faster response)
    const predefined = getPredefinedReply(userText);
    if (predefined) {
      setTimeout(() => {
        setMessages(prev => [...prev, { type: "bot", text: predefined }]);
        setIsTyping(false);
      }, 800);
      return;
    }

    // 🤖 2. Fallback to Ollama backend for custom questions
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText })
      });

      const data = await res.json();

      setMessages(prev => [...prev, { type: "bot", text: data.reply || "I'm not sure about that. Please try rephrasing or contact us at +91 (22) 1234-5678." }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [
        ...prev,
        { type: "bot", text: "⚠️ Connection error. Please try again or contact us at +91 (22) 1234-5678." }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // ✅ FIXED FUNCTION
  const handleQuickSuggestion = (text) => {
    setUserInput(text);
    setTimeout(() => {
      handleSendMessage({ preventDefault: () => {} });
    }, 100);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-yellow-500 hover:bg-yellow-600 text-black p-4 rounded-full shadow-2xl z-40"
      >
        {isOpen ? <FaTimes size={22} /> : <FaRobot size={22} />}
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 w-96 bg-gray-900 rounded-2xl shadow-2xl flex flex-col z-50 border-2 border-yellow-500 h-[500px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 rounded-t-2xl flex justify-between items-center">
            <div>
              <h3 className="font-bold text-black text-lg">Luxe Haven Assistant</h3>
              <p className="text-sm text-black/70">Always here to help!</p>
            </div>
            <FaTimes className="cursor-pointer text-black hover:scale-110" onClick={() => setIsOpen(false)} />
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-800 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-4 py-2 rounded-lg text-sm max-w-xs whitespace-pre-wrap ${
                  m.type === "user" 
                    ? "bg-yellow-500 text-black rounded-br-none" 
                    : "bg-gray-700 text-white rounded-bl-none"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-700 text-white px-4 py-3 rounded-lg rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Suggestions (only on first message) */}
            {!isTyping && messages.length === 1 && (
              <div className="space-y-2 mt-4">
                <p className="text-gray-400 text-xs flex gap-2 items-center font-semibold">
                  <FaQuestion size={12} /> QUICK QUESTIONS:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {quickSuggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuickSuggestion(s)}
                      className="bg-gray-700 hover:bg-yellow-600 text-left px-2 py-2 rounded text-xs text-white transition transform hover:scale-105"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 bg-gray-800 border-t border-gray-700 flex gap-2">
            <input
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Type your question..."
              disabled={isTyping}
            />
            <button 
              type="submit" 
              disabled={isTyping || !userInput.trim()}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg transition disabled:opacity-50"
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
