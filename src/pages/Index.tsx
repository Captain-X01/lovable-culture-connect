
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FeatureCard from "@/components/FeatureCard";
import ChatInterface from "@/components/ChatInterface";
import CulturalHub from "@/components/CulturalHub";
import GamePreview from "@/components/GamePreview";
import Footer from "@/components/Footer";
import { MessageCircle, Translate, Gamepad, Award, Headphones } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Cultural <span className="gradient-text">Connection Hub</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-xl">
                Transform customer waiting time into engaging, culturally enriching experiences that build stronger brand connections.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button className="bg-brand-purple hover:bg-brand-purple/90 button-pulse text-lg px-6 py-6">
                  Try Demo
                </Button>
                <Button variant="outline" className="border-brand-purple text-brand-purple hover:bg-brand-purple/5 text-lg px-6 py-6">
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <ChatInterface />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white" id="features">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-12">
            Innovative <span className="gradient-text">Features</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              title="Real-time Chat" 
              description="Instant messaging with low latency for efficient customer communication"
              icon={<MessageCircle className="h-5 w-5" />} 
            />
            <FeatureCard 
              title="Language Translation" 
              description="Seamless translation between 10+ languages for global support"
              icon={<Translate className="h-5 w-5" />} 
            />
            <FeatureCard 
              title="Interactive Games" 
              description="Engaging activities that transform waiting time into fun experiences"
              icon={<Gamepad className="h-5 w-5" />} 
            />
            <FeatureCard 
              title="Cultural Insights" 
              description="Personalized cultural content that educates and entertains"
              icon={<Award className="h-5 w-5" />} 
            />
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-display font-semibold mb-4">Revolutionary Voice Features</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Our system offers high-quality voice communication with real-time translation, enabling seamless conversations across language barriers.
            </p>
            <div className="bg-brand-light rounded-2xl p-6 md:p-10 max-w-3xl mx-auto flex flex-col md:flex-row items-center gap-8 text-left">
              <div className="h-24 w-24 rounded-full bg-brand-purple/10 flex items-center justify-center flex-shrink-0">
                <Headphones className="h-12 w-12 text-brand-purple" />
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2">Voice-Activated Support</h4>
                <p className="text-muted-foreground mb-4">
                  Speak naturally in your language, and our system will translate in real-time for customer service representatives, eliminating language barriers completely.
                </p>
                <Button className="bg-brand-purple/10 text-brand-purple hover:bg-brand-purple/20">
                  Coming Soon
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Cultural Hub Section */}
      <section className="py-16 bg-brand-light/50" id="cultural-hub">
        <div className="container mx-auto px-4">
          <CulturalHub />
        </div>
      </section>
      
      {/* Games Section */}
      <section className="py-16 bg-white" id="games">
        <div className="container mx-auto px-4">
          <GamePreview />
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-brand-purple text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-display font-bold mb-6">Ready to Transform Customer Experience?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join the revolution in customer service. Make waiting time valuable and engaging with our Cultural Connection Hub.
          </p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-white text-brand-purple hover:bg-white/90 text-lg px-6 py-6">
              Request Demo
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-6 py-6">
              Download Pitch
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
