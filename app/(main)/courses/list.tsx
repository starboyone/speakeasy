"use client";

import { courses, userProgress } from "@/db/schema";
import { Card } from "./card";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";

type Props = {
    courses: typeof courses.$inferSelect[];
    activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
}

export const List = ({ courses, activeCourseId }: Props) => {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    const onClick = (id: number) => {
        if(pending) return;

        if(id === activeCourseId) {
            return router.push("/learn");
        }

        startTransition(() => {
            upsertUserProgress(id).catch(() => toast.error("Something went wrong"));
        })
    }

    return(
        <div className="py-6 grid grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((course) => (
                <Card 
                    key={course.id} 
                    title={course.title} 
                    id={course.id} 
                    imgSrc={course.imgSrc} 
                    onClick={onClick} 
                    disabled={pending} 
                    active={course.id === activeCourseId} 
                />
            ))}
        </div>
    )
}