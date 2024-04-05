import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";

export default function Login() {
    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">안녕하세요!</h1>
                <h2 className="text-xl">이메일로 로그인해주세요!</h2>
            </div>
            <form className="flex flex-col gap-3">
                <FormInput required type="email" placeholder="이메일" errors={[]} />
                <FormInput required type="password" placeholder="비밀번호" errors={[]} />

                <FormButton loading={false} text={"로그인"} />
            </form>
            <SocialLogin />
        </div>
    );
}
