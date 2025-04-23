
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Mic, MicOff } from "lucide-react";

interface ChatInputBarProps {
  inputMessage: string;
  setInputMessage: (msg: string) => void;
  isRecording: boolean;
  onToggleRecording: () => void;
  onSend: () => void;
}

export const ChatInputBar = ({
  inputMessage,
  setInputMessage,
  isRecording,
  onToggleRecording,
  onSend
}: ChatInputBarProps) => (
  <div className="border-t p-3 bg-white">
    <div className="flex gap-2">
      <Input
        placeholder="Type your message..."
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && onSend()}
        className="flex-1"
      />
      <Button
        onClick={onToggleRecording}
        variant={isRecording ? "destructive" : "outline"}
        size="icon"
        className="flex-shrink-0"
      >
        {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
      </Button>
      <Button onClick={onSend} className="flex-shrink-0 bg-brand-purple hover:bg-brand-purple/90">
        <Send className="h-4 w-4" />
      </Button>
    </div>
  </div>
)
