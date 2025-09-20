import { Progress } from "@/components/ui/progress"
import Image from "next/image"

type Props = {
    title: string;
    src: string;
    description: string;
}

export const Achievement = ({title, src, description} : Props) => {
    return (
        <div className="flex items-center w-full p-4">
            <div className="h-[100px] w-[87px] bg-red-400 rounded-xl flex flex-col justify-center items-center border-b-4 border-red-500">
                <Image src={src} height={70} width={70} className="" alt="Coin"/>
                <p className="text-white uppercase text-xs font-bold">Уровень 1</p>
            </div>
            <div className="flex flex-col w-full gap-y-2 pl-6">
                <div className="flex justify-between w-full items-center">
                    <p className="text-xl font-bold">
                        {title}
                    </p>
                    <p className="text-muted-foreground text-md">
                        1/5
                    </p>
                </div>
                <Progress value={20} className="h-3"/>
                <p>
                    {description}
                </p>
            </div>      
        </div>
    )
}