import { Collection } from "mongodb";
import { User } from "../models/User";
import CryptoJS from "crypto-js";

export class UserRepository {
    private collection: Collection<User>;

    constructor(collection: Collection<User>) {
        this.collection = collection;
    }

    /**
     * Login function - Checks if the username and password match an existing user.
     */
    public async login(username: string, password: string): Promise<boolean> {
        
        // Find the user by username
        let user = await this.collection.findOne({ "username": username }, { projection: { _id: 0 } });

        // Check if the user exists
        if (!user) {
            console.log("User not found");
            return false;
        }

        const hashedPassword = CryptoJS.SHA256(password).toString();
        // Check if the password matches
        if (user.getPassword() !== hashedPassword) {
            console.log("Password is incorrect");
            return false;
        }
        return true;
    }

    /**
     * Register function - Creates a new user with a hashed password.
     */
    public async register(username: string, password: string, email: string): Promise<boolean> {
        // Check if username already exists
        const existingUser = await this.collection.findOne({ username });
        if (existingUser) {
            console.log("Username already exists");
            return false;
        }

        // Hash the password
        const hashedPassword = CryptoJS.SHA256(password).toString();

        // Insert new user
        const newUser = new User(username, hashedPassword, email, new Date());

        const result = await this.collection.insertOne(newUser);
        return result.acknowledged;
    }

    /**
     * Save function - Updates an existing user or inserts a new one.
     */
    public async save(user: User): Promise<boolean> {
        
        // Check if the user already exists
        const existingUser = await this.collection.findOne({ username: user.getUsername() });
        if (!existingUser) {
            console.log("User does not exist");
            return false;
        }

        // Update the user
        const result = await this.collection.updateOne({ username: user.getUsername() }, { $set: user });
        return result.acknowledged;
    }
}