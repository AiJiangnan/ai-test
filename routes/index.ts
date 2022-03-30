import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', function (req: any, res: any, next: (v: any) => void) {
  res.render('index', { title: 'Express' });
});

export default router;
