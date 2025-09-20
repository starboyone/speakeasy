import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
    imgSrc: string;
    title: string;
    price: number;
    diamonds: number;
}

export const Item = ({ imgSrc, title, price, diamonds }: Props) => {
    return (
        <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
            <Image src={imgSrc} height={60} width={60} alt={title}/>
            <div className="flex-1">
                <p className="font-bold text-base lg:text-xl text-neutral-700 text-center">
                    {title}
                </p>
            </div>
            <Button disabled={diamonds < price} className="min-w-[100px]">
                <div className="flex items-center">
                    <p>
                        {price}   
                    </p>
                    <Image src="/diamond.svg" height={20} width={20} alt="Coin" className="mx-1"/> 
                </div>
            </Button>
        </div>
    )
}