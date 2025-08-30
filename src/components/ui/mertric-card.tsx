import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type MetricCardProps = {
  title: string
  values: Record<string, any>
}

const formatKey = (str: string) => {
  const formatted = String(str)
    .split("_")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
  
  // Add units for keystroke metrics
  if (formatted === "Typing Speed") return "Typing Speed (keys/min)"
  if (formatted === "Error Rate") return "Error Rate (%)"
  if (formatted === "Pause Rate") return "Pause Rate (sec/key)"
  
  return formatted
}


const MetricCard = ({ title, values }: MetricCardProps) => {
  const renderValue = (key: string, value: any) => {
    if (typeof value === "object" && value !== null) {
      return (
        <div key={key} className="space-y-3" role="group" aria-label={formatKey(key)}>
          <div className="flex flex-col gap-3">
            <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1.5 rounded-lg font-medium w-48 text-center">
              {formatKey(key)}
            </Badge>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
              {Object.entries(value).map(([subKey, subValue]) => (
                <div
                  key={subKey}
                  className="bg-muted/50 hover:bg-muted/80 transition-colors duration-200 px-2 py-2 rounded-lg border border-border/30 text-center min-h-[3rem] flex flex-col justify-center"
                  title={`${formatKey(subKey)}: ${String(subValue)}`}
                >
                  <div className="text-xs text-muted-foreground font-medium leading-tight">
                    {formatKey(subKey) === 'No Face' ? 'Away' : 
                     formatKey(subKey) === 'No Gaze' ? 'Away' : 
                     formatKey(subKey)}
                  </div>
                  <div className="text-sm font-semibold text-foreground">
                    {String(subValue)}
                    {/* Add unit suffix for specific metrics */}
                    {subKey === 'typing_speed' ? ' keys/min' :
                     subKey === 'error_rate' ? '%' :
                     subKey === 'pause_rate' ? ' sec/key' : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div key={key} className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1.5 rounded-lg font-medium w-48 text-center">
          {formatKey(key)}
        </Badge>
        <div className="bg-muted/50 hover:bg-muted/80 transition-colors duration-200 px-3 py-2 rounded-lg border border-border/30 flex-1">
          <div className="text-sm font-semibold text-foreground">{String(value)}</div>
        </div>
      </div>
    )
  }

  return (
    <Card className="border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(values).length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            <p className="text-sm">No data available</p>
          </div>
        ) : (
          Object.entries(values).map(([key, value]) => renderValue(key, value))
        )}
      </CardContent>
    </Card>
  )
}

export default MetricCard
