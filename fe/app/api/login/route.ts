import { Cookie } from "@/app/models/Cookie";
import { ServiceFactory } from "@/app/services/ServiceFactory";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const username = body.username;
        const password = body.password;

        const userService = await ServiceFactory.getUserService();
        const user = await userService.login(username, password);
        if (!user) {
            console.log("Received:", username, password);
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }
        
        const cookie = new Cookie(user.getUserId());
        
        
        const cookieService = await ServiceFactory.getCookieService();
        await cookieService.save(cookie);
       
        return NextResponse.json({ username, password, cookie}, { status: 200 });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}