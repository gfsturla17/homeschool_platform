import axios from 'axios';

interface UserRegistration {
    username: string;
    password: string;
    confirmPassword: string;
    birthdate: string;
    email: string;
}

class UserService {
    private apiUrl = 'http://localhost:3000/users'; // update to use users endpoint

    async registerUser(userRegistration: UserRegistration): Promise<void> {
        try {
            const response = await axios.post(`${this.apiUrl}/register`, userRegistration);
            console.log(response.data);
        } catch (error: any) {
            if (error.response.status === 400) {
                throw new Error(error.response.data);
            } else {
                console.error(error);
                throw new Error('Error registering user');
            }
        }
    }

    async completeProfile(userProfile: any): Promise<void> {
        try {
            const response = await axios.post(`${this.apiUrl}/complete-profile`, userProfile);
            console.log(response.data);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default UserService;