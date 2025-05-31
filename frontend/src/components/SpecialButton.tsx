function SpecialButton({ text }: { text: string }) {
    return (
        <button className="cursor-pointer text-md bg-white w-35 rounded-full p-3 hover:bg-blue-300 transition-colors ease-in-out duration-500 font-semibold text-black shadow-md">
            {text}
        </button>
    );
}

export default SpecialButton;
