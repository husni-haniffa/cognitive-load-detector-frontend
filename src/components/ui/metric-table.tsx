"use client"

import React, { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import MetricCard from "./mertric-card"
import type { CognitiveState } from "@/features/cognitive-state-type"

export default function MetricsTable({ data }: { data: CognitiveState[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null) 


  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })



  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No cognitive state data available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Start</TableHead>
            <TableHead>End</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Label</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((session) => (
            <React.Fragment key={session.id}>
              {/* Collapsed row */}
              <TableRow
                key={session.id}
                className="hover:bg-muted/80 focus-within:bg-muted/80"
              >
                <TableCell>{session.id}</TableCell>
                <TableCell>{formatTime(session.start_time)}</TableCell>
                <TableCell>{formatTime(session.end_time)}</TableCell>
                <TableCell>{session.cognitive_state_data[0]}</TableCell>
                <TableCell>{session.cognitive_state_data[1]}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleExpand(session.id)} 
                    className="hover:bg-accent/80 hover:text-accent-foreground dark:hover:bg-accent/70 dark:hover:text-white focus-visible:ring-ring/60"
                  >
                    {expandedId === session.id ? "Collapse" : "Expand"}
                  </Button>
                </TableCell>
              </TableRow>

              {/* Expanded row */}
              {expandedId === session.id && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className="flex flex-col md:flex-row gap-6">
                      <MetricCard
                        title="Facial Cues"
                        values={session.facial_cue_data}
                      />
                      <MetricCard
                        title="KeyStroke"
                        values={session.keystroke_data}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
