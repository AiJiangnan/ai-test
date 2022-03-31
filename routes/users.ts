import express, { response } from 'express';
import newman from 'newman';
import { Collection } from 'postman-collection';
import * as test from '../test_collection.json';

var router = express.Router();

router.get('/', (req: any, res: any, next: (v: any) => void) => {
  var collection = new Collection(test);
  newman.run({ collection },
    (err) => {
      if (err) { throw err; }
      console.log('collection run complete!');
    }).on('request', (err, summary) => {
      console.log(response.header)
      console.log('\n')
      console.log(summary.response.stream.toString())
      console.log('\n')
    })
  res.send('respond with a resource');
});

export default router;
