export default function ScreenCard({ children }: any) {
    return (
        <div className="bg-white mx-auto max-w-xl rounded-3xl min-w-[30rem] min-h-[15rem] max-h-[30rem] p-10 transition-all">
            <div className="overflow-y-auto max-h-[25rem]">
                {children}
            </div>
        </div>
    )
}