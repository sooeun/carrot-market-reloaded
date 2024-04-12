import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
    [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
    "/": true,
    "/login": true,
    "/sms": true,
    "/create-account": true,
};

export async function middleware(request: NextRequest) {
    // console.log("hi im middleware : ", request.nextUrl.pathname);
    // console.log(request.cookies.getAll());
    const pathname = request.nextUrl.pathname;
    const session = await getSession();
    const exists = publicOnlyUrls[pathname];
    if (!session.id) {
        if (!exists) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    } else {
        if (exists) {
            return NextResponse.redirect(new URL("/products", request.url));
        }
    }
    // if (pathname === "/") {
    //     const response = NextResponse.next();
    //     response.cookies.set("middleware-cookie", "hello");
    //     return response;
    // }
    // if (pathname === "/profile") {
    // return Response.json({
    //     error: "여기는 들어올 수 없습니다.",
    // });
    // return Response.redirect(new URL("/", request.url));
    // }
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
