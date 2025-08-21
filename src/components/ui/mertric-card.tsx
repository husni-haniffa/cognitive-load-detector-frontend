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

const formatKey = (str: string) =>
  String(str)
    .split("_")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")


const MetricCard = ({ title, values }: MetricCardProps) => {
  const renderValue = (key: string, value: any) => {
      if (typeof value === "object" && value !== null) {
      return (
        <div key={key} className="mt-2">
          <div className="flex gap-2 items-center">
            <Badge className="bg-amber-100 text-amber-800 px-2 py-1 rounded-md">{formatKey(key)}</Badge>
              <div className="grid grid-cols-4 gap-2">
            {Object.entries(value).map(([subKey, subValue]) => (
              <Badge key={subKey} className="bg-gray-800 text-white px-2 py-1 rounded-full">
                {formatKey(subKey)}: {String(subValue)}
              </Badge>
            ))}
          </div>
          </div>
        
        </div>
      )
    }

    return (
      <div key={key} className="flex gap-2 items-center">
        <Badge className="bg-amber-100 text-amber-800 px-2 py-1 rounded-md">{formatKey(key)}</Badge>
        <Badge className="bg-gray-800 text-white px-2 py-1  rounded-full">{String(value)}</Badge>
      </div>
    )
  }

  return (
    <Card className="border-2 border-grey-300 shadow-md">
      <CardHeader>
        <CardTitle className="text-blue-600 font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {Object.entries(values).map(([key, value]) => renderValue(key, value))}
      </CardContent>
    </Card>
  )
}

export default MetricCard
