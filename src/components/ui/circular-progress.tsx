import { useId } from "react"
import { Badge } from "./badge"

const CircularProgress = ({ score, label }: { score: number; label: string }) => {
  const pct = Math.max(0, Math.min(100, Math.round(score)))
  const size = 140
  const stroke = 12
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (pct / 100) * circumference

  let badgeColor = "bg-green-500"
  if (label === "Medium") {
    badgeColor = "bg-yellow-500"
  } else if (label === "High") {
    badgeColor = "bg-red-500"
  }

  const id = useId() // unique id for gradient



  return (
    <div>
      {/* Progress Circle Container */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <defs>
            <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff7ac6" /> {/* pink */}
              <stop offset="100%" stopColor="#7c3aed" /> {/* purple */}
            </linearGradient>
          </defs>
          {/* background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#eee"
            strokeWidth={stroke}
            fill="none"
          />
          {/* progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={`url(#grad-${id})`}
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
        </svg>
        {/* center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-2xl font-bold leading-none">{pct}</div>
          <div className="text-xs text-gray-500 mt-1">Score</div>
        </div>
        <div className="flex justify-center mt-4">
          <Badge className={badgeColor}>{label}</Badge>
        </div>
    </div>
    </div>
  )
}

export default CircularProgress