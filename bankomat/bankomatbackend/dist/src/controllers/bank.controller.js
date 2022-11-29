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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankController = void 0;
const common_1 = require("@nestjs/common");
const login_info_dto_1 = require("../dtos/login.info.dto");
const login_pin_dto_1 = require("../dtos/login.pin.dto");
const api_response_class_1 = require("../misc/api.response.class");
const user_service_1 = require("../services/user.service");
let BankController = class BankController {
    constructor(userService) {
        this.userService = userService;
    }
    async doLogin(data, req) {
        const user = await this.userService.getByPin(data.pin);
        if (!user) {
            return new Promise(resolve => resolve(new api_response_class_1.ApiResponse('error', -1, 'GRESKA! | UNIJELI STE POGRESAN PIN KOD!')));
        }
        if (user.aktivan !== 'DA') {
            return new Promise(resolve => resolve(new api_response_class_1.ApiResponse('error', -2, 'GRESKA! | TAJ RACUN JE BLOKIRAN !!!')));
        }
        const responseObject = new login_info_dto_1.LoginInfoDto(user.clientId, user.pin, user.novac, user.aktivan);
        return new Promise(resolve => resolve(responseObject));
    }
    async getStanje(client_id) {
        return new Promise(async (resolve) => {
            let korisnik = await this.userService.getStanje(client_id);
            resolve(korisnik);
        });
    }
    oduzmiNovac(client_id, kolicina) {
        return this.userService.oduzmiNovac(client_id, kolicina);
    }
};
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_pin_dto_1.LoginPinDto, Object]),
    __metadata("design:returntype", Promise)
], BankController.prototype, "doLogin", null);
__decorate([
    (0, common_1.Get)('stanje/:client_id'),
    __param(0, (0, common_1.Param)('client_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BankController.prototype, "getStanje", null);
__decorate([
    (0, common_1.Patch)('novac/:client_id/:kolicina'),
    __param(0, (0, common_1.Param)('client_id')),
    __param(1, (0, common_1.Param)('kolicina')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], BankController.prototype, "oduzmiNovac", null);
BankController = __decorate([
    (0, common_1.Controller)('bank'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], BankController);
exports.BankController = BankController;
//# sourceMappingURL=bank.controller.js.map