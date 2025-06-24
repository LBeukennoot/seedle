export default function Button({ children, text, onClick, className }: any) {

    return (
        <button
            className={"w-auto bg-blue text-xl text-white rounded-full border-6 border-blue hover:bg-light-blue cursor-pointer transition-all duration-150 px-2 py-2 " + className}
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