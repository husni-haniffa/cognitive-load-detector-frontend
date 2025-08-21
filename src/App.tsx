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

        {/* This sections displays current cognitive state, the circular progress bar, the metrics of facial cues and keyboard interactions*/}
        <section>
          <div className="w-full max-w-5xl mx-auto">{/* center and constrain header + content */}
            <div className="flex justify-between items-center mb-6 border-b-4 border-blue-500 pb-4">
              <header>
                  <div className="flex flex-col gap-1">
                    <Label className="text-xl">Current Cognitive State</Label>
                    <Label className="text-sm text-muted-foreground">Latest agregrated metrics score</Label>
                  </div>
              </header>
              <Label>Last Updated 4.35 PM</Label>
            </div>
            <div className="flex justify-center items-center gap-12">
              <div>
                <CircularProgress state={latest.cognitive_state.label} score={latest.cognitive_state.score}/>
              </div>
              <div className="flex gap-6">
                <MetricCard title="Facial Cue Data" values={latest.facial_cue_data} />
                <MetricCard title="Keystroke Data" values={latest.keystroke_data} />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12">
            <div className="flex justify-center items-center">
              <div className="w-full max-w-5xl">{/* constrain table width so it centers without shrinking */}
                <MetricsTable data={history}/>
              </div>
            </div>      
        </section>

    

      </div>

      
      
    </>
    
  )
}

export default App
