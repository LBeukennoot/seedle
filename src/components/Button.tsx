export default function Button({ text, onClick, expanded }: ButtonType) {

    return (
        <button className={"w-full md:w-auto bg-blue text-xl text-white rounded-full border-6 border-blue hover:bg-light-blue cursor-pointer transition-all duration-150 " + (expanded ? "" : "px-5 py-1 md:px-7 md:py-2")} onClick={(e) => { onClick(e) }}>
            {text}
        </button>
    )
}

type ButtonType = {
    text: string
    onClick: Function
    expanded?: boolean
}