
import React, { useState, useEffect } from "react";
import StreakTracker from "@/components/StreakTracker";
import MotivationalQuotes from "@/components/MotivationalQuotes";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [startDate, setStartDate] = useState<Date>(() => {
    const saved = localStorage.getItem("noContactStartDate");
    return saved ? new Date(saved) : new Date();
  });

  useEffect(() => {
    localStorage.setItem("noContactStartDate", startDate.toISOString());
  }, [startDate]);

  const handleReset = () => {
    setStartDate(new Date());
  };

  useEffect(() => {
    // Check if this is the first time the app is loaded
    const firstLoad = localStorage.getItem("firstLoad") !== "false";
    if (firstLoad) {
      toast({
        title: "Welcome to Your No Contact Tracker",
        description: "Track your progress and stay strong. You've got this!",
      });
      localStorage.setItem("firstLoad", "false");
    }

    // Event listener for custom date update events
    const handleDateUpdate = (event: CustomEvent) => {
      const { newStartDate } = event.detail;
      if (newStartDate) {
        setStartDate(new Date(newStartDate));
      }
    };

    // Add event listener for custom events
    window.addEventListener("updateStartDate", handleDateUpdate as EventListener);

    // Clean up event listener
    return () => {
      window.removeEventListener("updateStartDate", handleDateUpdate as EventListener);
    };
  }, [toast]);

  // Apply full-height styling for mobile apps
  const appStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'space-between'
  };

  return (
    <div 
      className="bg-gradient-to-b from-soothing-blue/30 to-purple-light/30"
      style={appStyle}
    >
      <div className={`container mx-auto px-2 flex-grow flex flex-col ${isMobile ? 'pt-2 pb-4' : 'py-10'}`}>
        <header className={`text-center ${isMobile ? 'mb-3' : 'mb-8'}`}>
          <h1 className={`${isMobile ? 'text-xl' : 'text-3xl'} font-bold text-gray-800 mb-1`}>
            No Contact Streak Tracker
          </h1>
          {!isMobile && (
            <p className="text-gray-600 max-w-md mx-auto">
              Stay strong and focus on your journey forward. Every day is a victory.
            </p>
          )}
        </header>

        <div className={`${isMobile ? 'mt-2' : 'mt-10'} flex-shrink-0`}>
          <StreakTracker startDate={startDate} onReset={handleReset} />
        </div>

        <div className={`${isMobile ? 'mt-4' : 'mt-10'} flex-shrink-0`}>
          <MotivationalQuotes />
        </div>

        {!isMobile && (
          <footer className="mt-16 text-center text-gray-500 text-sm">
            <p>Remember, this journey is about your growth and healing.</p>
          </footer>
        )}
      </div>
    </div>
  );
};

export default Index;
