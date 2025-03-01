import { MongoClient, Db, Collection, Filter, OptionalId } from 'mongodb';

export default class Database {
    private static client: MongoClient;
    private static db: Db;

    static async connect() {
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


    static async getCollection(collectionName: string): Promise<Collection> {
        return Database.db.collection(collectionName);
    }

    static async init() {
        try {
            await Database.connect();
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