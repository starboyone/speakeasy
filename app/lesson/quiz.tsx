"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { useState, useTransition } from "react";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { toast } from "sonner";
import { reduceHearts } from "@/actions/user-progress";
import { useAudio, useMount, useWindowSize } from "react-use";
import Image from "next/image";
import { ResultCard } from "./result-card";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";
import { Button } from "@/components/ui/button";
import { Volume1Icon, Volume2 } from "lucide-react";

type Props = {
    initialLessonId: number,
    initialPercentage: number,
    initialHearts: number,
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean,
        challengeOptions: typeof challengeOptions.$inferSelect[]
    })[],
}

export const Quiz = ({initialLessonId, initialPercentage, initialHearts, initialLessonChallenges} : Props) => {
    const {open: openPracticeModal} = usePracticeModal();
    const { open: openHeartsModal } = useHeartsModal();

    useMount(() => {
        if(initialPercentage === 100) {
            openPracticeModal();
        }
    })
    
    const pointsMultiplier = initialPercentage === 100 ? 0 : 10;
    const diamondsMultiplier = initialPercentage === 100 ? 0 : 2;

    const {width, height} = useWindowSize();

    const router = useRouter();

    const [correctAudio, _c, correctControls] = useAudio({src: "/correct.mp3"});
    const [incorrectAudio, _i, incorrectControls] = useAudio({src: "/incorrect.mp3"});
    const [finishedAudio, _f, finishControls] = useAudio({src: "/toothless-dancing.mp3"});
    const [heartsMissingAudio, _h, heartMissingControls] = useAudio({src: "/hearts-missing.mp3"});
    const[pending, startTransition] = useTransition();

    const [lessonId] = useState(initialLessonId);
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(() => {
        return initialPercentage === 100 ? 0 : initialPercentage;
    });
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });

    const [selectedOption, setSelectedOption] = useState<number>();
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

    const onNext = () => {
        setActiveIndex((current) => current + 1);
    }

    const challenge = challenges[activeIndex];
    const options = challenge?.challengeOptions ?? [];
    var hear_src = "";
    
    options.map((option) => {
        if(option.correct === true) {
            hear_src = option.audioSrc ?? "";   
        }
    })

    const [hearAudio, _, hearControls] = useAudio({src: hear_src});     

    

    const onSelect = (id: number) => {
        if(status !== "none") return;

        setSelectedOption(id);
    }

    const onContinue = () => {
        if(!selectedOption) return;

        if(status === "wrong"){
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        if(status === "correct"){
            onNext();
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        const correctOption = options.find((option) => option.correct);

        if(!correctOption) return;

        if(selectedOption === correctOption.id){
            startTransition(() => {
                upsertChallengeProgress(challenge.id).then((responce) => {
                    if(responce?.error === "hearts") {
                        openHeartsModal();
                        heartMissingControls.play();
                        return;
                    }
                    
                    correctControls.play();
                    setStatus("correct");
                    setPercentage((prev) => prev + 100 / challenges.length); 

                    if(initialPercentage === 100) {
                        setHearts((prev) => Math.min(prev + 1, 5));
                    }
                }).catch(() => toast.error("Something went wrong. Try again later."));

               
            })
        } else {
            startTransition(() => {
                reduceHearts(challenge.id).then((responce) => {
                    if(responce?.error === "hearts") {
                        openHeartsModal();
                        return;
                    }

                    incorrectControls.play();
                    setStatus("wrong");

                    if(!responce?.error){
                        setHearts((prev) => Math.max(prev - 1, 0));
                    }
                }).catch(() => toast.error("Something went wrong. Try again later."));
            })
        }
    }

    if(!challenge){
        finishControls.play();
        return(
            <>
                <Confetti recycle={true} numberOfPieces={80} tweenDuration={10000} width={width} height={height}/>
                {finishedAudio}
                <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
                    <Image src="/muddu-dance.gif" alt="Muddu" width={250} height={250}/>
                    <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
                        Отличная работа! 
                    </h1>
                    <p className="text-xl text-neutral-500 -mt-4">
                        Вы завершили это занятие
                    </p>
                    <div className="flex items-center gap-x-5 w-full">  
                        <ResultCard variant="points" value={challenges.length * pointsMultiplier}/>
                        <ResultCard variant="diamonds" value={challenges.length * diamondsMultiplier}/>
                    </div>
                </div>
                <Footer lessonId={lessonId} status="completed" onCheck={() => router.push("/learn")}/>
            </>
        )
    }

    const title = challenge.type === "ASSIST" ? "Выберите верный вариант" : challenge.type === "HEAR" ? "Что вы услышали?" : challenge.question;

    return (
        <>
            {correctAudio}
            {incorrectAudio}
            {heartsMissingAudio}
            {hearAudio}
            <Header hearts={hearts} percentage={percentage}/>
            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                        <h1 className="font-bold text-center lg:text-start text-lg lg:text-3xl text-neutral-700 ">
                            {title}
                        </h1>
                        <div>
                            {challenge.type === "ASSIST" && (
                                <QuestionBubble question={challenge.question}/>
                            )}
                            {challenge.type === "HEAR" && (
                                <div className="flex items-center justify-center gap-x-5 mb-6">
                                    
                                    <Button onClick={hearControls.play} variant="primary" className="w-[140px] h-[140px] rounded-3xl">
                                        <Volume2 size={65}/>
                                    </Button>
                                </div>
                            )}
                            <Challenge options={options} onSelect={onSelect} status={status} selectedOption={selectedOption} disabled={pending} type={challenge.type}/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer onCheck={onContinue} status={status} disabled={pending || !selectedOption}   />
        </>
    )
}