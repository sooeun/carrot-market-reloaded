import Link from "next/link";

export default function Home() {
    return (
        // <main className="bg-gray-100 h-screen flex items-center justify-center p-5 dark:bg-gray-700">
        //     <div className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm dark:bg-gray-600">
        //         <div className="flex justify-between items-center">
        //             <div className="flex flex-col">
        //                 <span className="text-gray-600 font-semibold -mb-1 dark:text-gray-300">
        //                     In transit
        //                 </span>
        //                 <span className="text-4xl font-semibold dark:text-white">Coolblue</span>
        //             </div>
        //             <div className="size-12 rounded-full bg-orange-400" />
        //         </div>
        //         <div className="my-2 flex items-center">
        //             <span className="bg-green-400 text-white uppercase px-2.5 py-1.5 text-xs font-medium rounded-full mr-3 transition hover:bg-green-500 hover:scale-125 hover:cursor-pointer">
        //                 Today
        //             </span>
        //             <span className="dark:text-gray-100">09:00-10:00</span>
        //         </div>
        //         <div className="relative">
        //             <div className="bg-gray-200 absolute w-full h-2 rounded-full" />
        //             <div className="bg-green-400 absolute w-2/3 h-2 rounded-full" />
        //         </div>
        //         <div className="flex justify-between items-center mt-5 text-gray-600 dark:text-gray-300">
        //             <span>Expected</span>
        //             <span>Sorting center</span>
        //             <span>In transit</span>
        //             <span className="text-gray-400 dark:text-gray-500">Delivered</span>
        //         </div>
        //     </div>
        // </main>

        // <main className="bg-gray-100 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100 2xl:bg-purple-100 h-screen flex items-center justify-center p-5">
        //     <div className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col md:flex-row gap-2 *:outline-none has-[.peer]:bg-green-100 has-[:invalid]:ring has-[:invalid]:ring-red-100 ring ring-transparent transition-shadow">
        //         <input
        //             className="w-full rounded-full py-3 bg-gray-200 pl-5 ring ring-transparent focus:ring-green-300 focus:ring-offset-2 transition-shadow placeholder:drop-shadow invalid:focus:ring-red-400 peer"
        //             type="text"
        //             required
        //             placeholder="Email address"
        //         />
        //         <span className="text-red-500 font-medium hidden peer-invalid:block">
        //             Email is required.
        //         </span>
        //         <button className=" text-white py-2 rounded-full active:scale-90 transition-transform font-medium  md:px-10 bg-black peer-invalid:bg-red-100 peer-required:bg-green-500">
        //             Login
        //         </button>
        //     </div>
        // </main>

        // <main className="bg-gray-100 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100 2xl:bg-purple-100 h-screen flex items-center justify-center p-5">
        //     <div className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-3">
        //         {["Nico", "Me", "You", "Soon", ""].map((person, index) => (
        //             <div key={index} className="flex items-center gap-5 group">
        //                 <div className="size-10 bg-blue-400 rounded-full" />
        //                 <span className="text-lg font-medium empty:w-24 empty:h-2 empty:rounded-full empty:animate-pulse empty:bg-gray-300 group-hover:text-blue-400 group-hover:cursor-pointer">
        //                     {person}
        //                 </span>
        //                 <div className="size-6 bg-red-500 text-white flex items-center justify-center rounded-full relative">
        //                     <span className="z-10">{index}</span>
        //                     <div className="size-6 bg-red-500 rounded-full absolute animate-ping" />
        //                 </div>
        //             </div>
        //         ))}
        //     </div>
        // </main>

        // <main className="bg-gray-100 sm:bg-red-100 md:bg-green-100 lg:bg-cyan-100 xl:bg-orange-100 2xl:bg-purple-100 h-screen flex items-center justify-center p-5">
        //     <div className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-4">
        //         <input type="text" name="" id="" />
        //         <button className="w-full h-10 bg-black text-white rounded-full">Submit</button>
        //     </div>
        // </main>

        <div className="flex flex-col items-center justify-between min-h-screen p-6">
            <div className="my-auto flex flex-col items-center gap-2 *:font-medium">
                <span className="text-9xl">🥕</span>
                <h1 className="text-4xl">당근</h1>
                <h2 className="text-2xl">당근 마켓 환영합니다!</h2>
            </div>
            <div className="flex flex-col items-center gap-3 w-full">
                <Link href="/create-account" className="primary-btn py-2.5 text-lg">
                    시작하기
                </Link>
                <div className="flex gap-2">
                    <span>이미 계정이 있나요?</span>
                    <Link href="/login" className="hover:underline">
                        로그인
                    </Link>
                </div>
            </div>
        </div>
    );
}

// odd:bg-gray-100 even:bg-cyan-100 p-2.5 rounded-xl
