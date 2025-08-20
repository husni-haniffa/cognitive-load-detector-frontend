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

const MetricCard = ({ title, values }: MetricCardProps) => {
  const renderValue = (key: string, value: any) => {
    if (typeof value === "object" && value !== null) {
      // nested object → grid of badges
      return (
        <div key={key} className="mt-2">
          <div className="flex gap-2 items-center">
            <Badge className="rounded bg-red-700">{key}</Badge>
              <div className="grid grid-cols-4 gap-2">
            {Object.entries(value).map(([subKey, subValue]) => (
              <Badge key={subKey} className="rounded-full">
                {subKey} {subValue}
              </Badge>
            ))}
          </div>
          </div>
        
        </div>
      )
    }

    // simple number/string → inline badges
    return (
      <div key={key} className="flex gap-2 items-center">
        <Badge className="rounded bg-amber-300">{key}</Badge>
        <Badge className="rounded-full">{String(value)}</Badge>
      </div>
    )
  }

  return (
    <Card className="border-2 border-blue-300 shadow-md">
      <CardHeader>
        <CardTitle className="text-blue-600">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {Object.entries(values).map(([key, value]) => renderValue(key, value))}
      </CardContent>
    </Card>
  )
}

export default MetricCard
