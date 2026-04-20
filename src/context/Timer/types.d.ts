export type TimerProviderProps = {
    children: string | JSX.Element | JSX.Element[]
}

export type TimerContextType = {
    time: number,
    getDisplayTime: Function,
    start: Function,
    pause: Function,
    isTimerRunning: boolean
}

