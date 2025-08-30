import { useId, useState, useEffect } from "react";
import { Badge } from "./badge";

const CircularProgress = ({ state, score } : {state: string; score: number}) => {
  const [currentScore, setCurrentScore] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const duration = 1000
  
  const targetScore = Math.max(0, Math.min(100, Math.round(score)));
  const size = 140;
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate offset based on current animated score
  const offset = circumference - (currentScore / 100) * circumference;

  let badgeColor = "bg-green-500";
  if (state === "Medium") {
    badgeColor = "bg-yellow-500";
  } else if (state === "High") {
    badgeColor = "bg-red-500";
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
    <div aria-hidden={false} role="img" aria-label={`Cognitive state ${state} with score ${currentScore}`}>
      {/* Progress Circle Container */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <defs>
            <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff7ac6" /> {/* pink */}
              <stop offset="100%" stopColor="#7c3aed" /> {/* purple */}
            </linearGradient>
          </defs>
          {/* background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#eee"
            strokeWidth={stroke}
            fill="none"
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
            style={{ 
              transition: isAnimating ? "none" : "stroke-dashoffset 0.3s ease"
            }}
          />
        </svg>
        {/* center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-extrabold leading-none text-card-foreground">{currentScore}</div>
          <div className="text-sm text-muted-foreground mt-1">Score</div>
        </div>
        <div className="flex justify-center mt-4">
          <Badge className={`${badgeColor} text-white dark:text-white`}>{state}</Badge>
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;