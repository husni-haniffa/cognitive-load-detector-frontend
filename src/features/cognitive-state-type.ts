export type CognitiveState = {
    id: string
    start_time: string
    end_time: string
    facial_cue_data: {
        blink_counts: number
        yawn_counts: number
        gaze_direction_counts: Record<string, number>
        face_expression_counts: Record<string, number>
    }
    keystroke_data: {
        typing_speed: number
        error_rate: number
        pause_rate: number
    }
    cognitive_state_data: [number, string]
}

export type CognitiveStateResponse = {
    data: CognitiveState
    success: boolean
}

export type CognitiveStateHistoryResponse = {
    count: number
    data: CognitiveState[] 
    success: boolean
}