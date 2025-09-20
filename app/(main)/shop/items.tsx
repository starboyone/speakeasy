"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Item } from "./item";
import { useTransition } from "react";

type Props = {
    hearts: number;
    points: number;
    diamonds: number;
}

export const Items = ({ hearts, points, diamonds}: Props) => {

    const PRICE_REFILL_HEARTS = 10;

    const [pending, setTransition] = useTransition();

    return (
        <ul className="w-full">
            <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
                <Image src="/heart.svg" height={60} width={60} alt="Heart"/>
                <div className="flex-1">
                    <p className="font-bold text-base lg:text-xl text-neutral-700 text-center">
                        Восполнить сердца
                    </p>
                </div>
                <Button disabled={hearts === 5 || diamonds < PRICE_REFILL_HEARTS} className="min-w-[100px]">
                    {
                        hearts === 5
                        ? "Полные"
                        :(
                            <div className="flex items-center">
                                <p>
                                    {PRICE_REFILL_HEARTS}   
                                </p>
                                <Image src="/diamond.svg" height={20} width={20} alt="Coin" className="mx-1"/> 
                            </div>
                        )
                    }
                    
                </Button>
            </div>

            <Item imgSrc="/toothless-dancing.gif" title="Toothless" price={50} diamonds={diamonds}/>
            <Item imgSrc="/cat-dancing.gif" title="Cat" price={20} diamonds={diamonds}/>
        </ul>
    )
}