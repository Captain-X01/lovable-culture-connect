
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Gamepad, Clock } from "lucide-react";

const GamePreview = () => {
  const [gameIndex, setGameIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const games = [
    {
      title: "Language Pairs",
      description: "Match words with their translations in different languages to improve your vocabulary",
      color: "bg-brand-purple/10",
      textColor: "text-brand-purple",
      icon: "🔤"
    },
    {
      title: "Cultural Trivia",
      description: "Test your knowledge of global customs and traditions with fun trivia questions",
      color: "bg-brand-teal/10",
      textColor: "text-brand-teal",
      icon: "🌍"
    },
    {
      title: "Product Explorer",
      description: "Navigate an interactive 3D view of products while learning about their features",
      color: "bg-yellow-50",
      textColor: "text-yellow-600",
      icon: "🎮"
    }
  ];
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          setGameIndex((prevIndex) => (prevIndex + 1) % games.length);
          return 0;
        }
        return prevProgress + 1;
      });
    }, 50);
    
    return () => {
      clearInterval(timer);
    };
  }, [games.length]);
  
  const currentGame = games[gameIndex];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold mb-3">
          <Gamepad className="h-8 w-8 inline-block mr-2 text-brand-teal" />
          Engaging Waiting Experience
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Transform waiting time into an opportunity to learn, play, and earn rewards with our interactive games and activities.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {games.map((game, index) => (
          <div
            key={index}
            className={`rounded-xl p-6 border transition-all ${
              index === gameIndex ? 'ring-2 ring-brand-purple shadow-lg' : ''
            }`}
          >
            <div className="mb-3">
              <span className="text-4xl">{game.icon}</span>
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${game.textColor}`}>{game.title}</h3>
            <p className="text-muted-foreground text-sm">{game.description}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-gradient-to-r from-brand-purple/5 to-brand-teal/5 rounded-xl p-6 border shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold flex items-center">
            <Clock className="h-5 w-5 mr-2 text-brand-purple" />
            Waiting Time: ~3 minutes
          </h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>Games available: {games.length}</span>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between mb-1 text-sm">
            <span>Current game: {currentGame.title}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline">Skip Game</Button>
          <Button className="bg-brand-teal hover:bg-brand-teal/90">Play Now</Button>
        </div>
      </div>
    </div>
  );
};

export default GamePreview;
