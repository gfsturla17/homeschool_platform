import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

const defaultMulterOptions = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|PNG|gif|pdf|txt|mp4|webm|ogg)$/)) {
      return cb(new Error('Only image, video, pdf, and text files are allowed!'), false);
    }
    cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 10, // 10 MB
  },
};

export function FileUpload() {
  return applyDecorators(
    UseInterceptors(FileInterceptor('file', defaultMulterOptions))
  );
}
