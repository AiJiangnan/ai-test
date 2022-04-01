import express from 'express';
import { ObjectId } from 'mongodb';
import { VariableScopeDefinition as Environment } from 'postman-collection';
import Mongodb from '../database/intex';
import { HttpStatus } from './error_resp';

var router = express.Router();

const collection = () => Mongodb.collection<Environment>('environment');

router.route('/')
    .get((req: any, res: any, next: (v: any) => void) => {
        collection().find({}).toArray()
            .then(data => res.json(data))
    })
    .post((req: any, res: any, next: (v: any) => void) => {
        const { id, name, values } = req.body as Environment;
        if (id) {
            collection().updateOne({ _id: new ObjectId(id) }, { $set: { name, values } });
        } else {
            collection().insertOne(req.body);
        }
        res.sendStatus(HttpStatus.OK);
    });

export default router;
