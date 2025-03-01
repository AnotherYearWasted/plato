import { ObjectId } from "mongodb";
import { UserService } from "../services/UserService";
import { UserServiceImpl } from "../services/UserServiceImpl";

export class User {

    private static userService: UserService;
    private userId: ObjectId | undefined;
    private username: string;
    private password: string;
    private email: string;
    private createdAt: Date;

    constructor(username: string, password: string, email: string, createdAt: Date, userId?: ObjectId) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.email = email;
        this.createdAt = createdAt;
    }

    public getUserId(): ObjectId | undefined {
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
        User.userService.save(this);
    }
}