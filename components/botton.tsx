"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
    text: string;
}

export default function Button({ text }: ButtonProps) {
    const { pending } = useFormStatus(); // 항상 form의 자식 요소에서만 사용 가능 부모 form 의  상태를 받아옴.
    return (
        <button
            disabled={pending}
            className="primary-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
        >
            {pending ? "로딩 중..." : text}
        </button>
    );
}
