"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTeacherProfileRequestDTO = void 0;
const class_validator_1 = require("class-validator");
class UpdateTeacherProfileRequestDTO {
    constructor() {
        this.firstName = '';
        this.lastName = '';
        this.phone = '';
        this.address = '';
        this.city = '';
        this.state = '';
        this.biography = '';
        this.tiktokLink = '';
        this.twitterLink = '';
        this.facebookLink = '';
        this.instagramLink = '';
    }
}
exports.UpdateTeacherProfileRequestDTO = UpdateTeacherProfileRequestDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTeacherProfileRequestDTO.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTeacherProfileRequestDTO.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTeacherProfileRequestDTO.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTeacherProfileRequestDTO.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTeacherProfileRequestDTO.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTeacherProfileRequestDTO.prototype, "state", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTeacherProfileRequestDTO.prototype, "biography", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTeacherProfileRequestDTO.prototype, "tiktokLink", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTeacherProfileRequestDTO.prototype, "twitterLink", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTeacherProfileRequestDTO.prototype, "facebookLink", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTeacherProfileRequestDTO.prototype, "instagramLink", void 0);
