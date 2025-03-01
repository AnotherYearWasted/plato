import { Cookie } from "../models/Cookie";
import { CookieDocument } from "../models/CookieDocument";
import { User } from "../models/User";
import { UserDocument } from "../models/UserDocument";

export interface CookieService {

    fromDocument(cookieDocument: CookieDocument): Cookie;

    toDocument(cookie: Cookie): CookieDocument; 

    getCookie(token: string): Promise<Cookie | null>;

    save(cookie: Cookie): Promise<boolean>;
}