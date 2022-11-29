import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Clients } from "src/entities/Clients";
import { ApiResponse } from "src/misc/api.response.class";
import { Repository } from "typeorm";

@Injectable()
export class UserService {

    constructor(@InjectRepository(Clients) private readonly user: Repository<Clients>) { }

    async getByPin(pin: string): Promise<Clients> {
        const user = await this.user.findOne({
            pin: pin
        });
        if (pin) {
            return user;
        }
        return null
    }

    async getStanje(client_id: number): Promise<Clients> {
        const user = await this.user.findOne({
            clientId: client_id
        });
        if (client_id) {
            let korisnik: any;
            korisnik = user.novac;
            return korisnik;
        }
        return;
    }

    async oduzmiNovac(client_id: number, kolicina: number) {
        const korisnik = await this.user.findOne({
            clientId: client_id
        });
        if (kolicina < 10 || kolicina > 10000) {
            return new Promise(resolve => resolve(new ApiResponse('error', -5, 'GRESKA! | IZNOS MORA BITI OD 10 DO 1.000 KM')))
        }
        if (korisnik.novac < kolicina) {
            return new Promise(resolve => resolve(new ApiResponse('error', -6, 'GRESKA | NEMATE TOLIKO NOVCA NA RACUNU!')))
        }
        korisnik.novac -= kolicina;
        return this.user.save(korisnik);
    }

}