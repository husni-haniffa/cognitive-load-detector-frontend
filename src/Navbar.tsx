import { Brain, Play, Square } from "lucide-react"
import { Button } from "./components/ui/button"
import { ModeToggle } from "./components/ui/mode-toggle"
import { useStartCognitiveLoadDetectionMutation, useStopCognitiveLoadDetectionMutation } from "./features/cognitive-state-API"
import { useState, useEffect } from "react"


const Navbar = () => {

    const [isDetecting, setIsDetecting] = useState(false);

    const [startDetection, { data: startData, isSuccess: startSuccess, isLoading: starting }] =
        useStartCognitiveLoadDetectionMutation();
    const [stopDetection, { data: stopData, isSuccess: stopSuccess, isLoading: stopping }] =
        useStopCognitiveLoadDetectionMutation();

    useEffect(() => {
        if (startSuccess && startData?.success) {
        setIsDetecting(true);
        }
    }, [startSuccess, startData]);

    useEffect(() => {
        if (stopSuccess && stopData?.success) {
        setIsDetecting(false);
        }
    }, [stopSuccess, stopData]);

    return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border/50 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
                {/* Logo and Title */}
                <div className="flex items-center gap-3 min-w-0">
                    <div className="flex-shrink-0">
                        <Brain size={48} className="text-purple-500 dark:text-purple-400" />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent truncate">
                            Cognitive Load Detection
                        </h1>
                        <span className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                            Real Time Monitoring Dashboard
                        </span>
                    </div>
                </div>   
                
                {/* Action Buttons */}
                <div className="flex gap-2 sm:gap-3 items-center flex-shrink-0">
                    {/* Mobile: Stack buttons vertically on very small screens */}
                    <div className="hidden sm:flex gap-2 sm:gap-3">
                        <Button 
                            onClick={() => startDetection()} 
                            disabled={isDetecting || starting}
                            className="bg-green-600 hover:bg-green-500 text-white dark:text-white font-semibold transition-all duration-200 hover:scale-105" 
                            size="default"
                        >
                            <Play className="w-4 h-4" strokeWidth={2}/>
                            <span className="hidden md:inline">{starting ? "Starting..." : "Start Detection"}</span>
                            <span className="md:hidden">Start</span>
                        </Button>
                        <Button 
                            onClick={() => stopDetection()} 
                            disabled={!isDetecting || stopping}
                            className="bg-red-600 hover:bg-red-500 text-white dark:text-white font-semibold transition-all duration-200 hover:scale-105" 
                            size="default"
                        >
                            <Square className="w-4 h-4" strokeWidth={2}/>
                            <span className="hidden md:inline">{stopping ? "Stopping..." : "Stop Detection"}</span>
                            <span className="md:hidden">Stop</span>
                        </Button>
                    </div>
                    
                    {/* Mobile: Compact buttons */}
                    <div className="flex sm:hidden gap-1">
                        <Button 
                            onClick={() => startDetection()} 
                            disabled={isDetecting || starting}
                            className="bg-green-600 hover:bg-green-500 text-white font-semibold" 
                            size="sm"
                        >
                            <Play className="w-3 h-3" strokeWidth={2}/>
                        </Button>
                        <Button 
                            onClick={() => stopDetection()} 
                            disabled={!isDetecting || stopping}
                            className="bg-red-600 hover:bg-red-500 text-white font-semibold" 
                            size="sm"
                        >
                            <Square className="w-3 h-3" strokeWidth={2}/>
                        </Button>
                    </div>
                    
                    <ModeToggle/>
                </div>
            </div>
            
            {/* Status Indicator */}
            {(isDetecting || starting || stopping) && (
                <div className="pb-3">
                    <div className="flex items-center gap-2 text-sm">
                        <div className={`w-2 h-2 rounded-full ${
                            starting || stopping ? 'bg-yellow-500 animate-pulse' : 
                            isDetecting ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                        }`}></div>
                        <span className="text-muted-foreground font-medium">
                            {starting ? 'Starting detection...' : 
                             stopping ? 'Stopping detection...' : 
                             isDetecting ? 'Detection active' : 'Detection inactive'}
                        </span>
                    </div>
                </div>
            )}
        </div>
    </nav>
  )
}

export default Navbar