"use client";

import Button from "@/components/botton";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { smsVerification } from "./actions";

const initialState = {
    token: false,
    error: undefined,
};

export default function SMSLogin() {
    const [state, dispatch] = useFormState(smsVerification, initialState);
    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">안녕하세요!</h1>
                <h2 className="text-xl">SMS로 로그인해주세요!</h2>
            </div>
            <form action={dispatch} className="flex flex-col gap-3">
                {state.token ? (
                    <Input
                        key="token"
                        name="token"
                        required
                        type="number"
                        placeholder="인증 코드"
                        min={100000}
                        max={999999}
                        errors={state.error?.formErrors}
                    />
                ) : (
                    <Input
                        key="phone"
                        name="phone"
                        required
                        type="number"
                        placeholder="핸드폰 번호"
                        errors={state.error?.formErrors}
                    />
                )}

                <Button text={state.token ? "토큰 인증하기" : "문자 보내기"} />
            </form>
        </div>
    );
}
