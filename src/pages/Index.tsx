
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";
import CulturalHub from "@/components/CulturalHub";
import GamePreview from "@/components/GamePreview";

const VIEWS = [
  { name: "Kundtjänstchatt", key: "chat" },
  { name: "Kulturell hub", key: "hub" },
  { name: "Spel", key: "games" },
];

const Index = () => {
  const [view, setView] = useState<string | null>("chat");

  return (
    <div className="min-h-screen flex flex-col bg-brand-light">
      {/* Top bar with dropdown menu */}
      <div className="w-full flex justify-between items-center px-4 py-3 bg-white shadow text-brand-purple">
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-lg">CultureConnect System</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              {VIEWS.find(v => v.key === view)?.name ?? "Välj"} <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-50">
            {VIEWS.map(v => (
              <DropdownMenuItem
                key={v.key}
                onClick={() => setView(v.key)}
                className={view === v.key ? "bg-brand-teal/10" : ""}
              >
                {v.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setView(null)}>
              Ingen vy
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Content area */}
      <main className="flex-1 flex justify-center items-center bg-brand-light/70 transition-all">
        {view === "chat" && (
          <div className="w-full max-w-xl mx-auto my-10">
            <ChatInterface />
          </div>
        )}
        {view === "hub" && (
          <div className="w-full max-w-2xl mx-auto my-10">
            <CulturalHub />
          </div>
        )}
        {view === "games" && (
          <div className="w-full max-w-2xl mx-auto my-10">
            <GamePreview />
          </div>
        )}
        {!view && <span className="text-brand-purple/60 text-lg">Välj en funktion från menyn ovan.</span>}
      </main>
    </div>
  );
};

export default Index;

