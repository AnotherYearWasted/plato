import { ObjectId } from "mongodb";

export interface CookieDocument{
    _id?: ObjectId;
    timestamp: Date;
    userId: string;
    token: string;
    dateExpired: Date;
}