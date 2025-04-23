
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

// Views, no change here except names
const VIEWS = [
  { name: "Kundtjänstchatt", key: "chat" },
  { name: "Kulturell hub", key: "hub" },
  { name: "Spel", key: "games" },
];

const Index = () => {
  const [view, setView] = useState<string | null>("chat");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-red-200 to-blue-300">
      {/* Card */}
      <div className="rounded-3xl shadow-xl border border-white/20 w-full max-w-2xl glass-morphism relative overflow-visible">
        {/* Top bar with dropdown menu */}
        <div className="w-full flex justify-between items-center px-4 py-3"
          style={{ background: "linear-gradient(90deg,#F2FCE2,#ea384c,#1EAEDB)" }}>
          {/* Logo/namn */}
          <span className="font-display font-bold text-lg tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-red-600 to-blue-700 select-none">CService</span>
          {/* Dropdown */}
          <div
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
            className="relative z-50"
          >
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-white/40 border-white/30 hover:bg-white/80 transition-colors backdrop-blur-md shadow-xl"
              style={{ minWidth: 130 }}
              aria-haspopup="listbox"
              aria-expanded={menuOpen}
            >
              {VIEWS.find(v => v.key === view)?.name ?? "Välj"}
              <ChevronDown className={`w-4 h-4 transform transition-transform ${menuOpen ? "rotate-180" : ""}`} />
            </Button>
            {/* Dropdown menu - egen */}
            <div
              className={`
                absolute right-0 mt-2 min-w-[150px] rounded-xl shadow-2xl bg-white/95 border border-white/60
                transition-all duration-300 origin-top 
                ${menuOpen ? "opacity-100 scale-100 pointer-events-auto translate-y-0" : "opacity-0 scale-95 pointer-events-none -translate-y-2"}
              `}
              style={{
                // Soft blur-glass effect
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)"
              }}
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
              role="listbox"
              tabIndex={-1}
              aria-label="Välj vy"
            >
              {VIEWS.map(v => (
                <button
                  type="button"
                  key={v.key}
                  className={`w-full px-4 py-2 text-left text-gray-800 hover:bg-gradient-to-r hover:from-green-100 hover:via-red-100 hover:to-blue-100 rounded-md transition-colors
                  ${view === v.key ? "bg-gradient-to-r from-green-200 via-red-200 to-blue-200 font-bold" : ""}
                  `}
                  onClick={() => { setView(v.key); setMenuOpen(false); }}
                  role="option"
                  aria-selected={view === v.key}
                >
                  {v.name}
                </button>
              ))}
              <DropdownMenuSeparator />
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-gray-500 hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => { setView(null); setMenuOpen(false); }}
                role="option"
                aria-selected={!view}
              >
                Ingen vy
              </button>
            </div>
          </div>
        </div>
        {/* Content area */}
        <main className="p-8 min-h-[390px] flex flex-col justify-center items-center bg-white/80 transition-all rounded-b-3xl">
          {view === "chat" && (
            <div className="w-full max-w-xl mx-auto">
              <ChatInterface />
            </div>
          )}
          {view === "hub" && (
            <div className="w-full max-w-2xl mx-auto">
              <CulturalHub />
            </div>
          )}
          {view === "games" && (
            <div className="w-full max-w-2xl mx-auto">
              <GamePreview />
            </div>
          )}
          {!view && <span className="text-gray-500 text-lg">Välj en funktion från menyn ovan.</span>}
        </main>
      </div>
    </div>
  );
};

export default Index;
