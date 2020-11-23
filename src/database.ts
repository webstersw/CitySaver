import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'
import config from './config';

class DataBase {
    private instance: JsonDB;
    public getInstance(): JsonDB {
        return this.instance;
    }
    constructor()
    {
        this.instance = new JsonDB(new Config(config.dbfile, true, false, '/'));
    }
}

const db = new DataBase();

export default db;