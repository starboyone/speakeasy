"use client";

import { Button } from "@/components/ui/button";
import { Card } from "./card";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ReactCardFlip from "react-card-flip";
import Image from "next/image";
import { useCreateChallengeModal } from "@/store/use-create-challenge-modal";

const listCard = ['1', '2'];

export const List = () => {

    const [isFlippepd, setIsFlippepd] = useState(false);

    const handleClick = () => {
        setIsFlippepd(!isFlippepd);
    }

    const { open } = useCreateChallengeModal();
    
    return (
        
        <div>
            <div className="w-full py-5">
                <Input className="w-full font-bold" placeholder="Enter name of unit"/>
                <div className="flex items-center justify-between space-x-5 py-3">              
                    <div className="w-1/2">
                        <Textarea className="resize-none font-bold" placeholder="Enter description of unit"/>
                    </div>
                    <div className="flex flex-col space-y-4 w-1/2 my-4 ">
                            <Input/>
                            <Input/>
                        </div>
                </div>  
            </div>

            {listCard.map((id) => (
                <Card key={id} id={id}/>
            ))}
            
            <Button variant="super" className="w-full h-[110px]" onClick={open}>
                Add challenge
            </Button>

            <ReactCardFlip isFlipped={isFlippepd} flipDirection="vertical">
                <div onClick={handleClick} className="font-bold w-[400px] h-[200px] border-2 rounded-xl hover:cursor-pointer flex items-center justify-center">
                    Яблоко
                </div>

                <div onClick={handleClick} className="font-bold w-[400px] h-[200px] border-2 rounded-xl hover:cursor-pointer flex items-center justify-center gap-x-16">
                    <div>
                        Apple
                    </div>
                    <div> 
                        <Image src="/apple.svg" height={100} width={100} alt="Apple"/>
                    </div>
                </div>
            </ReactCardFlip>

            <div className="w-full flex items-center justify-end my-4">
                <Button variant="secondary" size="lg">
                    Create
                </Button>
            </div>
        </div>
    )
}