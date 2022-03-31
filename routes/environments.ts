import express from 'express';
import { VariableScopeDefinition as Environment } from 'postman-collection';
import Mongodb from '../database/intex';
import { HttpStatus } from './error_resp';

var router = express.Router();

router.get('/', (req: any, res: any, next: (v: any) => void) => {
    Mongodb.collection<Environment>('environment').insertOne({
        name: "本地环境",
        values: [{ key: "host", value: "http://localhost:8080/jrdongcha", disabled: true }],
    })
    res.sendStatus(HttpStatus.OK);
});

export default router;
