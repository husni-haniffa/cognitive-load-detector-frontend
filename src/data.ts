export const latestCognitiveState: any = {
        id: 1,
        start_time: "2025-08-20T10:00:00Z",
        end_time: "2025-08-20T10:05:00Z",
        facial_cue_data: {
            blink_count: 12,
            yawn_count: 1,
            gaze_direction_counts: {
                left: 5,
                right: 7,
                center: 20,
                no_gaze: 2,
            },
            expressions: {
                happy: 2,
                sad: 1,
                angry: 0,
                surprise: 1,
                neutral: 25,
                disgust: 0,
                fear: 0,
                no_face: 0,
            },
        },
        keystroke_data: {
            typing_speed: 45,
            error_rate: 0.05,
            pause_rate: 0.10,
        },
        cognitive_state: {
            score: 50,
            label: "High",
        },
}
 

export const cogitiveStateHistory = [ 
    {
        id: 2,
        start_time: "2025-08-20T10:06:00Z",
        end_time: "2025-08-20T10:10:00Z",
        facial_cue_data: {
            blink_count: 20,
            yawn_count: 3,
            gaze_direction_counts: {
                left: 8,
                right: 4,
                center: 10,
                no_gaze: 5,
            },
            expressions: {
                happy: 0,
                sad: 2,
                angry: 1,
                surprise: 0,
                neutral: 12,
                disgust: 0,
                fear: 1,
                no_face: 3,
            },
        },
        keystroke_data: {
            typing_speed: 30,
            error_rate: 0.12,
            pause_rate: 0.25,
        },
        cognitive_state: {
            score: 58,
            label: "High",
        },
    },
    {
        id: 3,
        start_time: "2025-08-20T10:11:00Z",
        end_time: "2025-08-20T10:15:00Z",
        facial_cue_data: {
            blink_count: 8,
            yawn_count: 0,
            gaze_direction_counts: {
                left: 3,
                right: 6,
                center: 25,
                no_gaze: 1,
            },
            expressions: {
                happy: 4,
                sad: 0,
                angry: 0,
                surprise: 2,
                neutral: 20,
                disgust: 0,
                fear: 0,
                no_face: 0,
            },
        },
        keystroke_data: {
            typing_speed: 55,
            error_rate: 0.02,
            pause_rate: 0.08,
        },
        cognitive_state: {
            score: 85,
            label: "Low",
        },
    },
]

