import { useId, useState, useEffect } from "react";
import { Badge } from "./badge";

const CircularProgress = ({ state, score } : {state: string; score: number}) => {
  const [currentScore, setCurrentScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const duration = 1000
  
  const targetScore = Math.max(0, Math.min(100, Math.round(score)));
  const size = 160;
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate offset based on current animated score
  const offset = circumference - (currentScore / 100) * circumference;

  let badgeColor = "bg-gradient-to-r from-green-500 to-emerald-500";
  if (state === "Medium") {
    badgeColor = "bg-gradient-to-r from-yellow-500 to-orange-500";
  } else if (state === "High") {
    badgeColor = "bg-gradient-to-r from-red-500 to-pink-500";
  }

  const id = useId();

  useEffect(() => {
    setIsAnimating(true);
    setCurrentScore(0);
    
    const startTime = Date.now();
    const startScore = 0;
    
    const animateScore = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const newScore = startScore + (targetScore - startScore) * easeOut;
      
      setCurrentScore(Math.round(newScore));
      
      if (progress < 1) {
        requestAnimationFrame(animateScore);
      } else {
        setIsAnimating(false);
      }
    };
    
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(animateScore);
    }); 
    
    return () => clearTimeout(timeoutId);
  }, [targetScore, duration]);

  return (
    <div aria-hidden={false} role="img" aria-label={`Cognitive state ${state} with score ${currentScore}`} className="flex flex-col items-center">
      {/* Progress Circle Container */}
      <div className="relative group" style={{ width: size, height: size }}>
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-xl group-hover:blur-2xl transition-all duration-500 opacity-60"></div>
        
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="relative z-10 drop-shadow-lg">
          <defs>
            <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" /> {/* pink-500 */}
              <stop offset="50%" stopColor="#8b5cf6" /> {/* violet-500 */}
              <stop offset="100%" stopColor="#3b82f6" /> {/* blue-500 */}
            </linearGradient>
            <filter id={`glow-${id}`}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="hsl(var(--border))"
            strokeWidth={stroke}
            fill="none"
            opacity="0.3"
          />
          {/* progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#grad-${id})`}
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            filter={`url(#glow-${id})`}
            style={{ 
              transition: isAnimating ? "none" : "stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
            }}
          />
        </svg>
        
        {/* center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <div className="text-4xl font-black leading-none bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
            {currentScore}
          </div>
          <div className="text-xs font-semibold text-muted-foreground mt-1 tracking-wide uppercase">
            Score
          </div>
        </div>
      </div>
      
      {/* State Badge */}
      <div className="mt-6">
        <Badge className={`${badgeColor} text-white dark:text-white px-4 py-2 text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
          {state}
        </Badge>
      </div>
    </div>
  );
};

export default CircularProgress;