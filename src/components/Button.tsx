export default function Button({ text, onClick }: ButtonType) {

    return (
        <button className="bg-blue text-lg text-white px-6 py-2.5 rounded-lg cursor-pointer" onClick={(e) => {onClick(e)}}>
            {text}
        </button>
    )
}

type ButtonType = {
    text: string
    onClick: Function
}