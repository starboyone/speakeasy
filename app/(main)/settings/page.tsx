import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";
import { SignOutButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import LanguageSwitcher from "@/components/language-switcher";
import { Loader } from "lucide-react";
import { getServerLanguage, getServerTranslations } from "@/translations/server/i18n";

const SettingsPage = async () => {
    const userProgressData = getUserProgress();

    const [
        userProgress
    ] = await Promise.all([
        userProgressData
    ]);

    if(!userProgress || !userProgress?.activeCourse) {
        redirect("/courses");
    }

    const lang = getServerLanguage();
    const translations = getServerTranslations(lang);

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <div>
                    
                </div>
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col gap-y-4">
                    <p className="font-bold text-2xl text-neutral-500">
                        {translations.Settings.appearance}
                    </p>
                    <Separator className="h-0.5 rounded-full"/>
                    <ModeToggle />
                    <p className="font-bold text-2xl text-neutral-500 mt-4">
                        {translations.Settings.language}
                    </p>
                    <Separator className="h-0.5 rounded-full"/>
                    <LanguageSwitcher/>
                    <p className="font-bold text-2xl text-neutral-500 mt-4">
                        {translations.Settings.account}
                    </p>
                    <Separator className="h-0.5 rounded-full"/>
                    <SignOutButton>
                        <Button variant="primary">
                            {translations.Settings.logout}
                        </Button>
                    </SignOutButton>
                </div>
            </FeedWrapper>
        </div>
    )
}

export default SettingsPage;