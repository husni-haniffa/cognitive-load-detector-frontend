import { Brain, Play, Square } from "lucide-react"
import { Label } from "./components/ui/label"
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
    <nav className="shadow-2xl p-4">
        <div className="flex items-center justify-between">
            <div>
                <header className="flex items-center gap-3">
                    <Brain size={56} className="text-purple-400" />
                    <div className="flex flex-col gap-1">
                        <Label className="text-3xl font-bold">Cognitive Load Detection</Label>
                        <span className="text-sm text-muted-foreground">Real Time Monitoring Dashboard</span>
                    </div>
                </header>
            </div>   
            <div className="flex gap-3 items-center">
                <Button 
                    onClick={() => startDetection()} disabled={isDetecting || starting}
                    className="bg-green-600 hover:bg-green-500 text-white dark:text-white font-bold" size="lg"
                >
                    <span><Play strokeWidth={4}/></span>{starting ? "Starting..." : "Start Detection"}
                </Button>
                <Button 
                    onClick={() => stopDetection()} disabled={!isDetecting || stopping}
                    className="bg-red-600 hover:bg-red-500 text-white dark:text-white font-bold" size="lg"
                >
                    <span><Square strokeWidth={4}/></span>{stopping ? "Stopping..." : "Stop Detection"}
                </Button>
                <ModeToggle/>
            </div>
        </div>
    </nav>
  )
}

export default Navbar