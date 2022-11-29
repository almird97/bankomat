import { LoginInfoDto } from "src/dtos/login.info.dto";
import { LoginPinDto } from "src/dtos/login.pin.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { UserService } from "src/services/user.service";
import { Request } from 'express';
import { Clients } from "src/entities/Clients";
export declare class BankController {
    userService: UserService;
    constructor(userService: UserService);
    doLogin(data: LoginPinDto, req: Request): Promise<LoginInfoDto | ApiResponse>;
    getStanje(client_id: number): Promise<Clients>;
    oduzmiNovac(client_id: number, kolicina: number): Promise<unknown>;
}
