import express from 'express';
import Mongodb from '../database/intex';
import { HttpStatus } from './error_resp';
import { VariableScopeDefinition } from 'postman-collection';

var router = express.Router();

router.get('/', (req: any, res: any, next: (v: any) => void) => {
    Mongodb.collection<VariableScopeDefinition>('environment').insertOne({
        name: "本地环境",
        values: [{ key: "host", value: "http://localhost:8080/jrdongcha", disabled: true }],
    })
    res.sendStatus(HttpStatus.OK);
});

export default router;
