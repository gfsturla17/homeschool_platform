export class TeacherAPIService {
    registerTeacher(teacherSignUpDTO) {
        return fetch('http://127.0.0.1:3000/teachers/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(teacherSignUpDTO)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }
}
