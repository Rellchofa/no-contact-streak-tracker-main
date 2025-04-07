
import React, { useState } from "react";
import { Calendar, Bell, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import UserInfoDialog from "./UserInfoDialog";
import { useIsMobile } from "@/hooks/use-mobile";

interface StreakTrackerProps {
  startDate: Date;
  onReset: () => void;
}

const getMotivationalMessage = (days: number): string => {
  if (days === 0) return "Today is the first day of your new journey!";
  if (days === 1) return "Congratulations on your first day!";
  if (days < 7) return "Keep going! The beginning is always the hardest.";
  if (days < 14) return "A week down! You're building strength every day.";
  if (days < 30) return "Look at you go! Your resilience is impressive.";
  if (days < 60) return "A month of growth! You're reclaiming your power.";
  if (days < 90) return "Amazing progress! You're creating new patterns.";
  if (days < 180) return "You're transforming! Feel proud of your journey.";
  if (days < 365) return "Look how far you've come! You're an inspiration.";
  return "Incredible milestone! You've completely transformed your life!";
};

const getStreakBadge = (days: number): string => {
  if (days < 7) return "Starting Out";
  if (days < 30) return "Determined";
  if (days < 90) return "Resilient";
  if (days < 180) return "Warrior";
  if (days < 365) return "Transformed";
  return "Freedom Master";
};

const getBadgeColor = (days: number): string => {
  if (days < 7) return "bg-blue-100 text-blue-800";
  if (days < 30) return "bg-green-100 text-green-800";
  if (days < 90) return "bg-purple-100 text-purple-800"; 
  if (days < 180) return "bg-indigo-100 text-indigo-800";
  if (days < 365) return "bg-pink-100 text-pink-800";
  return "bg-gradient-to-r from-purple-400 to-pink-600 text-white";
};

export const StreakTracker: React.FC<StreakTrackerProps> = ({ startDate, onReset }) => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userName, setUserName] = useState<string>(() => {
    const savedName = localStorage.getItem("noContactUserName");
    return savedName || "";
  });
  
  const today = new Date();
  const diffInMs = today.getTime() - startDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  const message = getMotivationalMessage(diffInDays);
  const badge = getStreakBadge(diffInDays);
  const badgeColor = getBadgeColor(diffInDays);
  
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Circle progress properties
  const radius = isMobile ? 45 : 60;
  const circumference = 2 * Math.PI * radius;
  const maxDays = 30; // For visualization purposes, full circle at 30 days
  const progress = Math.min(diffInDays / maxDays, 1);
  const strokeDashoffset = circumference - (progress * circumference);

  const handleReset = () => {
    toast({
      title: "Streak Reset",
      description: "Your journey is about progress, not perfection. Start again.",
    });
    onReset();
  };

  const handleBadgeClick = () => {
    setDialogOpen(true);
  };

  const handleSaveUserInfo = ({ name, startDate: newStartDate }: { name: string, startDate: Date }) => {
    setUserName(name);
    localStorage.setItem("noContactUserName", name);
    
    if (newStartDate && newStartDate.getTime() !== startDate.getTime()) {
      onReset();
      // Using setTimeout to ensure the reset happens before we update the date
      setTimeout(() => {
        const customEvent = new CustomEvent("updateStartDate", { 
          detail: { newStartDate } 
        });
        window.dispatchEvent(customEvent);
      }, 0);
    }
    
    toast({
      title: `Welcome, ${name}!`,
      description: "Your journey has been personalized.",
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="shadow-lg border-0 bg-white bg-opacity-90 backdrop-blur-sm">
        <CardHeader className={`text-center ${isMobile ? 'py-3 px-4' : 'pb-2'}`}>
          <div className="flex justify-center mb-1">
            <Heart className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-purple-500`} />
          </div>
          <CardTitle className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-gray-800`}>
            {userName ? `${userName}'s` : "No Contact"} Streak
          </CardTitle>
          <CardDescription className={`text-gray-500 ${isMobile ? 'text-xs' : ''}`}>
            Started on {formatDate(startDate)}
          </CardDescription>
        </CardHeader>
        
        <CardContent className={`pt-0 ${isMobile ? 'px-3 pb-4' : ''}`}>
          <div className="flex flex-col items-center justify-center">
            <div className={`relative ${isMobile ? 'w-40 h-40' : 'w-60 h-60'} flex flex-col items-center justify-center ${isMobile ? 'mb-3' : 'mb-6'}`}>
              <svg width="100%" height="100%" viewBox="0 0 120 120" className="transform -rotate-90">
                <circle cx="60" cy="60" r={radius} className="circle-progress-bg" />
                <circle 
                  cx="60" 
                  cy="60" 
                  r={radius}
                  className="circle-progress-bar" 
                  stroke="url(#gradient)"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#9b87f5" />
                    <stop offset="100%" stopColor="#7E69AB" />
                  </linearGradient>
                </defs>
              </svg>
              
              <div className="absolute flex flex-col items-center">
                <span className={`${isMobile ? 'text-4xl' : 'text-5xl'} font-bold text-gray-800 animate-pulse-gentle`}>
                  {diffInDays}
                </span>
                <span className="text-gray-500 font-medium">
                  {diffInDays === 1 ? "Day" : "Days"}
                </span>
              </div>
            </div>

            <Badge 
              className={cn(`mb-2 py-1 px-3 ${isMobile ? 'text-xs' : 'text-sm'} font-medium cursor-pointer`, badgeColor)}
              onClick={handleBadgeClick}
            >
              {badge}
            </Badge>
            
            {!isMobile && (
              <p className="text-center text-gray-700 mb-6">
                {message}
              </p>
            )}
            
            <div className="flex items-center justify-center gap-2">
              <Button 
                variant="outline" 
                size={isMobile ? "sm" : "default"}
                className="flex items-center gap-1 border-gray-300 hover:bg-gray-100 text-gray-700"
                onClick={handleReset}
              >
                <Calendar className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                <span>Reset</span>
              </Button>
              
              <Button 
                size={isMobile ? "sm" : "default"}
                className="flex items-center gap-1 bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700 text-white border-0"
                onClick={() => toast({
                  title: "You've got this!",
                  description: "Every day is a step toward your brighter future.",
                })}
              >
                <Bell className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
                <span>Motivate Me</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <UserInfoDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
        onSave={handleSaveUserInfo}
        defaultDate={startDate}
      />
    </div>
  );
};

export default StreakTracker;
