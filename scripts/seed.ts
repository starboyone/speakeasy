import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding database...");

        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "Begginer A1",
                imgSrc: "/gb.svg"
            },
            {
                id: 2,
                title: "Elementary A2",
                imgSrc: "/gb.svg"
            },
            {
                id: 3,
                title: "Intermediate B1",
                imgSrc: "/gb.svg"
            },
            {
                id: 4,
                title: "Upper-Intermediate B2",
                imgSrc: "/gb.svg"
            },
            {
                id: 5,
                title: "Advanced C1",
                imgSrc: "/gb.svg"
            },
            {
                id: 6,
                title: "Proficiency C2",
                imgSrc: "/gb.svg"
            },

        ])

        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1,
                title: "Unit 1",
                description: "Learn the basics of English",
                order: 1
            },
            {
                id: 2,
                courseId: 1,
                title: "Unit 2",
                description: "Learn the basics 2 of English",
                order: 2
            },
            {
                id: 3,
                courseId: 2,
                title: "Unit 1",
                description: "Learn the next stage of English",
                order: 1
            }
        ])

        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1,
                order: 1,
                title: "Nouns"
            },
            {
                id: 2,
                unitId: 1,
                order: 2,
                title: "Verbs"
            },
            {
                id: 3,
                unitId: 1,
                order: 3,
                title: "Verbs 2"
            },
            {
                id: 4,
                unitId: 1,
                order: 4,
                title: "Verbs 3"
            },
            {
                id: 5,
                unitId: 1,
                order: 5,
                title: "Verbs 4"
            },
            {
                id: 6,
                unitId: 2,
                order: 1,
                title: "Professions"
            },
        ])

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1,
                type: "SELECT",
                question: 'Выберите слово "мужчина"',
                order: 1
            },
            {
                id: 2,
                lessonId: 1,
                type: "ASSIST",
                question: 'мужчина',
                order: 2
            },
            {
                id: 3,
                lessonId: 1,
                type: "SELECT",
                question: 'Выберите слово "груша"',
                order: 3
            },
            {
                id: 4,
                lessonId: 1,
                type: "HEAR",
                question: "pear",
                order: 4
            },
            {
                id: 5,
                lessonId: 2,
                type: "SELECT",
                question: 'Выберите слово "бегать"',
                order: 1
            },
        ])

        await db.insert(schema.challengeOptions).values([
            {
                id: 1,
                challengeId: 1,
                imgSrc: "/man.svg",
                audioSrc: "/en_man.mp3",
                text: "the man",
                correct: true
            },
            {
                id: 2,
                challengeId: 1,
                imgSrc: "/woman.svg",
                audioSrc: "/en_woman.mp3",
                text: "the woman",
                correct: false
            },
            {
                id: 3,
                challengeId: 1,
                imgSrc: "/baby.svg",
                audioSrc: "/en_baby.mp3",
                text: "the baby",
                correct: false
            },
            {
                id: 4,
                challengeId: 2,
                audioSrc: "/en_baby.mp3",
                text: "the baby",
                correct: false
            },
            {
                id: 5,
                challengeId: 2,
                audioSrc: "/en_woman.mp3",
                text: "the woman",
                correct: false
            },
            {
                id: 6,
                challengeId: 2,
                audioSrc: "/en_man.mp3",
                text: "the man",
                correct: true
            },
            {
                id: 7,
                challengeId: 3,
                imgSrc: "/apple.svg",
                audioSrc: "/en_apple.mp3",
                text: "the apple",
                correct: false
            },
            {
                id: 8,
                challengeId: 3,
                imgSrc: "/pear.svg",
                audioSrc: "/en_pear.mp3",
                text: "the pear",
                correct: true
            },
            {
                id: 9,
                challengeId: 3,
                imgSrc: "/orange.svg",
                audioSrc: "/en_orange.mp3",
                text: "the orange",
                correct: false
            },
            {
                id: 10,
                challengeId: 4,
                audioSrc: "/en_dear.mp3",
                text: "dear",
                correct: true
            },
            {
                id: 11,
                challengeId: 4,
                audioSrc: "/en_dean.mp3",
                text: "dean",
                correct: false
            }
        ])

        console.log("Database seeded successfully");
        
        
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed database");
    }
}

main();