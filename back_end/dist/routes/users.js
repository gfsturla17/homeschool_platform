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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("../service/database"));
const userService_1 = __importDefault(require("../service/userService"));
const router = express_1.default.Router();
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' });
});
const db = new database_1.default();
const userService = new userService_1.default(db);
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userRegistration = req.body;
    try {
        const user = yield userService.registerUser(userRegistration);
        res.send(`User registered successfully!`);
    }
    catch (error) {
        console.error(error);
        if (error.message === 'Username already exists') {
            res.status(400).send(`Username already exists`);
        }
        else if (error.message === 'Email already exists') {
            res.status(400).send(`Email already exists`);
        }
        else {
            res.status(500).send(`Error registering user`);
        }
    }
}));
exports.default = router;
