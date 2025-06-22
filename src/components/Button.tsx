export default function Button({ children, text, onClick }: any) {

    return (
        <button
            className={"w-full md:w-auto bg-blue text-xl text-white rounded-full border-6 border-blue hover:bg-light-blue cursor-pointer transition-all duration-150 px-5 py-1 md:px-2 md:py-2"}
            onClick={(e) => { onClick(e) }}>
            {text}
            {children}
        </button>
    )
}

type ButtonType = {
    text: string
    onClick: Function
    expanded?: boolean
}