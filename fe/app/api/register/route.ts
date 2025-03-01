import { ServiceFactory } from "@/app/services/ServiceFactory";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const username = body.username;
        const password = body.password;
        const email = body.email;

        const userService = await ServiceFactory.getUserService();
        const user = await userService.register(username, password, password);

        if (!user) {
            console.log("Received:", username, password, email);
            return NextResponse.json({ status: "error", message: "Invalid credentials" }, { status: 401 });
        }

        return NextResponse.json({
            status: "success",
            user: {
                username: user.getUsername(),
                email: user.getEmail()
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ status: "error", message: "Error" }, { status: 400 });
    }
}