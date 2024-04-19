"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import crypto from "crypto";
import { redirect } from "next/navigation";
import twilio from "twilio";
import validator from "validator";
import { z } from "zod";

const phoneSchema = z
    .string()
    .trim()
    .refine((phone) => validator.isMobilePhone(phone, "ko-KR"), "잘못된 형식입니다.");

async function tokenExists(token: number) {
    const exists = await db.sMSToken.findUnique({
        where: {
            token: token.toString(),
        },
        select: {
            id: true,
        },
    });
    return Boolean(exists);
}

const tokenSchema = z.coerce
    .number()
    .min(100000)
    .max(999999)
    .refine(tokenExists, "존재하지 않는 코드입니다.");

interface ActionState {
    token: boolean;
}

async function getToken() {
    const token = crypto.randomInt(100000, 999999).toString();
    const exists = await db.sMSToken.findUnique({
        where: {
            token,
        },
        select: {
            id: true,
        },
    });
    if (exists) {
        return getToken();
    } else {
        return token;
    }
}

export async function smsVerification(prevState: ActionState, formData: FormData) {
    const phone = formData.get("phone");
    const token = formData.get("token");

    if (!prevState.token) {
        const result = phoneSchema.safeParse(phone);
        if (!result.success) {
            return { token: false, error: result.error.flatten() };
        } else {
            // 이전 토큰 삭제하기
            await db.sMSToken.deleteMany({
                where: {
                    user: {
                        phone: result.data,
                    },
                },
            });
            // 새로운 토큰 만들기
            const token = await getToken();
            await db.sMSToken.create({
                data: {
                    token,
                    user: {
                        connectOrCreate: {
                            where: {
                                phone: result.data,
                            },
                            create: {
                                name: crypto.randomBytes(10).toString("hex"),
                                phone: result.data,
                            },
                        },
                    },
                },
            });
            // twilio로 토큰 보내기
            const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
            await client.messages.create({
                body: `수으니의 당근 마켓 인증 코드 : ${token}`,
                from: process.env.TWILIO_PHONE_NUMBER!,
                to: process.env.MY_PHONE_NUMBER!, // 체험판이라서 내 번호로만 보낼 수 있다. 원래는 result.data로 보내야 함.
            });
            return { token: true };
        }
    } else {
        const result = await tokenSchema.spa(token);
        if (!result.success) {
            return { token: true, error: result.error.flatten() };
        } else {
            // token에 연결된 user id를 가져옴
            const token = await db.sMSToken.findUnique({
                where: {
                    token: result.data.toString(),
                },
                select: {
                    id: true,
                    userId: true,
                },
            });
            // if (token) { tokenExists() 에서 이미 존재한다고 증명됨.
            const session = await getSession();
            session.id = token!.userId;
            await session.save();
            await db.sMSToken.delete({
                where: {
                    id: token!.id,
                },
            });
            // }
            redirect("/profile");
        }
    }
}
