"use client";

import FormButton from "@/components/botton";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";

export default function CreateAccount() {
    const [state, dispatch] = useFormState(createAccount, null);

    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">안녕하세요!</h1>
                <h2 className="text-xl">회원가입을 위해 아래 내용을 작성해주세요!</h2>
            </div>
            <form action={dispatch} className="flex flex-col gap-3">
                <Input
                    required
                    name={"name"}
                    type="text"
                    placeholder="이름"
                    errors={state?.fieldErrors.name}
                />
                <Input
                    required
                    name={"email"}
                    type="email"
                    placeholder="이메일"
                    errors={state?.fieldErrors.email}
                />
                <Input
                    required
                    name={"password"}
                    type="password"
                    placeholder="비밀번호"
                    errors={state?.fieldErrors.password}
                    minLength={PASSWORD_MIN_LENGTH}
                />
                <Input
                    required
                    name={"confirm_password"}
                    type="password"
                    placeholder="비밀번호 확인"
                    errors={state?.fieldErrors.confirm_password}
                    minLength={PASSWORD_MIN_LENGTH}
                />
                <FormButton text={"회원가입"} />
            </form>
            <SocialLogin />
        </div>
    );
}
