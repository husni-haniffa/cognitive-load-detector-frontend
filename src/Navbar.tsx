import { Brain, Play, Square } from "lucide-react"
import { Label } from "./components/ui/label"
import { Button } from "./components/ui/button"
import { ModeToggle } from "./components/ui/mode-toggle"


const Navbar = () => {
  return (
    <nav className="shadow-2xl p-4">
        <div className="flex items-center justify-between">
            <div>
                <header className="flex gap-3">
                    <Brain size={65} className="text-purple-400"/>
                    <Label className="text-4xl font-bold">Cognitive Load Detection</Label>   
                </header>
                <div>
                    <span className="mx-20">Real Time Monitoring Dashboard</span>
                </div>
            </div>   
            <div className="flex gap-3 items-center">
                <Button className="bg-green-600 hover:bg-green-500 font-bold" size="lg">
                    <span><Play strokeWidth={4}/></span>Start
                </Button>
                <Button className="bg-red-600 hover:bg-red-500 font-bold" size="lg">
                    <span><Square strokeWidth={4}/></span>Stop
                </Button>
                <ModeToggle/>
            </div>
        </div>
    </nav>
  )
}

export default Navbar