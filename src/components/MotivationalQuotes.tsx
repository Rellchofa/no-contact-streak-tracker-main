
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Quote } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const motivationalQuotes = [
  {
    quote: "Remember why you started no contact in the first place. It's for your healing and growth.",
    author: "Community wisdom"
  },
  {
    quote: "Whenever you feel like reaching out, try to wait 24 hours first. The urge will often pass.",
    author: "Reddit user advice"
  },
  {
    quote: "Your healing is more important than any closure you think you need from them.",
    author: "Support forum insight"
  },
  {
    quote: "The person you're missing doesn't exist anymore. You're missing a memory.",
    author: "Healing perspective"
  },
  {
    quote: "No contact isn't about them, it's about giving yourself the space to heal and grow.",
    author: "Recovery wisdom"
  },
  {
    quote: "When you feel like texting them, text a friend instead who supports your journey.",
    author: "Practical advice"
  },
  {
    quote: "The temporary relief of contact is not worth the restart of your healing journey.",
    author: "Recovery insight"
  }
];

const MotivationalQuotes: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const isMobile = useIsMobile();

  const handleNextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
  };

  const handlePrevQuote = () => {
    setCurrentQuote((prev) => (prev - 1 + motivationalQuotes.length) % motivationalQuotes.length);
  };

  return (
    <Card className="shadow-md border-0 bg-white bg-opacity-90 backdrop-blur-sm mt-4 max-w-md mx-auto">
      <CardHeader className={`text-center ${isMobile ? 'py-2 px-3' : ''}`}>
        <div className="flex justify-center mb-1">
          <Quote className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-purple-500`} />
        </div>
        <CardTitle className={`${isMobile ? 'text-base' : 'text-xl'} font-bold text-gray-800`}>
          Motivation Corner
        </CardTitle>
        {!isMobile && (
          <CardDescription>Words of strength from people who understand</CardDescription>
        )}
      </CardHeader>
      <CardContent className={`${isMobile ? 'px-3 py-2' : 'pb-6'}`}>
        <blockquote className={`text-center italic text-gray-700 ${isMobile ? 'mb-2 text-sm' : 'mb-4'} px-2`}>
          "{motivationalQuotes[currentQuote].quote}"
        </blockquote>
        <p className={`text-center ${isMobile ? 'text-xs mb-3' : 'text-sm mb-6'} text-gray-500`}>
          — {motivationalQuotes[currentQuote].author}
        </p>
        <div className="flex justify-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className={`border-gray-300 hover:bg-gray-100 ${isMobile ? 'text-xs py-1 h-7' : ''}`}
            onClick={handlePrevQuote}
          >
            Previous
          </Button>
          <Button 
            size="sm" 
            className={`bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white ${isMobile ? 'text-xs py-1 h-7' : ''}`}
            onClick={handleNextQuote}
          >
            Next Quote
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MotivationalQuotes;
