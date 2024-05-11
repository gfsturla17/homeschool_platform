"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class UserService {
    constructor(db) {
        this.db = db;
    }
    registerUser(userRegistration) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db.query(`INSERT INTO users_login (username, email, password, birthdate) VALUES ($1, $2, $3, $4)`, [userRegistration.username, userRegistration.email, userRegistration.password, userRegistration.birthdate]);
            }
            catch (error) {
                if (error.code === '23505') {
                    // This is the error code for unique constraint violation in PostgreSQL.
                    // You can check the constraint name to determine which field caused the error.
                    if (error.constraint === 'users_login_pkey') {
                        throw new Error('Username already exists');
                    }
                    else if (error.constraint === 'users_login_email_key') {
                        throw new Error('Email already exists');
                    }
                }
                throw error;
            }
        });
    }
}
exports.default = UserService;
