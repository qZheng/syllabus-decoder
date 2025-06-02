"use client";
import FileInputElement, { fileInputElementHandles } from "./FileInputElement";
import Image from "next/image";
import SpecialButton from "./SpecialButton";
import { useState, useRef } from "react";

interface UploadStatus {
    message: string;
}

export default function UploadSection() {
    const [statusText, setStatusText] = useState("");
    const fileInputRef = useRef<fileInputElementHandles>(null);

    // file input box sizes
    const uploadBoxWidth = 512;
    const uploadBoxHeight = 256;
    const uploadIconWidth = uploadBoxWidth / 8;
    const uploadIconHeight = uploadBoxHeight / 4;

    function handleFetchStatus(status: UploadStatus) {
        setStatusText(status.message);
    }

    //TODO:
    function handleClick() {
        if (fileInputRef.current) {
            fileInputRef.current.startUpload();
        }
    }

    return (
        <>
            <FileInputElement
                ref={fileInputRef}
                uploadStatusChange={handleFetchStatus}
                className="relative hover:bg-[#111111] transition-colors duration-500 rounded-3xl"
            >
                <Image
                    className="rounded-3xl"
                    width={uploadBoxWidth}
                    height={uploadBoxHeight}
                    src="/upload-box.svg"
                    alt="drag and drop file here to upload"
                />
                <div className="absolute top-24 left-56">
                    <Image
                        width={uploadIconWidth}
                        height={uploadIconHeight}
                        src="/upload-white.svg"
                        alt="upload icon"
                    />
                </div>
                <p className={`absolute left-[50%] translate-x-[-50%]`}>
                    {statusText}
                </p>
            </FileInputElement>
            <SpecialButton text="Upload" handleClick={handleClick} />
        </>
    );
}
