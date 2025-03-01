import { User } from "../models/User";
import { UserDocument } from "../models/UserDocument";

export interface UserService {
    login(username: string, password: string): Promise<User | null>;

    register(username: string, password: string, email: string): Promise<User | null>;

    getUserByUserId(userId: string): Promise<User | null>;

    fromDocument(userDocument: UserDocument): User;

    save(user: User): Promise<boolean>;
}