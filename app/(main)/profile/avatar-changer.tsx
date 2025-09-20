"use client";

import { upsertAvatar } from "@/actions/avatar";
import { Button } from "@/components/ui/button";
import { userProgress } from "@/db/schema";
import { UploadButton } from "@/lib/uploadthing";
import { Pen } from "lucide-react";
import Image from "next/image";

type Props = {
    userProgress: typeof userProgress.$inferSelect
}

export const AvatarChanger = ({userProgress} : Props) => {
    return (
        <div className="bg-sky-500/15 rounded-xl w-full min-h-[200px] flex items-center justify-center">
            <Image src={userProgress.userImgSrc} height={200} width={200} alt="User" />
                <UploadButton
                    className="absolute top-4 right-7"
                    appearance={{
                        allowedContent: "hidden",
                        button: "w-12 h-12 rounded-xl bg-sky-400/15 hover:bg-sky-700/15 whitespace-nowrap border-slate-400 border-2 border-b-4 active:border-b-2 focus-visible:outline-none ring-offset-background transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 tracking-wide"
                    }}
                    content={{
                        button(){
                            return (
                                <Pen className="h-6 w-6" color="black"/>
                            )
                        }
                    }}
                    endpoint="cardImage"
                    onClientUploadComplete={(res) => {
                        upsertAvatar(res?.[0].url);
                    }}
                    onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                    }}
                    
                />
        </div>
    )
}