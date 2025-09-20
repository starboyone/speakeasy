"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css"
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";


interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: "cardImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps ) => {
    const fileType = value?.split(".").pop();

    if(value && fileType === "svg") {
        return(
            <div className="w-[250px] h-[250px] relative ">
                <Image src={value} fill alt="Upload" className="border-2 rounded-2xl p-5"/>
                <button onClick={() => onChange("")} className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm" type="button">
                    <X className="h-4 w-4"/>
                </button>
            </div>
        )
    }

    return (
        <div>
            <UploadDropzone
                className="w-[250px]"
                endpoint={endpoint}
                onClientUploadComplete={(res) => {
                    onChange(res?.[0].url);
                }}
                onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                }}
            />
        </div>
    )
}