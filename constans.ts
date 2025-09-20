import { desc } from "drizzle-orm"

export const quests = [
    {
        title: "Получите 20 очков опыта",
        value: 20
    },
    {
        title: "Получите 50 очков опыта",
        value: 50
    },
    {
        title: "Получите 100 очков опыта",
        value: 100
    },
    {
        title: "Получите 500 очков опыта",
        value: 500
    },
]

export const statuses = [
    {
        src: "/gb.svg",
        title: "Great Britain",
    },
    {
        src: "/es.svg",
        title: "Spain",
    },
    {
        src: "/by.svg",
        title: "Belarus",
    },
    {
        src: "/cn.svg",
        title: "China",
    },
    {
        src: "/excellent.svg",
        title: "Excellent",
    },
    {
        src: "/trophy.svg",
        title: "Trophy",
    },
    {
        src: "/muscle.svg",
        title: "Muscle",
    },
    {
        src: "/heart.svg",
        title: "heart",
    },
]

export const achievements = [

    {
        title: "Эрудит",
        src: "/coin.svg",
        description: "Завершите полностью 5 занятий"
    },
]