import type { RewardPopupProps } from "."
import { Button } from "../../Button"
import { Plant } from "../../Plant/Plant"
import { SeedBag } from "./SeedBag"

export const RewardPopup = ({ reward, title = "session complete!", claim }: RewardPopupProps) => {
    return (
        <div className="text-center">
            <h1 className="text-3xl">{title}</h1>

            <div className="relative my-5 flex items-center justify-center">
                <SeedBag size={200} />
                <div className="absolute max-w-3xs w-full h-full">
                    <div className="h-[27%] w-full flex items-center justify-center">
                        <p className="text-white text-xl">{reward.toLowerCase()}</p>
                    </div>
                    <div className="h-[73%] w-full pb-5 flex items-center justify-center">
                        <Plant name={reward} stage={4} className="w-full h-full" />
                    </div>
                </div>
            </div>

            <Button label={"claim reward"} onClick={() => claim()}>claim reward</Button>
        </div>
    )
}