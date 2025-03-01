import { MongoClient, Db, Collection, Filter, OptionalId } from 'mongodb';
import { User } from '../models/User';
import { ServiceFactory } from '../services/ServiceFactory';

export default class Database {
    private static client: MongoClient;
    private static db: Db;
    public static initialized = false;

    static async connect() {
        console.log(process.env)
        const url = process.env.DRIVER + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_HOST + "/?retryWrites=" + process.env.RETRY_WRITES + "&w=" + process.env.W + "&appName=" + process.env.APP_NAME;
        Database.client = new MongoClient(url);

        try {
            // Connect the client to the server
            await Database.client.connect();
            console.log("Connected successfully to server");

            // Get the database for the app
            Database.db = await Database.client.db(process.env.DB_NAMES);
            console.log("Successfully connected to database: ", process.env.DB_NAMES);

        } catch (error) {
            console.error("Could not connect to MongoDB: ", error);
        }
    }


    static async getCollection<T>(collectionName: string): Promise<Collection<T>> {
        if (!Database.db) {
            try{
                await Database.connect();
            }
            catch(e){
                console.log("Error getting collection: ", e);
            }
        }
        const collection: Collection<T> = Database.db.collection(collectionName);
        return collection;
    }

    static async init() {
        try {
            await Database.connect();
            this.initialized = true;
        }
        catch (e) {
            console.log("Error initializing database: ", e);
        }
    }

    static async disconnect() {
        await Database.client.close();
        console.log("Disconnected from MongoDB");
    }
}