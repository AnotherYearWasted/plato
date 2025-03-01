import { ObjectId } from "mongodb";
import { UserService } from "../services/UserService";
import { UserServiceImpl } from "../services/UserServiceImpl";
import { UserDocument } from "./UserDocument";
import { ServiceFactory } from "../services/ServiceFactory";

export class User{

    private userService: UserService;
    private userId: string;
    private username: string;
    private password: string;
    private email: string;
    private createdAt: Date;

    constructor(username: string, password: string, email: string, createdAt: Date, userId?: string) {
        if (!userId){
            this.userId = new ObjectId().toHexString();
        }
        else this.userId = userId;
        this.userService = ServiceFactory.getUserService();
        this.username = username;
        this.password = password;
        this.email = email;
        this.createdAt = createdAt;
    }


    public getUserId(): string {
        return this.userId;
    }

    public getUsername(): string {
        return this.username;
    }

    public getPassword(): string {
        return this.password;
    }

    public getEmail(): string {
        return this.email;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public setUserName(username: string) {
        this.username = username;
    }

    public setPassword(password: string) {
        this.password = password;
    }

    public setEmail(email: string) {
        this.email = email;
    }

    public setCreatedAt(createdAt: Date) {
        this.createdAt = createdAt;
    }

    public async save() {
        this.userService.save(this);
    }

}