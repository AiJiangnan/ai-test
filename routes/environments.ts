import express from 'express';
import { ObjectId } from 'mongodb';
import { VariableScopeDefinition as Environment } from 'postman-collection';
import Mongodb from '../database/intex';
import { R } from '../model/amis';

var router = express.Router();

const collection = () => Mongodb.collection<Environment>('environment');

router.route('/')
    .get((req: any, res: any, next: (v: any) => void) => {
        const { id, name } = req.query
        if (id) {
            collection().findOne({ _id: new ObjectId(id) })
                .then(data => res.json(R.ok(data)))
        } else {
            collection().find({}).toArray()
                .then(data => res.json(R.ok(data)))
        }
    })
    .post((req: any, res: any, next: (v: any) => void) => {
        const { _id, name, values } = req.body;
        if (_id) {
            collection().updateOne({ _id: new ObjectId(_id) }, { $set: { name, values } });
        } else {
            collection().insertOne(req.body);
        }
        res.json(R.ok());
    });

export default router;
