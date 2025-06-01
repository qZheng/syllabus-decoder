interface ButtonProps {
    text: string;
    handleClick: () => void | undefined;
}

function SpecialButton({ text, handleClick }: ButtonProps) {
    return (
        <button
            onClick={handleClick}
            className="cursor-pointer text-md bg-white w-35 rounded-full p-3 hover:bg-blue-300 transition-colors ease-in-out duration-500 font-semibold text-black shadow-md"
        >
            {text}
        </button>
    );
}

export default SpecialButton;
