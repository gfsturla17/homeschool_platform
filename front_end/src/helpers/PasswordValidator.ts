class PasswordValidator {
    private password: string;
    private confirmPassword: string;

    constructor(password: string, confirmPassword: string) {
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

    validate(): string[] {
        const errors: string[] = [];
        if (this.password !== this.confirmPassword) {
            errors.push('Passwords must match');
        }
        if (!this.validatePasswordLength()) {
            errors.push('Password must be at least 8 characters long');
        }
        if (!this.validatePasswordComplexity()) {
            errors.push('Password must contain at least one capital letter, one number, and one special character');
        }
        return errors;
    }

    private validatePasswordLength(): boolean {
        return this.password.length >= 8;
    }

    private validatePasswordComplexity(): boolean {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return regex.test(this.password);
    }
}

export default PasswordValidator;