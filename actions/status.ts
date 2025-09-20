"use server";

import db from "@/db/drizzle";
import { getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const upsertStatus = async (newStatus: string) => {
    const {userId} = await auth();
    const user = await currentUser();

    if(!userId || !user){
        throw new Error("Unauthorized");
    }

    const currentUserProgress = await getUserProgress();

    await db.update(userProgress)
        .set({
            status: newStatus,
        })
        .where(eq(userProgress.userId, userId));
    

    redirect("/leaderboard");
}