import express, { Request, Response, Router } from 'express';
const router: Router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response, next: any) => {
  res.render('index', { title: 'Express' });
});



export default router;
