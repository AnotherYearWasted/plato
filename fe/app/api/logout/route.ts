import { NextRequest, NextResponse } from "next/server";

import { ServiceFactory } from "@/app/services/ServiceFactory";

export async function GET(request: NextRequest) {
    const headers = new Headers();

    const bearer = request.headers.get("Authorization");
    if (!bearer) {
        headers.set("WWW-Authenticate", "Bearer");
        return new Response("Unauthorized", { status: 401, headers });
    }

    const token = bearer.split(" ")[1];
    console.log("Token:", token);
    const cookieService = await ServiceFactory.getCookieService();
    const cookie = await cookieService.getCookie(token);
    console.log(cookie);

    if (!cookie) {
        return NextResponse.json({ status: "error", message: "No cookie founded" }, { status: 401 });
    }

    if (cookie.dateExpired < new Date()) {
        return NextResponse.json({ status: "error", message: "Cookie expired" }, { status: 401 });
    }

    cookie.dateExpired = new Date();

    cookieService.save(cookie);

    return NextResponse.json({ status: "success", message: "Logout successfully" }, { status: 200 });
}