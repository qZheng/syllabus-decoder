"use client";
import React, { ChangeEvent, useRef } from "react";

interface UploadStatus {
    message: string;
}

interface fileInputElementProps {
    className?: string;
    children?: React.ReactNode;
    uploadStatusChange: (status: UploadStatus) => void;
}

export default function FileInputElement({
    className,
    children,
    uploadStatusChange,
}: fileInputElementProps) {
    const fileRef = useRef<HTMLInputElement | null>(null);
    const UPLOAD_URL = "http://localhost:5000/upload";

    function startUpload() {
        fileRef.current?.click();
    }

    async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;

        const data = new FormData();
        data.append("file", file);
        uploadStatusChange({ message: "Trying to upload..." });

        // implemented a try/catch block to better understand program flow in case of errors
        try {
            const response = await fetch(UPLOAD_URL, {
                method: "POST",
                body: data,
            });
            // adding additional error handling in case the request comes through, but is not ok
            if (!response.ok) {
                throw new Error(`Server status was: ${response.status}`);
            }
            // at this point, the request status has to be okay for this code to execute
            // if it errors here, then backend did not return JSON
            const result = await response.json();
            console.log("Upload worked", result);
            uploadStatusChange({
                message: "Upload completed successfully.",
            });
        } catch (error) {
            uploadStatusChange({
                message: "Upload failed.",
            });
            if (error instanceof Error) {
                // here we can specify the stacktrace of the error since we have its type
                console.error(`An error occured: ${error.message}`, error);
            } else {
                // if type is unknown, we say the error is unknown but we don't have stacktrace
                console.error("An unknown error occured: ", error);
            }
        }
    }

    return (
        <button className={className} onClick={startUpload}>
            <input
                onChange={handleFileChange}
                ref={fileRef}
                type="file"
                className="hidden"
            />
            {children}
        </button>
    );
}
