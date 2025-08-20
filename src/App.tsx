import { Badge } from "./components/ui/badge"
import CircularProgress from "./components/ui/circular-progress"
import { Label } from "./components/ui/label"
import MetricCard from "./components/ui/mertric-card"
import MetricsTable from "./components/ui/metric-table"
import { useGetCognitiveStateHistoryQuery, useGetLatestCognitiveStateQuery } from "./features/cognitive-state-API"
import Navbar from "./Navbar"


function App() {

  const { data: latest, isLoading: isLatestLoading, isError: isLatestError } =
    useGetLatestCognitiveStateQuery()
  const { data: history, isLoading: isHistoryLoading, isError: isHistoryError } =
    useGetCognitiveStateHistoryQuery()

  if (isLatestLoading || isHistoryLoading) return <p>Loading</p>
  if (isLatestError || isHistoryError) return <p>error</p>
   
  return (
    <>
      <Navbar/>
      <div className="p-24">

        <section className="border-b-2 border-black pb-2">
          <header className="flex justify-between items-start">
            <div>
              <Label className="text-xl">Current Cognitive State</Label>
              <Label>Latest agregrated metrics score</Label>
            </div>
            <Label>Last Updated 4.35 PM</Label>
          </header>
        </section>

        <section className="mt-12 grid grid-cols-2">
          <div className="bg-red-300">
            <CircularProgress state={latest.cognitive_state.label} score={latest.cognitive_state.score}/>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <MetricCard title="Facial Cue Data" values={latest.facial_cue_data} />
            <MetricCard title="Keystroke Data" values={latest.keystroke_data} />
          </div>
        </section>

        <section className="mt-12">
            <MetricsTable data={history}/>
        </section>

    

      </div>

      
      
    </>
    
  )
}

export default App
