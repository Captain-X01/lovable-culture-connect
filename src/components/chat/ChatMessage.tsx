
import { Button } from "@/components/ui/button";
import { formatTime } from "./chatUtils";
import { Languages } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";

export interface ChatMessageProps {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  translateOptions?: boolean;
  currentLanguage?: string;
  onLanguageChange?: (lang: string) => void;
}

export const ChatMessage = ({
  text,
  isUser,
  timestamp,
  translateOptions,
  currentLanguage,
  onLanguageChange
}: ChatMessageProps) => (
  <div
    className={`mb-4 flex ${isUser ? "justify-end" : "justify-start"}`}
  >
    <div
      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
        isUser
          ? "bg-brand-purple text-white rounded-tr-none"
          : "bg-muted rounded-tl-none"
      }`}
    >
      <p>{text}</p>
      <p className={`text-xs mt-1 ${isUser ? "text-white/70" : "text-muted-foreground"}`}>
        {formatTime(timestamp)}
      </p>
      {translateOptions && onLanguageChange && currentLanguage && (
        <LanguageSelector
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
        />
      )}
    </div>
  </div>
)
