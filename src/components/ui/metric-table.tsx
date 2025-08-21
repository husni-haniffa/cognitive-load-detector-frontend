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

type Session = {
  id: number
  start_time: string
  end_time: string
  facial_cue_data: {
    blink_count: number
    yawn_count: number
    gaze_direction_counts: Record<string, number>
    expressions: Record<string, number>
  }
  keystroke_data: {
    typing_speed: number
    error_rate: number
    pause_rate: number
  }
  cognitive_state: {
    score: number
    label: string
  }
}

export default function MetricsTable({ data }: { data?: Session[] }) {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const sessions = data ?? []

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

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
          {sessions.map((session) => (
            <React.Fragment key={session.id}>
              {/* Collapsed row */}
              <TableRow key={session.id}>
                <TableCell>{session.id}</TableCell>
                <TableCell>{formatTime(session.start_time)}</TableCell>
                <TableCell>{formatTime(session.end_time)}</TableCell>
                <TableCell>{session.cognitive_state.score}</TableCell>
                <TableCell>{session.cognitive_state.label}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleExpand(session.id)}
                  >
                    {expandedId === session.id ? "Collapse" : "Expand"}
                  </Button>
                </TableCell>
              </TableRow>

              {/* Expanded row */}
              {expandedId === session.id && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className="flex gap-6">
                        <MetricCard title="Facial Cues" values={session.facial_cue_data}/>
                   <MetricCard title="KeyStroke" values={session.keystroke_data}/>
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
