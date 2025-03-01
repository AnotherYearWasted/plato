import { Cookie } from "../models/Cookie";
import { CookieDocument } from "../models/CookieDocument";
import { User } from "../models/User";
import { UserDocument } from "../models/UserDocument";
import { CookieRepository } from "../repo/CookieRepository";
import { UserRepository } from "../repo/UserRepository";
import { CookieService } from "./CookieService";

export class CookieServiceImpl implements CookieService {

    private cookieRepository: CookieRepository;

    constructor(cookieRepository: CookieRepository) {
        this.cookieRepository = cookieRepository;
    }

    public fromDocument(cookieDocument: CookieDocument): Cookie {
        const cookie = new Cookie(cookieDocument.userId);
        cookie.token = cookieDocument.token;
        cookie.dateExpired = cookieDocument.dateExpired;
        cookie.timestamp = cookieDocument.timestamp;
        return cookie;
    }

    public toDocument(cookie: Cookie): CookieDocument {
        return {
            userId: cookie.userId,
            token: cookie.token,
            dateExpired: cookie.dateExpired,
            timestamp: cookie.timestamp
        };
    }

    public async getCookie(token: string): Promise<Cookie | null> {
        const cookieDocument = await this.cookieRepository.getCookie(token);
        if (!cookieDocument) {
            return null;
        }
        console.log(cookieDocument);
        return this.fromDocument(cookieDocument);
    }

    public async save(cookie: Cookie): Promise<boolean> {
        return this.cookieRepository.save(this.toDocument(cookie));
    }
}