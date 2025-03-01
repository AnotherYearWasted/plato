import { createHmac } from "crypto";
import { ServiceFactory } from "../services/ServiceFactory";
import { CookieService } from "../services/CookieService";

export class Cookie {

    private cookieService: CookieService;
    timestamp: Date;
    userId: string;
    token: string;
    dateExpired: Date;

    constructor(userId: string){
        this.cookieService = ServiceFactory.getCookieService();
        this.userId = userId;
        this.token = createHmac('sha256', process.env.APP_SECRET).update(userId + new Date().toString()).digest('hex');
        this.dateExpired = new Date(Date.now() + 900000);
        this.timestamp = new Date();
    }

    async save(){
        this.cookieService.save(this);
    }
}