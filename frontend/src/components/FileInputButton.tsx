"use client";
import SpecialButton from "./SpecialButton";
import React, { ChangeEvent, useRef } from "react";

export default function FileInputButton() {
    const fileRef = useRef<HTMLInputElement | null>(null);

    function handleClick() {
        fileRef.current?.click();
    }

    async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;
        const data = new FormData();
        data.append("file", file);
        const response = await fetch("http://localhost:5000/upload", {
            method: "POST",
            body: data,
        });
        const result = await response.json();
        console.log("Upload worked", result);
    }

    return (
        <>
            <input
                onChange={handleFileChange}
                ref={fileRef}
                type="file"
                className="hidden"
            />
            <SpecialButton handleClick={handleClick} text="Upload" />
        </>
    );
}
