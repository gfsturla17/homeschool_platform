import express, { Request, Response, Router } from 'express';
import FileUploadDTO from '../dto/FileUploadDTO'
import multer from "multer";
import {TeacherSignUpDTO} from "../dto/TeacherSignUpDTO";
import cors from "cors";
import TeacherService from "../service/teacher-service";
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

const teacherService = new TeacherService();
router.post('/signup', cors(), (req, res) => {
  const { firstName, lastName, email, phoneNumber, address, city, state, zipCode, password, confirmPassword } = req.body;
  const teacherSignUpDTO = new TeacherSignUpDTO(firstName, lastName, email, phoneNumber, address, city, state, zipCode, password, confirmPassword);
  teacherService.register(teacherSignUpDTO);
  res.json({
    message: 'Teacher sign up request received',
    userData: {
      firstName,
      lastName
    }
  });
});


router.get('/lesson-plans', (req, res) => {
  const lessonPlans = ['Lesson Plan 1', 'Lesson Plan 2', 'Lesson Plan 3'];
  res.json({ lessonPlans });
});

// POST endpoint for adding new lesson plans
router.post('/lesson-plans', (req, res) => {
  const fileUploadDTO: FileUploadDTO = req.body;
  console.log({ lessonPlan: fileUploadDTO });
  console.log(req.body);

  res.json({ lessonPlan: fileUploadDTO.lessonPlan });
});


export default router;

