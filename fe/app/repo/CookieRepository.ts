import { Collection, Filter } from "mongodb";
import { User } from "../models/User";
import CryptoJS from "crypto-js";
import { UserDocument } from "../models/UserDocument";
import { CookieDocument } from "../models/CookieDocument";
import { Cookie } from "../models/Cookie";

export class CookieRepository {
    private collection: Collection<CookieDocument>;

    constructor(collection: Collection<CookieDocument>) {
        this.collection = collection;
    }

    /**
     * Get function - Retrieves a user by token.
     */
    public async getCookie(token: string): Promise<CookieDocument | null> {
        return await this.collection.findOne({ "token": token }, { projection: { _id: 0 } });
    }

    public async getAllCookies(): Promise<CookieDocument[]> {
        return await this.collection.find({}, { projection: { _id: 0 } }).toArray();
    }

    /**
     * Save function - Updates an existing user or inserts a new one.
     */
    public async save(cookie: CookieDocument): Promise<boolean> {

        const query: Filter<CookieDocument> = { userId: cookie.userId };
        const update = { $set: Object.assign({}, cookie) };
        const options = { upsert: true };
        const result = await this.collection.updateOne(query, update, options);
        return result.acknowledged;
    }
}