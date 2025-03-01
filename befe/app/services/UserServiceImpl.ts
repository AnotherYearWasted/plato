import { User } from "../models/User";
import { UserRepository } from "../repo/UserRepository";
import { UserService } from "./UserService";

export class UserServiceImpl implements UserService {
    
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async login(username: string, password: string): Promise<boolean> {
        return this.userRepository.login(username, password);
    }

    public async register(username: string, password: string, email: string): Promise<boolean> {
        return this.userRepository.register(username, password, email);
    }
    
    public async save(user: User): Promise<boolean> {
        return this.userRepository.save(user);
    }
}