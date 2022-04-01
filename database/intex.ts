import { Collection, Db, MongoClient } from 'mongodb';

var client: MongoClient = new MongoClient('mongodb://root:root@127.0.0.1:27017');

var db: Db;

client.connect().then(() => {
    console.log('Connected successfully to mongodb server');
    db = client.db('aitest');
});

class Mongodb {

    public static collection<T>(name: string): Collection<T> {
        return db.collection<T>(name);
    }
}

export default Mongodb;