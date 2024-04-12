"use server";

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import db from "@/lib/db";
import getSession from "@/lib/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { z } from "zod";

const checkEmailExists = async (email: string) => {
    const user = await db.user.findUnique({
        where: {
            email: email,
        },
        select: {
            id: true,
        },
    });

    return Boolean(user);
};

const formSchema = z.object({
    email: z.string().email().toLowerCase().refine(checkEmailExists, "존재하지 않는 이메일입니다."),
    password: z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function login(prevState: any, formData: FormData) {
    const data = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const result = await formSchema.spa(data);

    if (!result.success) {
        return result.error.flatten();
    } else {
        // 유저가 있을 때만, 비밀번호 맞는지 확인
        const user = await db.user.findUnique({
            where: {
                email: result.data.email,
            },
            select: {
                id: true,
                password: true,
            },
        });

        const isSame = await bcrypt.compare(result.data.password, user!.password ?? "");

        // 로그인
        if (isSame) {
            const session = await getSession();
            session.id = user!.id;
            await session.save();
            redirect("/profile");
        } else {
            // zod인척 에러메시지 보내기
            return {
                fieldErrors: {
                    email: [],
                    password: ["비밀번호가 일치하지 않습니다."],
                },
            };
        }
    }
}
