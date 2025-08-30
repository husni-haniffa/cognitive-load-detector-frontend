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
    new Date(iso).toLocaleTimeString([], {year: "numeric", month: "2-digit", day: "2-digit"})



  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No cognitive state data available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Mobile Card View */}
      <div className="block md:hidden space-y-4">
        {data.map((session) => (
          <div key={session.id} className="bg-card border border-border/50 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="flex justify-between items-start mb-3">
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">Session ID</div>
                <div className="font-semibold">{session.id}</div>
              </div>
              <div className="text-right space-y-1">
                <div className="text-sm font-medium text-muted-foreground">Score</div>
                <div className="font-bold text-lg">{session.cognitive_state_data[0]}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Start Time</div>
                <div className="text-sm font-medium">{formatTime(session.start_time)}</div>
              </div>
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">End Time</div>
                <div className="text-sm font-medium">{formatTime(session.end_time)}</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                session.cognitive_state_data[1] === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                session.cognitive_state_data[1] === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
              }`}>
                {session.cognitive_state_data[1]}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleExpand(session.id)}
                className="text-xs"
              >
                {expandedId === session.id ? "Hide Details" : "Show Details"}
              </Button>
            </div>
            
            {expandedId === session.id && (
              <div className="mt-4 pt-4 border-t border-border/30 space-y-4">
                <MetricCard
                  title="Facial Cues"
                  values={session.facial_cue_data}
                />
                <MetricCard
                  title="Keystroke Data"
                  values={session.keystroke_data}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50">
              <TableHead className="font-semibold text-foreground">ID</TableHead>
              <TableHead className="font-semibold text-foreground">Start Time</TableHead>
              <TableHead className="font-semibold text-foreground">End Time</TableHead>
              <TableHead className="font-semibold text-foreground">Score</TableHead>
              <TableHead className="font-semibold text-foreground">State</TableHead>
              <TableHead className="font-semibold text-foreground w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((session) => (
              <React.Fragment key={session.id}>
                <TableRow className="hover:bg-muted/50 transition-colors duration-200 border-border/30">
                  <TableCell className="font-medium">{session.id}</TableCell>
                  <TableCell className="text-muted-foreground">{formatTime(session.start_time)}</TableCell>
                  <TableCell className="text-muted-foreground">{formatTime(session.end_time)}</TableCell>
                  <TableCell>
                    <span className="font-bold text-lg">{session.cognitive_state_data[0]}</span>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      session.cognitive_state_data[1] === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                      session.cognitive_state_data[1] === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    }`}>
                      {session.cognitive_state_data[1]}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleExpand(session.id)}
                      className="hover:bg-accent/80 hover:text-white dark:hover:text-white transition-all duration-200 hover:scale-105"
                    >
                      {expandedId === session.id ? "Collapse" : "Expand"}
                    </Button>
                  </TableCell>
                </TableRow>

                {expandedId === session.id && (
                  <TableRow className="bg-muted/20">
                    <TableCell colSpan={6} className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <MetricCard
                          title="Facial Cues"
                          values={session.facial_cue_data}
                        />
                        <MetricCard
                          title="Keystroke Data"
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
    </div>
  )
}
