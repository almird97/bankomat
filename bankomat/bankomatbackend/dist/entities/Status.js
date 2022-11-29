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
exports.Status = void 0;
const typeorm_1 = require("typeorm");
let Status = class Status {
};
__decorate([
    (0, typeorm_1.Column)("enum", {
        name: "aktivan",
        enum: ["DA", "NE"],
        default: () => "'DA'",
    }),
    __metadata("design:type", String)
], Status.prototype, "aktivan", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "novac", default: () => "'0'" }),
    __metadata("design:type", Number)
], Status.prototype, "novac", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "brojisplata", default: () => "'0'" }),
    __metadata("design:type", Number)
], Status.prototype, "brojisplata", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", {
        name: "password",
        nullable: true,
        length: 50,
        default: () => "'0123456789'",
    }),
    __metadata("design:type", String)
], Status.prototype, "password", void 0);
Status = __decorate([
    (0, typeorm_1.Entity)("status", { schema: "bankomat" })
], Status);
exports.Status = Status;
//# sourceMappingURL=Status.js.map