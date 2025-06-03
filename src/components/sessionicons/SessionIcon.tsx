import { useContext } from "react"
import { SessionContext } from "../../providers/SessionProvider"

export default function SessionIcon({ id, ...props }: any) {

    const { currentSession, setCurrentSession } = useContext(SessionContext)

    const finished = id < currentSession / 2
    const current = id === currentSession / 2

    return (
        <div
            {...props}
            className={"w-2 h-2 rounded-full cursor-pointer " + (finished ? "bg-blue " : "bg-light-blue ") + (current && "-mt-1 ")}
            onClick={() => setCurrentSession(id * 2)}
        ></div>
    )
}