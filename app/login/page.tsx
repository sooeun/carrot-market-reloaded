"use client";

import Button from "@/components/botton";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { useFormState } from "react-dom";
import { login } from "./actions";

export default function Login() {
    // const onClick = async () => {
    // "use client";
    //     const response = await fetch("/api/users", {
    //         method: "POST",
    //         body: JSON.stringify({
    //             username: "soon",
    //             password: "1234",
    //         }),
    //     });

    //     console.log(await response.json());
    // };

    const [state, dispatch] = useFormState(login, null); //"use client"; 선언 후 사용할 수 있기 때문에 함수를 다른 파일로 분리해야함. -> actions.ts

    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">안녕하세요!</h1>
                <h2 className="text-xl">이메일로 로그인해주세요!</h2>
            </div>
            <form action={dispatch} className="flex flex-col gap-3">
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
                    minLength={PASSWORD_MIN_LENGTH}
                    errors={state?.fieldErrors.password}
                />
                <Button text={"로그인"} />
            </form>
            {/* <span onClick={onClick}>
            </span> */}
            <SocialLogin />
        </div>
    );
}
