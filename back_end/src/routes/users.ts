import express, { Request, Response, Router } from 'express';
import Database from "../service/database";
import UserService from "../service/userService";
const router: Router = express.Router();


router.get('/', (req: Request, res: Response, next: any) => {
  res.render('index', { title: 'Express' });
});

const db = new Database();

const userService = new UserService(db);

router.post('/register', async (req, res) => {
  const userRegistration = req.body;
  try {
    const user = await userService.registerUser(userRegistration);
    res.send(`User registered successfully!`);
  } catch (error: any) {
    console.error(error);
    if (error.message === 'Username already exists') {
      res.status(400).send(`Username already exists`);
    } else if (error.message === 'Email already exists') {
      res.status(400).send(`Email already exists`);
    } else {
      res.status(500).send(`Error registering user`);
    }
  }
});

export default router;

