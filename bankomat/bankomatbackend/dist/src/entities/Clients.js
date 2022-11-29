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
exports.Clients = void 0;
const typeorm_1 = require("typeorm");
let Clients = class Clients {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "int", name: "client_id", unsigned: true }),
    __metadata("design:type", Number)
], Clients.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "pin",
        unique: true,
        length: 50,
        default: () => "'1234'",
    }),
    __metadata("design:type", String)
], Clients.prototype, "pin", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "novac", default: () => "'0'" }),
    __metadata("design:type", Number)
], Clients.prototype, "novac", void 0);
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: "aktivan",
        enum: ["DA", "NE"],
        default: () => "'DA'",
    }),
    __metadata("design:type", String)
], Clients.prototype, "aktivan", void 0);
Clients = __decorate([
    (0, typeorm_1.Index)("pin", ["pin"], { unique: true }),
    (0, typeorm_1.Entity)("clients", { schema: "bankomat" })
], Clients);
exports.Clients = Clients;
//# sourceMappingURL=Clients.js.map