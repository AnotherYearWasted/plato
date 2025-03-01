import { Cookie } from "next/font/google";
import { User } from "../models/User";
import Database from "../repo/Database";
import { UserRepository } from "../repo/UserRepository";
import { CookieService } from "./CookieService";
import { UserService } from "./UserService";
import { UserServiceImpl } from "./UserServiceImpl";
import { CookieRepository } from "../repo/CookieRepository";
import { CookieServiceImpl } from "./CookieServiceImpl";

export class ServiceFactory {

    public static initialized: boolean = false;
    private static userService: UserService;
    private static cookieService: CookieService;
    
    public static getUserService(): UserService {
        return ServiceFactory.userService;
    }

    public static getCookieService(): CookieService {
        return ServiceFactory.cookieService;
    }

    public static async Init() {
        ServiceFactory.userService = new UserServiceImpl(new UserRepository(await Database.getCollection("users")));
        ServiceFactory.cookieService = new CookieServiceImpl(new CookieRepository(await Database.getCollection("cookies")));
    }

}