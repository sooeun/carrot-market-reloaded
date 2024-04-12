"use server";

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import db from "@/lib/db";
import getSession from "@/lib/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { z } from "zod";

function checkName(name: string) {
    return !name.includes("potato");
}

const checkPassword = ({
    password,
    confirm_password,
}: {
    password: string;
    confirm_password: string;
}) => password === confirm_password;

// const checkUniqueName = async (name: string) => {
//     const user = await db.user.findUnique({
//         where: {
//             name: name,
//         },
//         select: {
//             id: true,
//         },
//     });

//     return !Boolean(user);
// };

// const checkUniqueEmail = async (email: string) => {
//     const user = await db.user.findUnique({
//         where: {
//             email: email,
//         },
//         select: {
//             id: true,
//         },
//     });

//     return !Boolean(user);
// };

const formSchema = z
    .object({
        name: z
            .string({
                invalid_type_error: "문자로 입력해주세요.",
                required_error: "이름은 필수입력입니다.",
            })
            // .min(3, "최소 3자리 이상 입력해주세요.")
            // .max(10, "최대 10자리까지만 입력해주세요.")
            .toLowerCase()
            .trim()
            // .transform((name) => `🥕${name}🥕`)
            .refine(checkName, "no potato"),
        email: z.string().email().toLowerCase(),
        password: z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
        confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
    })
    .superRefine(async ({ name }, ctx) => {
        const user = await db.user.findUnique({
            where: {
                name: name,
            },
            select: {
                id: true,
            },
        });
        if (user) {
            ctx.addIssue({
                code: "custom",
                message: "이미 사용중인 이름입니다.",
                path: ["name"],
                fatal: true,
            });
            return z.NEVER;
        }
    })
    .superRefine(async ({ email }, ctx) => {
        const user = await db.user.findUnique({
            where: {
                email: email,
            },
            select: {
                id: true,
            },
        });
        if (user) {
            ctx.addIssue({
                code: "custom",
                message: "이미 사용중인 이메일입니다.",
                path: ["email"],
                fatal: true,
            });
            return z.NEVER;
        }
    })
    .refine(checkPassword, {
        message: "비밀번호가 일치하지 않습니다.",
        path: ["confirm_password"],
    });

export async function createAccount(prevState: any, formData: FormData) {
    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
    };

    // const result = formSchema.safeParse(data);
    const result = await formSchema.safeParseAsync(data);

    if (!result.success) {
        return result.error.flatten();
    } else {
        // 이름, 이메일이 이미 있는지 확인
        // const user = await db.user.findUnique({
        //     where: {
        //         name: result.data.name,
        //     },
        //     select: {
        //         id: true,
        //     },
        // });
        // const userEmail = await db.user.findUnique({
        //     where: {
        //         email: result.data.email,
        //     },
        //     select: {
        //         id: true,
        //     },
        // });

        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(result.data.password, 12);

        // DB에 저장
        const user = await db.user.create({
            data: {
                name: result.data.name,
                email: result.data.email,
                password: hashedPassword,
            },
            select: {
                id: true,
            },
        });

        // 로그인 시켜줌
        // 쿠키를 가져오거나, 없으면 새로 생성해줌.
        const session = await getSession();
        session.id = user.id;
        await session.save();

        redirect("/profile");
    }
}
