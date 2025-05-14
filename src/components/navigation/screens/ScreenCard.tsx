export default function ScreenCard({ children }: any) {
    return (
        <div className="bg-white mx-auto max-w-xl rounded-tl-none rounded-[3.5rem] min-w-[30rem] min-h-[15rem] max-h-[30rem] p-10 z-20 transition-all">
            <div className="overflow-y-auto max-h-[25rem]">
                {children}
            </div>
        </div>
    )
}