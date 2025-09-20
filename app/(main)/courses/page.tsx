    import { getCourses, getUserProgress } from "@/db/queries";
    import { List } from "./list";
    import Image from "next/image";
    import { redirect } from "next/navigation";

    const CoursesPage = async () => {
        const coursesData =  getCourses();
        const userProgressData =  getUserProgress();

        const [
            courses,
            userProgress
        ] = await Promise.all([
            coursesData,
            userProgressData    
        ])

        if(!userProgress) {
            //redirect("/");
        }

        return (
            <div className="h-full max-w-[912px] px-3 mx-auto">
                <h1 className="font-bold text-2xl text-neutral-700">
                    Языковые курсы
                </h1>
                <List courses={courses} activeCourseId={userProgress?.activeCourseId}/>
            </div>
        )
    }

    export default CoursesPage;