export default function SessionIcon ({enabled, ...props}: any) {
    return (
        <div {...props} className={"w-2 h-2 rounded-full " + (enabled ? "bg-blue" : "bg-light-blue")}></div>
    )
}