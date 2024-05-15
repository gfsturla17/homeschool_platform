interface FileUploadDTO {
    title: string;
    file: Express.Multer.File;
    lessonPlan: string;
    isPrivate: boolean;
}

export default FileUploadDTO