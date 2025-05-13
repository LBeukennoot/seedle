export default function Button({ text, onClick }: ButtonType) {

    return (
        <button className="bg-blue text-xl text-white px-7 py-2 rounded-full border-6 border-blue hover:bg-light-blue cursor-pointer transition-all duration-150" onClick={(e) => {onClick(e)}}>
            {text}
        </button>
    )
}

type ButtonType = {
    text: string
    onClick: Function
}