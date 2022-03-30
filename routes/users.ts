import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function (req: any, res: any, next: (v: any) => void) {
  res.send('respond with a resource');
});

export default router;
