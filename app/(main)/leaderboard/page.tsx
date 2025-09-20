import { FeedWrapper } from "@/components/feed-wrapper";
import { Status } from "@/components/status";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { UserProgress } from "@/components/user-progress";
import { getTopTenUsers, getUserProgress } from "@/db/queries";
import { getServerLanguage, getServerTranslations } from "@/translations/server/i18n";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { redirect } from "next/navigation";

const LeaderboardPage = async() => {
    const userProgressData = await getUserProgress();
    const leaderboardData = await getTopTenUsers();

    const [
        userProgress,
        leaderboard
    ] = await Promise.all([
        userProgressData,
        leaderboardData
    ]);

    if(!userProgress || !userProgress?.activeCourse) {
        redirect("/courses");
    }
    
    const lang = getServerLanguage();
    const translations = getServerTranslations(lang);


    return (
        <div className="flex flex-row-reverse gap-[48px]">
            <StickyWrapper>
                <UserProgress activeCourses={userProgress.activeCourse} hearts={userProgress.hearts} points={userProgress.points} diamonds={userProgress.diamonds}/>
                <Status status={userProgress.status}/>
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image src="/leaderboard.svg" height={90} width={90} alt="Leaderboard" className="mx-auto"/>
                    <h1 className="text-centet font-bold text-2xl text-neutral-800 my-6">
                        {translations.Leaderboard.title}
                    </h1>
                    <p className="text-center text-muted-foreground text-lg mb-6">
                        {translations.Leaderboard.description}
                    </p>
                    <Separator className="mb-4 h-0.5  rounded-full"/>
                    {leaderboard?.map((userProgressFromLeaderboard, index) => (
                        <div key={userProgressFromLeaderboard.userId} className="flex items-center w-full p-3 px-4 rounded-xl hover:bg-gray-200/50">
                            <p className="font-bold mr-4">{index + 1}</p>
                            <div className="flex justify-center items-center">
                                <Avatar className="bg-green-500 border h-12 w-12 ml-3 mr-4">
                                    <AvatarImage className="object-cover" src={userProgressFromLeaderboard.userImgSrc} />
                                </Avatar>
                                {userProgressFromLeaderboard.status === "none" ? (
                                    <>
                                    </>
                                ) : (
                                    <div className="absolute h-[25px] w-[25px] rounded-full rounded-bl-xl border-2 bg-white mb-[40px] ml-[40px] flex justify-center items-center">
                                        <Image src={userProgressFromLeaderboard.status} height={18} width={18} alt="diamond" className="rounded-md"/>
                                    </div>
                                )}
                            </div>
                            <p className="font-bold flex-1 text-neutral-800">{userProgressFromLeaderboard.userName}</p>
                            <p className="text-muted-foreground">{userProgressFromLeaderboard.points} очков</p>
                        </div>
                    ))}
                </div>
            </FeedWrapper>
        </div>
    )
}

export default LeaderboardPage;