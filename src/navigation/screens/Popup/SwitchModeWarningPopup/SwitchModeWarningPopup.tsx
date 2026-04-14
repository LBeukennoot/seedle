import { Button } from "../../../../components/Button"
import type { SwitchModeWarningPopupProps } from "./types"

export const SwitchModeWarningPopup = ({ ignore, cancel }: SwitchModeWarningPopupProps) => {
    return (
        <div className="text-center">
            <h1 className="text-4xl">Your timer is still running!</h1>
            <p className="my-5">Switching modes will reset your timer.</p>

            <div className="flex justify-center gap-5">
                <Button label={"ignore timer reset"} className="bg-red border-red hover:bg-white hover:text-red" onClick={() => ignore()}>
                    ignore
                </Button>

                <Button label={"ignore timer reset"} onClick={() => cancel()}>
                    cancel
                </Button>
            </div>
        </div>
    )
}