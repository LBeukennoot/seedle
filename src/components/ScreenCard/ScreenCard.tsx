import type { ScreenCardProps } from "./types"

export const ScreenCard = ({ children, ...props }: ScreenCardProps) => {

    return (
        <div {...props} className={"bg-white z-20 mx-auto max-w-xl rounded-[3.5rem] max-h-[30rem] transition-all w-full p-10 md:min-h-[15rem] md:min-w-[30rem]"}>
            <div className="max-h-[25rem]">
                {children}
            </div>
        </div>
    )
}