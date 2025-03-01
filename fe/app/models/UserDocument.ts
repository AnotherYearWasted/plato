import { ObjectId } from "mongodb";

export interface UserDocument{
    _id?: ObjectId;
    userId: string;
    username: string;
    password: string;
    email: string;
    createdAt: Date;
}