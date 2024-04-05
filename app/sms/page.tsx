import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";

export default function SMSLogin() {
    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">안녕하세요!</h1>
                <h2 className="text-xl">SMS로 로그인해주세요!</h2>
            </div>
            <form className="flex flex-col gap-3">
                <FormInput required type="number" placeholder="핸드폰 번호" errors={[]} />
                <FormInput required type="number" placeholder="인증 코드" errors={[]} />
                <FormButton loading={false} text={"로그인"} />
            </form>
        </div>
    );
}
