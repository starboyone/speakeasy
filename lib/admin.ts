import { auth } from "@clerk/nextjs/server";

const adminIds =  [
    "user_2fTk9ma1PzlGJ38qMTyFrr2lHoC"
]

export const isAdmin = async () => {
    const { userId } = await auth();

    if(!userId) return false;

    console.log(adminIds.indexOf(userId) !== -1);

    return adminIds.indexOf(userId) !== -1
}