import Database from "@/app/repo/Database";
import { ServiceFactory } from "@/app/services/ServiceFactory";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {

    if (!Database.initialized) {
        await Database.init();
    }
    if (!ServiceFactory.initialized) {
        await ServiceFactory.init();
        console.log("Service Factory initialized");
    }
    return NextResponse.json({ message: "Hello World" });
}