import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";
import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AvatarChanger } from "./avatar-changer";
import { achievements } from "@/constans";
import { Achievement } from "./achievement";

const ProfilePage = async () => {
    const userProgressData = await getUserProgress();

    const [
        userProgress,
    ] = await Promise.all([
        userProgressData,
    ]);

    if(!userProgress || !userProgress?.activeCourse) {
        redirect("/courses");
    }
    return(
        <div className="flex flex-row-reverse gap-[48px]">
            <StickyWrapper>
                <UserProgress activeCourses={userProgress.activeCourse} hearts={userProgress.hearts} points={userProgress.points} diamonds={userProgress.diamonds}/>
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col gap-y-6 px-3">
                     <AvatarChanger userProgress={userProgress}/>
                     <div className="flex flex-col gap-y-1">
                        <p className="font-bold text-3xl">{userProgress.userName}</p>
                        <p className="text-muted-foreground">{userProgress.userId}</p>
                        <p>Регистрация: {userProgress.registrationDate}</p>
                     </div>
                     <Separator className="h-0.5 rounded-full"/>
                     <div className="flex flex-col gap-y-3">
                        <p className="font-bold text-2xl">Статистика</p>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-xl border-2 min-h-[100px] min-w-[200px]">
                            </div>
                            <div className="rounded-xl border-2 min-h-[100px] min-w-[200px]">
                            </div>
                            <div className="rounded-xl border-2 min-h-[100px] min-w-[200px]">
                            </div>
                            <div className="rounded-xl border-2 min-h-[100px] min-w-[200px]">
                            </div>
                        </div>
                     </div>
                     <Separator className="h-0.5 rounded-full"/>
                     <div className="flex flex-col gap-y-3">
                        <div className="flex items-center justify-between">
                            <p className="font-bold text-2xl">Достижения</p>
                            <Link href="/quests">
                                <Button variant="primaryOutline" size="sm">
                                    Все
                                </Button>
                            </Link>
                        </div>
                        <div className="rounded-xl border-2 w-full">

                            {achievements.map((achievement) => {
                                return(
                                    <Achievement key={achievement.title} title={achievement.title} src={achievement.src} description={achievement.description}/>
                                )
                            })}

                        </div>
                     </div>
                </div>
            </FeedWrapper>
        </div>
    )
}

export default ProfilePage;