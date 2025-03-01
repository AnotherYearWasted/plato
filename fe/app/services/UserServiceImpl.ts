import { User } from "../models/User";
import { UserDocument } from "../models/UserDocument";
import { UserRepository } from "../repo/UserRepository";
import { UserService } from "./UserService";

export class UserServiceImpl implements UserService {

    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async login(username: string, password: string): Promise<User | null> {
        const userDocument: UserDocument | null = await this.userRepository.login(username, password);
        if (!userDocument) {
            return null;
        }
        return this.fromDocument(userDocument);
    }

    public async register(username: string, password: string, email: string): Promise<User | null> {
        return this.userRepository.register(username, password, email);
    }

    public async getUserByUserId(userId: string): Promise<User | null> {
        const userDocument: UserDocument | null = await this.userRepository.getUserByUserId(userId);
        if (!userDocument) {
            return null;
        }
        return this.fromDocument(userDocument);
    }

    public fromDocument(userDocument: UserDocument): User {
        console.log(userDocument);
        return new User(userDocument.username, userDocument.password, userDocument.email, userDocument.createdAt, userDocument.userId);
    }

    public toDocument(user: User): UserDocument {
        return {
            userId: user.getUserId(),
            username: user.getUsername(),
            password: user.getPassword(),
            email: user.getEmail(),
            createdAt: user.getCreatedAt()
        };
    }

    public async save(user: User): Promise<boolean> {
        return this.userRepository.save(this.toDocument(user));
    }
}