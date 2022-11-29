"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_configuration_1 = require("../config/database.configuration");
const bank_controller_1 = require("./controllers/bank.controller");
const Clients_1 = require("./entities/Clients");
const Status_1 = require("./entities/Status");
const user_service_1 = require("./services/user.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: database_configuration_1.DatabaseConfiguration.hostname,
                port: 15406,
                username: database_configuration_1.DatabaseConfiguration.username,
                password: database_configuration_1.DatabaseConfiguration.password,
                database: database_configuration_1.DatabaseConfiguration.database,
                entities: [
                    Clients_1.Clients,
                    Status_1.Status
                ]
            }),
            typeorm_1.TypeOrmModule.forFeature([
                Clients_1.Clients,
                Status_1.Status
            ]),
        ],
        controllers: [
            bank_controller_1.BankController
        ],
        providers: [
            user_service_1.UserService,
        ],
        exports: [
            user_service_1.UserService,
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map