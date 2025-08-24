import CircularProgress from "./components/ui/circular-progress"
import { Label } from "./components/ui/label"
import MetricCard from "./components/ui/mertric-card"
import MetricsTable from "./components/ui/metric-table"
import { useFetchLatestCognitiveStateQuery, useFetchCognitiveStateHistoryQuery } from "./features/cognitive-state-API"
import Navbar from "./Navbar"


function App() {

  const { data: latest, isLoading: isLatestLoading, isError: isLatestError } =
    useFetchLatestCognitiveStateQuery()
  const { data: history, isLoading: isHistoryLoading, isError: isHistoryError } =
    useFetchCognitiveStateHistoryQuery()

  if (isLatestLoading || isHistoryLoading) return <p>Loading</p>
  if (isLatestError || isHistoryError) return <p>error</p>
   
  // Ensure history is always an array
  const historyData = Array.isArray(history) ? history : []
   
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
            <CircularProgress 
              label={latest?.cognitive_state_data?.[1] || "Unknown"} 
              score={latest?.cognitive_state_data?.[0] || 0}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <MetricCard title="Facial Cue Data" values={latest?.facial_cue_data || {}} />
            <MetricCard title="Keystroke Data" values={latest?.keystroke_data || {}} />
          </div>
        </section>

        <section className="mt-12">
            <MetricsTable data={historyData}/>
        </section>

    

      </div>

      
      
    </>
    
  )
}

export default App
