import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';


@Injectable()
export class FileTypeMiddleware implements NestMiddleware {
  private multerInstance: any;

  constructor() {
    this.multerInstance = multer({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = './uploads';
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileName = `${uniqueSuffix}-${file.originalname}`;
          cb(null, fileName);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf|txt|mp4|webm|ogg)$/i)) {
          const error: any = new BadRequestException('Only image, video, pdf, and text files are allowed.');
          return callback(error, false);
        }
        callback(null, true);
      }
    }).single('file');
  }

  use(req: Request, res: Response, next: NextFunction) {
    const contentType = req.headers['content-type'];
    if (contentType && contentType.includes('multipart/form-data')) {
      this.multerInstance(req, res, (err) => {
        if (err) {
          if (err instanceof multer.MulterError) {
            return next(new BadRequestException(err.message));
          }
          return next(new BadRequestException(err.message));
        }
        if (!req.file) {
          return next(new BadRequestException('No file received'));
        }
        next();
      });
    } else {
      next();
    }
  }
}

