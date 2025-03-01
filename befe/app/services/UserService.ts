import { User } from "../models/User";

export interface UserService {
    login(username: string, password: string): Promise<boolean>;

    register(username: string, password: string, email: string): Promise<boolean>;

    save(user: User): Promise<boolean>;   
}