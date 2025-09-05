import CircularProgress from "./components/ui/circular-progress"
import { Label } from "./components/ui/label"
import { LoadingUI } from "./components/ui/loading"
import MetricCard from "./components/ui/mertric-card"
import MetricsTable from "./components/ui/metric-table"
import { ServerErrorUI } from "./components/ui/server-error"
import { useFetchLatestCognitiveStateQuery, useFetchCognitiveStateHistoryQuery } from "./features/cognitive-state-API"
import Navbar from "./Navbar"


function App() {

  const { data: latest, isLoading: isLatestLoading, isError: isLatestError } =
    useFetchLatestCognitiveStateQuery()
  const { data: history, isLoading: isHistoryLoading, isError: isHistoryError } =
    useFetchCognitiveStateHistoryQuery()

  if (isLatestLoading || isHistoryLoading) return <LoadingUI/>
  if (isLatestError || isHistoryError) return <ServerErrorUI/>

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar/>
      
      {/* Main Content Container */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 space-y-4 lg:space-y-6">
        
        {/* Current Cognitive State Section */}
        <section className="w-full">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-xl transition-all duration-300">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 pb-3 border-b border-border/30">
              <header className="mb-4 sm:mb-0">
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Current Cognitive State
                  </h1>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Latest aggregated metrics score
                  </p>
                </div>
              </header>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-2 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-medium">
                  {latest?.data?.end_time &&
                    new Date(latest.data.end_time).toLocaleString([], {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                </span>
              </div>
            </div>
            
            {/* Metrics Display - 3 Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              {/* Circular Progress */}
              <div className="flex justify-center items-center h-full">
                <div className="transform hover:scale-105 transition-transform duration-300">
                  <CircularProgress 
                    state={latest?.data?.cognitive_state_data?.[1] || "Unknown"} 
                    score={latest?.data?.cognitive_state_data?.[0] || 0}
                  />
                </div>
              </div>
              
              {/* Facial Cue Data */}
              <div className="transform hover:scale-[1.01] transition-transform duration-300">
                <MetricCard title="Facial Cue Data" values={latest?.data?.facial_cue_data || {}} />
              </div>
              
              {/* Keystroke Data */}
              <div className="transform hover:scale-[1.01] transition-transform duration-300">
                <MetricCard title="Keystroke Data" values={latest?.data?.keystroke_data || {}} />
              </div>
            </div>
          </div>
        </section>

        {/* Historical Data Section */}
        <section className="w-full">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-4 sm:p-5 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="mb-4">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Historical Data
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Previous cognitive load detection sessions
              </p>
            </div>
            <div className="overflow-hidden rounded-xl border border-border/30">
              <MetricsTable data={history?.data || []} />
            </div>
          </div>
        </section>
      </main>
    </div>
    
  )
}

export default App
