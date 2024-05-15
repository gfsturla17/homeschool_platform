import {TeacherSignUpDTO} from "../dto/TeacherSignUpDTO";


class TeacherService {
    register(teacherSignUpDTO: TeacherSignUpDTO): void {
        console.log(teacherSignUpDTO)
    }
}

export default TeacherService;