import express, { Request, Response, Router } from 'express';
import Database from "../service/database";
import UserService from "../service/userService";
import {Pool} from "pg";
import multer from 'multer';
const router: Router = express.Router();

// Set up storage options for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')  // You can adjust the path to where you want to save files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

// POST endpoint for uploading files
router.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  console.log('File:', req.file);
  console.log('Body:', req.body);

  res.send({
    message: 'File uploaded successfully!',
    filename: req.file.filename  // Sending back the name of the saved file
  });
});



router.get('/info', (req: Request, res: Response, next: any) => {
  res.render('index', { title: 'Express' });
});


export default router;

