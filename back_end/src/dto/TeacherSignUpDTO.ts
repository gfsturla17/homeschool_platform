export class TeacherSignUpDTO {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    password: string;
    confirmPassword: string

    constructor(firstName, lastName, email, phoneNumber, address, city, state, zipCode, password, confirmPassword) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}