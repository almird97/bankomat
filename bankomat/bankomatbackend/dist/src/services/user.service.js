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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Clients_1 = require("../entities/Clients");
const api_response_class_1 = require("../misc/api.response.class");
const typeorm_2 = require("typeorm");
let UserService = class UserService {
    constructor(user) {
        this.user = user;
    }
    async getByPin(pin) {
        const user = await this.user.findOne({
            pin: pin
        });
        if (pin) {
            return user;
        }
        return null;
    }
    async getStanje(client_id) {
        const user = await this.user.findOne({
            clientId: client_id
        });
        if (client_id) {
            let korisnik;
            korisnik = user.novac;
            return korisnik;
        }
        return;
    }
    async oduzmiNovac(client_id, kolicina) {
        const korisnik = await this.user.findOne({
            clientId: client_id
        });
        if (kolicina < 10 || kolicina > 10000) {
            return new Promise(resolve => resolve(new api_response_class_1.ApiResponse('error', -5, 'GRESKA! | IZNOS MORA BITI OD 10 DO 1.000 KM')));
        }
        if (korisnik.novac < kolicina) {
            return new Promise(resolve => resolve(new api_response_class_1.ApiResponse('error', -6, 'GRESKA | NEMATE TOLIKO NOVCA NA RACUNU!')));
        }
        korisnik.novac -= kolicina;
        return this.user.save(korisnik);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Clients_1.Clients)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map