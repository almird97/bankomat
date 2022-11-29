import { Body, Controller, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { LoginInfoDto } from "src/dtos/login.info.dto";
import { LoginPinDto } from "src/dtos/login.pin.dto";
import { ApiResponse } from "src/misc/api.response.class";
import { UserService } from "src/services/user.service";
import { Request } from 'express';
import { Clients } from "src/entities/Clients";

@Controller('bank')
export class BankController {

    constructor(
        public userService: UserService) { }

    @Post('login')
    async doLogin(@Body() data: LoginPinDto, @Req() req: Request): Promise<LoginInfoDto | ApiResponse> {
        const user = await this.userService.getByPin(data.pin);

        if (!user) {
            return new Promise(resolve => resolve(new ApiResponse('error', -1, 'GRESKA! | UNIJELI STE POGRESAN PIN KOD!')))
        }
        if (user.aktivan !== 'DA') {
            return new Promise(resolve => resolve(new ApiResponse('error', -2, 'GRESKA! | TAJ RACUN JE BLOKIRAN !!!')))
        }

        const responseObject = new LoginInfoDto(
            user.clientId,
            user.pin,
            user.novac,
            user.aktivan,
        );
        return new Promise(resolve => resolve(responseObject));
    }

    @Get('stanje/:client_id')
    async getStanje(@Param('client_id') client_id: number): Promise<Clients> {
        return new Promise(async (resolve) => {
            let korisnik = await this.userService.getStanje(client_id);
            resolve(korisnik);
        });
    }

    @Patch('novac/:client_id/:kolicina')
    oduzmiNovac(@Param('client_id') client_id: number, @Param('kolicina') kolicina: number) {
        return this.userService.oduzmiNovac(client_id, kolicina);
    }

}