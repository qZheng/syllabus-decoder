"use client";
import SpecialButton from "./SpecialButton";
import React, { ChangeEvent, useRef, useState } from "react";

export default function FileInputButton() {
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [uploading, isUploading] = useState(false);
    const UPLOAD_URL = "http://localhost:5000/upload";

    function handleClick() {
        fileRef.current?.click();
    }

    async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) return;

        // added a state to check if we are uploading, and to serve to frontend
        isUploading(true);

        const data = new FormData();
        data.append("file", file);

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
        } catch (error) {
            if (error instanceof Error) {
                // here we can specify the stacktrace of the error since we have its type
                console.error(`An error occured: ${error.message}`, error);
            } else {
                // if type is unknown, we say the error is unknown but we don't have stacktrace
                console.error("An unknown error occured: ", error);
            }
        } finally {
            // this occurs at the end no matter what, resetting state
            isUploading(false);
        }
    }

    return (
        <>
            <input
                onChange={handleFileChange}
                ref={fileRef}
                type="file"
                className="hidden"
            />
            <SpecialButton
                handleClick={handleClick}
                text={uploading ? "Uploading..." : "Upload"}
            />
        </>
    );
}
