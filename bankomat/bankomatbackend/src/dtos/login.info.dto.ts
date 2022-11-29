export class LoginInfoDto {
    clientId: number;
    pin: string;
    novac: number;
    aktivan: string;

    constructor(clientId: number, pin: string, novac: number, aktivan: string) {
        this.clientId = clientId;
        this.pin = pin;
        this.novac = novac;
        this.aktivan = aktivan;
    }
}