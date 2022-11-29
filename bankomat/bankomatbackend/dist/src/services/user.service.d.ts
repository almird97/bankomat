import { Clients } from "src/entities/Clients";
import { Repository } from "typeorm";
export declare class UserService {
    private readonly user;
    constructor(user: Repository<Clients>);
    getByPin(pin: string): Promise<Clients>;
    getStanje(client_id: number): Promise<Clients>;
    oduzmiNovac(client_id: number, kolicina: number): Promise<unknown>;
}
