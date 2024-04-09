"use server";

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
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
            .transform((name) => `🥕${name}🥕`)
            .refine(checkName, "no potato"),
        email: z.string().email().toLowerCase(),
        password: z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
        confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
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

    const result = formSchema.safeParse(data);
    if (!result.success) {
        return result.error.flatten();
    } else {
        console.log(result.data);
    }
}
