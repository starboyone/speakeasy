"use client";

import Image from "next/image"
import { Button } from "./ui/button"
import { statuses } from "@/constans";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { upsertStatus } from "@/actions/status";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Props = {
    status: string;
}

export const Status = ({status}: Props) => {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    const onClick = (newStatus: string) => {
        if(pending) return;

        if(status === newStatus) {
            startTransition(() => {
                upsertStatus("none").catch(() => toast.error("Something went wrong"));
            })
        }
        else{
            startTransition(() => {
                upsertStatus(newStatus).catch(() => toast.error("Something went wrong"));
            })
        }
    }
    return (
        <div className="border-2 space-y-4 p-4 rounded-xl">
            <div className="flex flex-col gap-y-6">
                <div className="flex justify-between items-center">
                    <p className="font-bold text-lg">
                        Установите статус
                    </p>
                    <Button onClick={() => {upsertStatus("none")}} variant="primaryOutline" size="sm">
                        Очистить
                    </Button>
                </div>
                <div className="flex justify-center">
                    <div className="h-[90px] w-[90px] rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center">
                        <p className="font-bold text-4xl text-gray-400 uppercase">
                            A
                        </p>
                        <div className="absolute h-[15px] w-[15px] rounded-full bg-green-500 mt-[65px] ml-[65px]">
                        </div>
                        <div className="absolute h-[40px] w-[40px] rounded-full rounded-bl-xl border-2 bg-white mb-[80px] ml-[80px] flex justify-center items-center">
                            {(status === "none") ? (
                                <div className="h-[25px] w-[25px] rounded-full border-2 border-dashed">
                                </div>
                            ) : (
                                <Image src={status} height={30} width={30} alt="diamond" className="rounded-md"/>
                            )}
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-6 gap-2">
                    {statuses.map((statusItem) => (
                        <Button 
                            onClick={() => onClick(statusItem.src)} 
                            disabled={pending}
                            key={statusItem.title} 
                            variant="default" 
                            size="status"
                            className={cn(
                                status === statusItem.src && "bg-sky-400/15 border-2 border-b-4 border-sky-400"
                            )}
                        >
                            <Image src={statusItem.src} height={38} width={38} alt={statusItem.title} className="rounded-md"/>
                        </Button>
                    ))}
                    
                </div>
            </div>
        </div>
    )
}