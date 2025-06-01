"use client";
import { useRouter } from "next/navigation";

interface ButtonProps {
    text: string;
    handleClick?: () => void;
    href?: string;
}

function SpecialButton({ text, handleClick, href }: ButtonProps) {
    const router = useRouter();
    function handleButtonClick() {
        if (href) {
            router.push(`${href}`);
        } else if (handleClick) handleClick();
    }

    return (
        <button
            onClick={handleButtonClick}
            className="cursor-pointer text-md bg-white w-35 rounded-full p-3 hover:bg-blue-300 transition-colors ease-in-out duration-500 font-semibold text-black shadow-md"
        >
            {text}
        </button>
    );
}

export default SpecialButton;
