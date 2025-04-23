import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Send, Mic, MicOff, Languages } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  translateOptions?: boolean;
}

const languages = [
  { code: "en", name: "English" },
  { code: "sv", name: "Swedish" },
  { code: "es", name: "Spanish" },
  { code: "zh", name: "Chinese" },
  { code: "ar", name: "Arabic" }
];

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Hello! How can I help you today?", 
      isUser: false, 
      timestamp: new Date() 
    }
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
      { 
        id: Date.now(), 
        text: inputMessage, 
        isUser: true, 
        timestamp: new Date() 
      }
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
          { 
            id: Date.now(), 
            text: "Voice message sent", 
            isUser: true, 
            timestamp: new Date() 
          }
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
        text: lang === "sv" ? "Språket har ändrats till svenska." :
              lang === "es" ? "El idioma ha cambiado al español." :
              lang === "zh" ? "语言已更改为中文。" :
              lang === "ar" ? "تم تغيير اللغة إلى العربية." : 
              "Language has been changed to English.", 
        isUser: false, 
        timestamp: new Date() 
      }
    ]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden border-2 border-brand-purple/20 shadow-lg">
      <Tabs defaultValue="chat" className="w-full">
        <div className="bg-brand-purple text-white p-3">
          <TabsList className="bg-brand-purple/40 grid w-full grid-cols-2">
            <TabsTrigger value="chat" className="data-[state=active]:bg-white data-[state=active]:text-brand-purple">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="translate" className="data-[state=active]:bg-white data-[state=active]:text-brand-purple">
              <Languages className="h-4 w-4 mr-2" />
              Translate
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="chat" className="m-0">
          <CardContent className="p-0">
            <div className="h-[400px] flex flex-col">
              <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.isUser
                          ? 'bg-brand-purple text-white rounded-tr-none'
                          : 'bg-muted rounded-tl-none'
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 ${message.isUser ? 'text-white/70' : 'text-muted-foreground'}`}>
                        {formatTime(message.timestamp)}
                      </p>
                      
                      {message.translateOptions && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {languages.slice(0, 3).map(lang => (
                            <Button 
                              key={lang.code} 
                              variant="outline" 
                              size="sm"
                              onClick={() => changeLanguage(lang.code)}
                              className={`text-xs ${currentLanguage === lang.code ? 'bg-brand-teal/20' : ''}`}
                            >
                              {lang.name}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              <div className="border-t p-3 bg-white">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  
                  <Button
                    onClick={toggleRecording}
                    variant={isRecording ? "destructive" : "outline"}
                    size="icon"
                    className="flex-shrink-0"
                  >
                    {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  
                  <Button onClick={handleSendMessage} className="flex-shrink-0 bg-brand-purple hover:bg-brand-purple/90">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
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
                    <Button 
                      key={lang.code}
                      variant="outline" 
                      className={`w-full justify-start ${currentLanguage === lang.code ? 'bg-brand-teal/20 border-brand-teal' : ''}`}
                      onClick={() => changeLanguage(lang.code)}
                    >
                      {lang.name}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Real-time Translation</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  All communication will be automatically translated to your selected language. You can change languages at any time without interrupting your customer service experience.
                </p>
                <div className="flex justify-center mt-4">
                  <Button onClick={() => setCurrentLanguage("en")} className="bg-brand-purple hover:bg-brand-purple/90">
                    <Languages className="h-4 w-4 mr-2" />
                    Return to Chat
                  </Button>
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
