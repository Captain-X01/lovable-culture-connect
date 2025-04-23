import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Languages } from "lucide-react";
import { ChatInputBar } from "./chat/ChatInputBar";
import { ChatMessageList } from "./chat/ChatMessageList";
import { ChatMessage as MessageType } from "./chat/chatTypes";

const languages = [
  { code: "en", name: "English" },
  { code: "sv", name: "Swedish" },
  { code: "es", name: "Spanish" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" }
];

const ChatInterface = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    { id: 1, text: "Hello! How can I help you today?", isUser: false, timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    setMessages([
      ...messages,
      { id: Date.now(), text: inputMessage, isUser: true, timestamp: new Date() }
    ]);
    setInputMessage("");

    setTimeout(() => {
      let response = "";
      if (inputMessage.toLowerCase().includes("wait time") || inputMessage.toLowerCase().includes("waiting")) {
        response = "While you wait, you can explore our Cultural Connection Hub or try one of our interactive games!";
      } else if (inputMessage.toLowerCase().includes("language") || inputMessage.toLowerCase().includes("translate")) {
        response = "I can communicate in multiple languages. Would you like to change languages?";
      } else {
        response = "Thank you for your message. Our customer service team is dedicated to providing you with the best experience.";
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          text: response,
          isUser: false,
          timestamp: new Date(),
          translateOptions: inputMessage.toLowerCase().includes("language") || inputMessage.toLowerCase().includes("translate")
        }
      ]);
    }, 1000);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);

    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setMessages([
          ...messages,
          { id: Date.now(), text: "Voice message sent", isUser: true, timestamp: new Date() }
        ]);

        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              id: Date.now(),
              text: "I've received your voice message. How else can I assist you today?",
              isUser: false,
              timestamp: new Date()
            }
          ]);
        }, 1000);
      }, 3000);
    }
  };

  const changeLanguage = (lang: string) => {
    setCurrentLanguage(lang);

    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        text:
          lang === "sv"
            ? "Språket har ändrats till svenska."
            : lang === "es"
            ? "El idioma ha cambiado al español."
            : lang === "zh"
            ? "语言已更改为中文。"
            : lang === "ar"
            ? "تم تغيير اللغة إلى العربية."
            : "Language has been changed to English.",
        isUser: false,
        timestamp: new Date()
      }
    ]);
  };

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden border-2 border-brand-purple/20 shadow-lg">
      <Tabs defaultValue="chat" className="w-full">
        <div className="flex justify-center border-b">
          <TabsList className="mx-auto my-2">
            <TabsTrigger value="chat" className="px-4">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="translate" className="px-4">
              <Languages className="h-4 w-4 mr-2" />
              Translate
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="chat" className="m-0">
          <CardContent className="p-0">
            <div className="h-[400px] flex flex-col">
              <ChatMessageList
                messages={messages}
                currentLanguage={currentLanguage}
                onLanguageChange={changeLanguage}
                messagesEndRef={messagesEndRef}
              />
              <ChatInputBar
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                isRecording={isRecording}
                onToggleRecording={toggleRecording}
                onSend={handleSendMessage}
              />
            </div>
          </CardContent>
        </TabsContent>

        <TabsContent value="translate" className="m-0">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Select Language</h3>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      className={`w-full justify-start border px-4 py-2 rounded-md transition-colors text-left ${currentLanguage === lang.code ? "bg-brand-teal/20 border-brand-teal" : ""}`}
                      onClick={() => changeLanguage(lang.code)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Real-time Translation</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  All communication will be automatically translated to your selected language. You can change languages at any time without interrupting your customer service experience.
                </p>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => setCurrentLanguage("en")}
                    className="flex items-center bg-brand-purple hover:bg-brand-purple/90 text-white font-medium px-4 py-2 rounded"
                  >
                    <Languages className="h-4 w-4 mr-2" />
                    Return to Chat
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ChatInterface;
