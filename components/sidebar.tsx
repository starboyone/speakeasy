"use server";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import { Loader } from "lucide-react";
import { Separator } from "./ui/separator";
import { isAdmin } from "@/lib/admin";
import { getServerLanguage, getServerTranslations } from "@/translations/server/i18n";
type Props = {
    className?: string;
}

export const Sidebar = async ({className}: Props) => {

    const lang = getServerLanguage();
    const translations = getServerTranslations(lang);

    const isAsminUser = await isAdmin();
    
    //if (isLoading) return <div><Loader className="w-5 h-5 text-muted-foreground animate-spin" /></div>;

    return (
        <div className={cn("flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col", className)}>
            <Link href="/learn">
            <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                <Image src="/mascot.svg" height={40} width={40} alt="Mascot"/>
                <h1 className="text-2xl font-bold text-blue-600 tracking-wide font-sans">
                    SpeakEasy
                </h1>
            </div>
            </Link>
            <div className="flex flex-col gap-y-2 flex-1">
                <SidebarItem label={translations.Sidebar.learn} iconSrc="/home.svg" href="/learn"/>
                {/*<SidebarItem label="Creator" iconSrc="/creator.svg" href="/creator"/>*/}
                <SidebarItem label={translations.Sidebar.leaderboard} iconSrc="/leaderboard.svg" href="/leaderboard"/>
                <SidebarItem label={translations.Sidebar.quests} iconSrc="/quests.svg" href="/quests"/>
                <SidebarItem label={translations.Sidebar.shop} iconSrc="/shop.svg" href="/shop"/>
                <SidebarItem label={translations.Sidebar.profile} iconSrc="/profile.png" href="/profile"/>
                <SidebarItem label={translations.Sidebar.settings} iconSrc="/settings.svg" href="/settings"/>
                {(!isAsminUser) ? null : (
                    <SidebarItem label={translations.Sidebar.admin} iconSrc="/admin.svg" href="./admin"/>
                )}
            </div>  
        </div>
    )
}