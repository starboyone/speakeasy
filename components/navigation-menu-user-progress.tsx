"use client";

import Image from "next/image";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "./ui/navigation-menu";
import { courses } from "@/db/schema";
import { SquarePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";
import Link from "next/link";
import { cn } from "@/lib/utils";

 type Props = {
     title: string;
     imgSrc: string;
     courses: typeof courses.$inferSelect[];
     activeId?: number;
     diamonds: number;
     points: number;
     hearts: number;
 }

export const NavigationMenuUserProgress = ({title, imgSrc, courses, activeId, diamonds, points, hearts}: Props) => {

    const router = useRouter();
    const [pending, startTransition] = useTransition();

    const onClick = (id: number) => {
        if(pending) return;

        if(id === activeId) {
            return router.push("/learn");
        }

        startTransition(() => {
            upsertUserProgress(id).catch(() => toast.error("Something went wrong"));
        })
    }


     return(
        <NavigationMenu>
                <NavigationMenuList className="gap-x-4">
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>
                            <Image src={imgSrc} height={32} width={32} alt={title} className="rounded-md drop-shadow-md m-2" />
                        </NavigationMenuTrigger>      
                        <NavigationMenuContent className="min-w-[250px]">
                            <div className="py-2 px-4 text-slate-700 font-bold border-b-2">
                                Мои курсы
                            </div>
                            {courses.map((course) => (
                                <div key={course.id}>
                                    <NavigationMenuLink onClick={() => onClick(course.id)} className={cn("flex items-center gap-x-4 py-4 px-4 select-none no-underline outline-none transition-colors cursor-pointer hover:bg-accent", activeId === course.id && "bg-sky-500/15 hover:bg-sky-500/15")}>
                                        <Image src={course.imgSrc} height={32} width={32} alt={course.title} className="rounded-md drop-shadow-md" />
                                        <p className="text-slate-700">{course.title}</p>
                                    </NavigationMenuLink>
                                </div>
                            ))}  
                            <NavigationMenuLink href="/courses" className="flex items-center gap-x-4 py-4 px-4 select-none no-underline outline-none transition-colors hover:bg-accent border-t-2">
                                <SquarePlus className="h-[32px] w-[32px] text-muted-foreground"/>
                                <p className="text-slate-700">Выбрать курс</p>
                            </NavigationMenuLink>
                            <div className="absolute -left-1/2 -top-2 w-0 h-0 border-x-8 border-x-transparent
                            border-t-8 transform -translate-x-1/2"/>
                        </NavigationMenuContent>
                    </NavigationMenuItem>  
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>
                            <p className="text-red-500">
                                {hearts}
                            </p>
                            <Image src="/heart.svg" height={25} width={25} alt="Heart" className="mx-1"/>  
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div className="min-w-[350px] p-4 flex flex-col items-center gap-y-4">
                                <p className="font-bold text-xl">
                                    Жизни
                                </p>
                                <div className="flex justify-center gap-x-2">
                                    {[...Array(hearts)].map((_, index) => (
                                        <Image key={index} src="/heart.svg" height={32} width={32} alt="Heart" className="mx-1" />
                                    ))}
                                </div>
                                <p className="font-bold text-lg">
                                    Ваш запас жизней полон
                                </p>
                                <p className="text-muted-foreground">
                                    {(hearts === 5) ? "Продолжайте учёбу" : ( hearts === 0 ? "Жизни закончились, возвращайтесь позже" : "Жизни в запасе ещё есть! Возвращайтесь к урокам")}
                                </p>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem> 
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>
                            <p className="text-yellow-500">
                                {points}
                            </p>
                            <Image src="/coin.svg" height={25} width={25} alt="Coin" className="mx-1"/> 
                        </NavigationMenuTrigger>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>
                            <p className="text-sky-500">
                                {diamonds}
                            </p>
                            <Image src="/diamond.svg" height={20} width={20} alt="Diamond" className="mx-1"/> 
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div className="min-w-[350px] p-4 flex justify-start items-start gap-x-4">
                                <Image src="/box_diamonds.svg" height={100} width={100} alt="Box_diamond"/>
                                <div className="flex flex-col gap-y-2 pt-2">
                                    <p className="font-bold text-lg">
                                        Алмазы
                                        </p>
                                    <p className="text-muted-foreground">
                                        У вас в запасе {diamonds} 
                                        {diamonds === 1 ? " алмаз" : ( (diamonds === 2 || diamonds === 3 || diamonds === 4)  ? " алмаза" : " алмазов")}
                                    </p>
                                    <Link href="/shop">
                                        <p className="text-sky-500 font-bold cursor-pointer uppercase text-base">
                                            Перейти в магазин
                                        </p>
                                    </Link>
                                </div>
                                <div className="absolute bg-slate-400 left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent
                                border-t-8 transform -translate-x-1/2"/>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
                
            </NavigationMenu>
     )
 }