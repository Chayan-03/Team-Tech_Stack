import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "../components/ui/input";
import {
  Send,
  Loader2,
  Sprout,
  Mic,
  Plus,
  AudioLines,
  Leaf,
} from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import FarmAIEmptyState from "../components/EmptyState";
import LanguageToggle from "../components/LangSelect";
import { useTranslation } from "react-i18next";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: number;
}

interface MarkdownComponentProps {
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: {
    [index: number]: {
      isFinal: boolean;
      [index: number]: {
        transcript: string;
      };
    };
    length: number;
  };
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

const ChatBot: React.FC = () => {
  const { t } = useTranslation("chatbot");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [listen, setListen] = useState<boolean>(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Browser does not support Speech Recognition API");
      return;
    }

    const recognition: SpeechRecognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognitionRef.current = recognition;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + " ";
        }
      }
      setInput((prev) => prev + finalTranscript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      setListen(false);
    };

    recognition.onend = () => {
      setListen(false);
    };
  }, []);

  const fetchGeminiResponse = async (userMessage: string): Promise<void> => {
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: `${import.meta.env.VITE_API_KEY}` });

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: userMessage,
      });

      const aiResponse = response.text || t("chatbot.unknownResponse");

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now() * Math.random()}`,
          text: aiResponse,
          sender: "bot",
          timestamp: Date.now(),
        },
      ]);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching response:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          text: t("chatbot.errorResponse"),
          sender: "bot",
          timestamp: Date.now(),
        },
      ]);

      setLoading(false);
    }
  };

  const handleSendMessage = (): void => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: `user-${Date.now()}`,
      text: input,
      sender: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    fetchGeminiResponse(input);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !loading) {
      handleSendMessage();
    }
  };

  const startListening = (): void => {
    if (recognitionRef.current && !listen) {
      recognitionRef.current.start();
      setListen(true);
    }
  };

  const stopListening = (): void => {
    if (recognitionRef.current && listen) {
      recognitionRef.current.stop();
      setListen(false);
    }
  };

  const handleSpeechToText = (): void => {
    if (!listen) {
      console.log("listening");
      startListening();
    } else {
      stopListening();
    }
  };

  const handleFileAdd = (): void => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log(t("chatbot.selectedFiles"), files);
    }
  };

  // Properly type the Markdown components
  const MarkdownComponents: Record<string, React.FC<MarkdownComponentProps>> = {
    code({ inline, className, children, ...props }: MarkdownComponentProps) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneLight}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto ">
      {/* Header */}
      <div className="bg-emerald-600 p-4 shadow-lg flex items-center">
        <div className="flex items-center space-x-2 w-full">
          <img
            src="/me.jpeg"
            alt={t("chatbot.assistantAlt")}
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <div className="flex-1">
            <h1 className="text-lg font-bold text-white">
              {t("chatbot.title")}
            </h1>
            <p className="text-xs text-gray-200">{t("chatbot.subtitle")}</p>
          </div>
          <LanguageToggle />
          <div className="flex space-x-2">
            <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-400 transition">
              <Leaf className="text-green-600 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 relative"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.1)), url("data-uri-of-subtle-agricultural-pattern")',
          backgroundRepeat: "repeat",
        }}
      >
        {messages.length === 0 && <FarmAIEmptyState />}
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                  msg.sender === "user"
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-gray-900 border border-gray-100"
                }`}
              >
                {msg.sender === "bot" ? (
                  <ReactMarkdown
                    components={MarkdownComponents}
                    remarkPlugins={[remarkGfm]}
                  >
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  <p>{msg.text}</p>
                )}
              </div>
            </motion.div>
          ))}

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white p-3 rounded-xl flex items-center border border-gray-100 shadow-sm">
                <Loader2 className="mr-2 h-4 w-4 animate-spin text-gray-500" />
                <span className="text-gray-500">{t("chatbot.analyzing")}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-green-100 shadow-up rounded-t-3xl">
        <div className="flex items-center space-x-2">
          <Input
            className="flex-1 border border-gray-300 py-6 px-3 rounded-3xl"
            placeholder={t("chatbot.inputPlaceholder")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={loading}
          />
        </div>
        <div className="flex w-full justify-between items-center gap-4 mt-3">
          <div className="flex justify-start items-center gap-4">
            <div
              onClick={handleFileAdd}
              className="cursor-pointer flex items-center justify-center border border-gray-300 p-2 rounded-full"
            >
              <Plus className="text-green-600" />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
            />
            <button className="flex items-center font-bold text-gray-600 justify-between gap-2 rounded-full px-3 border border-gray-300 p-2">
              <Sprout className="text-green-600" />
              {t("chatbot.detect")}
            </button>
          </div>
          <div className="flex w-full justify-end gap-4">
            <button
              className={`${
                !listen
                  ? "border border-gray-300 rounded-full"
                  : "bg-gray-600 rounded-full"
              } flex items-center justify-center`}
              onClick={handleSpeechToText}
            >
              {listen ? (
                <AudioLines className="h-10 w-10 p-2 text-white animate-pulse" />
              ) : (
                <Mic className="h-10 w-10 p-2 text-green-600" />
              )}
            </button>
            <button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              className="bg-gray-600 rounded-full p-2 flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="h-6 w-6 p-0.5 animate-spin text-white" />
              ) : (
                <Send className="h-6 w-6 p-0.5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
