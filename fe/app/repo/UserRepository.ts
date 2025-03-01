import { Collection, Filter } from "mongodb";
import { User } from "../models/User";
import CryptoJS from "crypto-js";
import { UserDocument } from "../models/UserDocument";

export class UserRepository {
    private collection: Collection<UserDocument>;

    constructor(collection: Collection<UserDocument>) {
        this.collection = collection;
    }

    /**
     * Login function - Checks if the username and password match an existing user.
     */
    public async login(username: string, password: string): Promise<UserDocument | null> {
        
        // Find the user by username
        let user = await this.collection.findOne({ "username": username }, { projection: { _id: 0 } });

        // Check if the user exists
        if (!user) {
            console.log("User not found");
            return null;
        }

        const hashedPassword = CryptoJS.SHA256(password).toString();
        // Check if the password matches
        if (user.password !== hashedPassword) {
            console.log("Password is incorrect");
            return null;
        }
        const { _id, ...userWithoutId } = user;
        return userWithoutId as UserDocument;
    }

    /**
     * Register function - Creates a new user with a hashed password.
     */
    public async register(username: string, password: string, email: string): Promise<User | null> {
        // Check if username already exists
        const existingUser = await this.collection.findOne({ username });
        if (existingUser) {
            console.log("Username already exists");
            return null;
        }

        // Check if email already exists
        const existingEmail = await this.collection.findOne({ email });
        if (existingEmail) {
            console.log("Email already exists");
            return null;
        }

        // Hash the password
        const hashedPassword = CryptoJS.SHA256(password).toString();

        // Insert new user
        const newUser = new User(username, hashedPassword, email, new Date());

        const result = await this.collection.insertOne({
            userId: newUser.getUserId(),
            username: newUser.getUsername(),
            password: newUser.getPassword(),
            email: newUser.getEmail(),
            createdAt: newUser.getCreatedAt()
        });
        if (!result.acknowledged) {
            console.log("Failed to insert user");
            return null;
        }
        return newUser;
    }

    /**
     * Save function - Updates an existing user or inserts a new one.
     */
    public async save(user: UserDocument): Promise<boolean> {
        
        // Check if the user already exists
        const existingUser = await this.collection.findOne({ username: user.username });
        if (!existingUser) {
            console.log("User does not exist");
            return false;
        }

        const query: Filter<UserDocument> = { username: user.username };
        const update = { $set: user };
        const options = { upsert: true };

        // Update the user
        const result = await this.collection.updateOne(query, update, options);
        return result.acknowledged;
    }
}