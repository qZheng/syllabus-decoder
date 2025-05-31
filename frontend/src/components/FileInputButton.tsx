"use client";
import SpecialButton from "./SpecialButton";
import { useRef } from "react";

export default function FileInputButton() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    return (
        <>
            <input type="file" className="hidden" />
            <SpecialButton text="Upload" />
        </>
    );
}
