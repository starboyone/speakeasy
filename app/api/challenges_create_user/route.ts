import db from "@/db/drizzle";
import { challengeOptions, challenges } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
        const { imgUrl, wordQuestion, wordCorrectTranslate} = await req.json();


        const challenge = await db.insert(challenges).values({   
            id: 6, 
            lessonId: 1,
            type: "SELECT",
            question: wordQuestion,
            order: 5,
        })

        const challengeOption = await db.insert(challengeOptions).values({
            id: 12,
            challengeId: 6,
            imgSrc: imgUrl,
            correct: true,
            audioSrc:"",
            text: wordCorrectTranslate,
        })


        return NextResponse.json({challenge, challengeOption});
    }
    catch(error){
        console.error("[SERVER_POST]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
    
}