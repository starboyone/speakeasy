import Link from "next/link"
import { Button } from "./ui/button"
import { getTopTenUsers, getUserProgress } from "@/db/queries";
import { Avatar, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const Rating = async() => {
    const userProgressData = await getUserProgress();
    const leaderboardData = await getTopTenUsers();
    
    const [
        userProgress,
        leaderboard
    ] = await Promise.all([
        userProgressData,
        leaderboardData
    ]);
    return (
        <div className="border-2 space-y-4 p-4 rounded-xl">
            <div className="flex items-center justify-between w-full border-b-2">
                <h3 className="font-bold text-lg">
                    Таблица лидеров
                </h3>
                <Link href="/leaderboard">
                    <Button variant="primaryOutline" size="sm">
                        Обзор
                    </Button>
                </Link>
            </div>
            {(userProgress?.points === 0) ? (
                <div className="flex justify-between items-start text-muted-foreground">
                    <Image src="/sleeping_duo.svg" height={50} width={70} alt="sleeping_duo" className="mr-4"/>
                    <p>Пройдите урок, чтобы войти в рейтинг и соревноваться с другими игроками</p>
                </div>
            ) : (
                <ul className="w-full space-y-3">
                {leaderboard.map((userProgressFromLeaderboard, index) => {
                    return(
                        <div key={userProgressFromLeaderboard.userId} className={cn("flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50", userProgress?.userId === userProgressFromLeaderboard.userId && "bg-sky-500/15 hover:bg-sky-500/15")}>
                            <p className="font-bold mr-4">{index + 1}</p>
                            <Avatar className="bg-green-500 border h-6 w-6 ml-3 mr-4">
                                <AvatarImage className="object-cover" src={userProgressFromLeaderboard.userImgSrc} />
                            </Avatar>
                            <p className="font-bold flex-1 text-neutral-800">{userProgressFromLeaderboard.userName}</p>
                            <p className="text-muted-foreground">{userProgressFromLeaderboard.points} XP</p>
                        </div>
                    )
                })}
                </ul>
            )}
            
        </div>
    )
}