
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { courses } from "@/db/schema";
import { getCourses } from "@/db/queries";
import { NavigationMenuUserProgress } from "./navigation-menu-user-progress";

type Props = {
    hearts: number;
    points: number;
    diamonds: number
    activeCourses: typeof courses.$inferInsert;
}

export const UserProgress = async ({ hearts, points, diamonds, activeCourses }: Props) => {
    const coursesData = getCourses();

    const [coursesList] = await Promise.all([coursesData]);

    return (
        <div className="flex items-center justify-between gap-x-2 w-full">
            <NavigationMenuUserProgress title={activeCourses.title} imgSrc={activeCourses.imgSrc} courses={coursesList} activeId={activeCourses.id} diamonds={diamonds} points={points} hearts={hearts}/>
        </div>
    );
};