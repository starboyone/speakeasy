import Link from "next/link"
import { Button } from "./ui/button"
import { quests } from "@/constans";
import { Progress } from "./ui/progress";
import Image from "next/image";

type Props = {
    points: number;
}

export const Quests = ({points}: Props) => {
    
    return (
        <div className="border-2 space-y-4 p-4 rounded-xl">
            <div className="flex items-center justify-between w-full border-b-2">
                <h3 className="font-bold text-lg">
                    Задания
                </h3>
                <Link href="/quests">
                    <Button variant="primaryOutline" size="sm">
                        Все
                    </Button>
                </Link>
            </div>
            <ul className="w-full space-y-3">
            {quests.map((quest) => {
                const progress = (points / quest.value) * 100;
                return(
                    <div key={quest.title} className="pb-4 gap-x-3 flex items-center w-full">
                        <Image src="/coin.svg" height={30} width={30} alt="Coin"/>
                        <div className="flex flex-col w-full gap-y-2">
                            <p className="text-neutral-700 text-sm font-bold">
                                {quest.title} 
                            </p>
                            <Progress value={progress} className="h-2"/>
                        </div>
                    </div>
                )
            })}
            </ul>
        </div>
    )
}