import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import axios from 'axios';

interface UserState {
    kategorija: string;
    id: number;
    pin: string;
    izgledPina: string;
    info: string;
    novac: number;
    odabraoNovac: string;
}

export default class Pocetna extends React.Component {

    state: UserState;

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            kategorija: 'pocetna',
            id: 0,
            pin: '',
            izgledPina: '----',
            info: 'MOLIMO VAS UNESITE VAS PIN KOD',
            novac: 0,
            odabraoNovac: '0'
        }
    }

    private klBroj(broj: number) {
        ////
        if (this.state.kategorija === 'pocetna') {
            if (this.state.izgledPina === '----') {
                this.state.izgledPina = '';
            }
            if (this.state.pin.length >= 4) {
                this.setState({ info: 'GRESKA! | PIN KOD NE MOZE IMATI VISE OD 4 KARAKTERA!' })
                return;
            }
            this.setState({ izgledPina: this.state.izgledPina + '*' })
            this.setState({ pin: this.state.pin + broj })
        }
        ////
        else if (this.state.kategorija === 'unosiNovac') {
            if (this.state.odabraoNovac === '0') {
                this.state.odabraoNovac = '';
            }

            if (this.state.odabraoNovac.length === 3) {
                var novacString: number = + this.state.odabraoNovac;
                if (novacString != 100) {
                    this.setState({ info: 'GRESKA! | NE MOZETE UPISATI VISE OD 1.000 KM!' })
                    return;
                }
            }
            if (this.state.odabraoNovac.length >= 4) {
                this.setState({ info: 'GRESKA! | NE MOZETE PODICI VISE OD 1.000 KM!' })
                return;
            }
            this.setState({ odabraoNovac: this.state.odabraoNovac + broj })
            this.setState({ info: 'UPISALI STE NOVAC U IZNOSU OD:' })
        }
        ////
    }

    private tipka(tip: string) {
        //////////////////////////////////////////////////////////////////////////////////////////////////
        if (tip === 'potvrdi') {

            if (this.state.kategorija === 'pocetna') {
                if (this.state.pin.length < 4) {
                    this.setState({ info: 'GRESKA! | NISTE UPISALI CIJELI PIN KOD (4 karaktera)!' })
                    return;
                }
                const unesenPin = {
                    "pin": this.state.pin
                };
                axios.post('http://localhost:3000/bank/login', unesenPin)
                    .then(res => {
                        if (res.data.statusCode !== undefined) {
                            let izvjestaj = '';
                            switch (res.data.statusCode) {
                                case -1: izvjestaj = res.data.message; break;
                                case -2: izvjestaj = res.data.message; break;
                            }
                            this.setState({ info: izvjestaj })
                            return;
                        }
                        this.logovan(res.data.clientId, res.data.novac);
                    });
            }

            else if (this.state.kategorija === 'unosiNovac' || this.state.kategorija === 'podizanje') {

                var novacZaPodic: number = + this.state.odabraoNovac;

                if (novacZaPodic <= 0 || novacZaPodic > 1000) {
                    this.setState({ info: 'GRESKA! | IZNOS MORA BITI OD 10 DO 1.000 KM!' })
                    return;
                }
                axios.patch('http://localhost:3000/bank/novac/' + this.state.id + '/' + novacZaPodic)
                    .then(res => {
                        if (res.data.statusCode !== undefined) {
                            let izvjestaj = '';
                            switch (res.data.statusCode) {
                                case -5: izvjestaj = res.data.message; break;
                                case -6: izvjestaj = res.data.message; break;
                            }
                            this.setState({ info: izvjestaj })
                            return;
                        }
                        alert('\n-------------------------------------------------------------------\n\n- USPJESNO STE PODIGLI NOVAC SA BANKOMATA\n\n      * STARO STANJE: ' + (res.data.novac + novacZaPodic) +
                            'KM\n      * NOVO STANJE: ' + res.data.novac + ' KM');
                        window.open('/', "_self");
                    });
            }

        }
        //////////////////////////////////////////////////////////////////////////////////////////////////
        if (tip === 'obrisi') {

            if (this.state.kategorija === 'pocetna') {
                if (this.state.pin.length <= 0) {
                    this.setState({ info: 'GRESKA! | NEMATE UPISAN NI JEDAN BROJ PIN KODA!' })
                    return;
                }
                this.setState({ pin: this.state.pin.slice(0, -1) })
                this.setState({ izgledPina: this.state.izgledPina.slice(0, -1) })

                if (this.state.izgledPina === '----') {
                    this.setState({ izgledPina: '' })
                }
                if (this.state.izgledPina === '*') {
                    this.setState({ izgledPina: '----' })
                }
            }

            else if (this.state.kategorija === 'unosiNovac') {
                if (this.state.odabraoNovac.length <= 0) {
                    this.setState({ info: 'GRESKA! | NISTE UPISALI NOVAC!' })
                    return;
                }
                this.setState({ odabraoNovac: this.state.odabraoNovac.slice(0, -1) })
                if (this.state.odabraoNovac === '0') {
                    this.setState({ odabraoNovac: '' })
                }
                if (this.state.odabraoNovac.length === 1) {
                    this.setState({ odabraoNovac: '0' })
                }
            }

        }
        //////////////////////////////////////////////////////////////////////////////////////////////////
        if (tip === 'izlaz') {
            window.open('/', "_self");
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////
        if (tip === 'stanje') {
            this.setState({ kategorija: 'stanje', info: 'TRENUTNO STANJE NA VASEM RACUNU IZNOSI:' });
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////
        if (tip === 'podizanje') {
            this.setState({ kategorija: 'podizanje', info: 'ODABERITE ILI UNESITE IZNOS KOJI ZELITE PODIGNUTI:' });
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////
        if (tip === 'nazad') {
            if (this.state.pin.length < 4) {
                this.setState({ info: 'GRESKA! | NISTE UPISALI CIJELI PIN KOD (4 karaktera)!' })
                return;
            }
            const unesenPin = {
                "pin": this.state.pin
            };
            axios.post('http://localhost:3000/bank/login', unesenPin)
                .then(res => {
                    if (res.data.statusCode !== undefined) {
                        let izvjestaj = '';
                        switch (res.data.statusCode) {
                            case -1: izvjestaj = res.data.message; break;
                            case -2: izvjestaj = res.data.message; break;
                        }
                        this.setState({ info: izvjestaj })
                        return;
                    }
                    this.logovan(res.data.clientId, res.data.novac);
                });
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////
    }

    private logovan(id: number, novac: number) {
        this.setState({ kategorija: 'logovan', id: id, novac: novac, info: 'ODABERITE OPCIJU KOJU ZELITE UPOTRIJEBITI' });
    }


    private tipkaNovca(onovac: number) {
        if (onovac == 12345) {
            this.setState({ kategorija: 'unosiNovac', onovac: 0, info: 'UNESITE IZNOS KOJI ZELITE PODICI! | (min 50 KM, max 1.000 KM)' });
            return;
        }
        this.setState({ odabraoNovac: onovac });
        this.setState({ info: 'ODABRALI STE ' + onovac + ' KM, DA PODIGNETE IDITE NA -PODIGNI-' })
    }

    render() {
        //////////////////////////////////////////////////////////////////////////////////////////////////
        if (this.state.kategorija === 'pocetna') {
            return (

                <Container>
                    <Card.Body>
                        <div className="polje">

                            <div className="poruka">
                                {this.state.info}
                            </div>
                            <div className="unesenPin">
                                {this.state.izgledPina}
                            </div>

                            <Row>
                                <Col className="tipka" onClick={() => this.klBroj(1)}>
                                    1
                                </Col>
                                <Col className="tipka" onClick={() => this.klBroj(2)}>
                                    2
                                </Col>
                                <Col className="tipka" onClick={() => this.klBroj(3)}>
                                    3
                                </Col>
                            </Row>
                            <Row>
                                <Col className="tipka" onClick={() => this.klBroj(4)}>
                                    4
                                </Col>
                                <Col className="tipka" onClick={() => this.klBroj(5)}>
                                    5
                                </Col>
                                <Col className="tipka" onClick={() => this.klBroj(6)}>
                                    6
                                </Col>
                            </Row>
                            <Row>
                                <Col className="tipka" onClick={() => this.klBroj(7)}>
                                    7
                                </Col>
                                <Col className="tipka" onClick={() => this.klBroj(8)}>
                                    8
                                </Col>
                                <Col className="tipka" onClick={() => this.klBroj(9)}>
                                    9
                                </Col>
                            </Row>
                            <Row>
                                <Col className="tipka2" onClick={() => this.tipka('potvrdi')}>
                                    POTVRDI
                                </Col>
                                <Col className="tipka3" onClick={() => this.tipka('obrisi')}>
                                    OBRISI
                                </Col>
                                <Col className="tipka4" onClick={() => this.tipka('izlaz')}>
                                    IZLAZ
                                </Col>
                            </Row>
                        </div>

                    </Card.Body>

                    <Card.Footer className="footer">copyright © by ITAlm | 2022</Card.Footer>
                </Container >
            );
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////
        else if (this.state.kategorija === 'logovan') {
            return (

                <Container>
                    <Card.Body>
                        <div className="polje">

                            <div className="poruka">
                                {this.state.info}
                            </div>
                            <Row>
                                <Col className="tipka5" onClick={() => this.tipka('stanje')}>
                                    STANJE NA RACUNU
                                </Col>
                            </Row>
                            <Row>
                                <Col className="tipka5" onClick={() => this.tipka('podizanje')}>
                                    PODIZANJE NOVCA
                                </Col>
                            </Row>
                            <Row>
                                <Col className="tipka4" onClick={() => this.tipka('izlaz')}>
                                    IZLAZ
                                </Col>
                            </Row>
                        </div>

                    </Card.Body>

                    <Card.Footer className="footer">copyright © by ITAlm | 2022</Card.Footer>
                </Container >
            );
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////
        else if (this.state.kategorija === 'stanje') {
            return (

                <Container>
                    <Card.Body>
                        <div className="polje">

                            <div className="poruka">
                                {this.state.info}
                            </div>
                            <Row className="stanjeRacuna">
                                <Col></Col>
                                <Col>{this.state.novac} KM</Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col className="tipka2" onClick={() => this.tipka('podizanje')}>
                                    PODIZANJE
                                </Col>
                                <Col className="tipka3" onClick={() => this.tipka('nazad')}>
                                    NAZAD
                                </Col>
                                <Col className="tipka4" onClick={() => this.tipka('izlaz')}>
                                    IZLAZ
                                </Col>
                            </Row>
                        </div>

                    </Card.Body>

                    <Card.Footer className="footer">copyright © by ITAlm | 2022</Card.Footer>
                </Container >
            );
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////
        else if (this.state.kategorija === 'podizanje') {
            return (

                <Container>
                    <Card.Body>
                        <div className="polje">

                            <div className="pporuka">
                                {this.state.info}
                            </div>

                            <Row>
                                <Col className="tipkaNovac" onClick={() => this.tipkaNovca(10)}>
                                    10 KM
                                </Col>
                                <Col></Col>
                                <Col className="tipkaNovac" onClick={() => this.tipkaNovca(100)}>
                                    100 KM
                                </Col>
                            </Row>
                            <Row>
                                <Col className="tipkaNovac" onClick={() => this.tipkaNovca(20)}>
                                    20 KM
                                </Col>
                                <Col></Col>
                                <Col className="tipkaNovac" onClick={() => this.tipkaNovca(200)}>
                                    200 KM
                                </Col>
                            </Row>
                            <Row>
                                <Col className="tipkaNovac" onClick={() => this.tipkaNovca(50)}>
                                    50 KM
                                </Col>
                                <Col></Col>
                                <Col className="tipkaNovac" onClick={() => this.tipkaNovca(500)}>
                                    500 KM
                                </Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col className="tipkaNovac" onClick={() => this.tipkaNovca(12345)}>
                                    UNESITE IZNOS
                                </Col>
                                <Col></Col>
                            </Row>


                            <Row>
                                <Col className="tipka2" onClick={() => this.tipka('potvrdi')}>
                                    PODIGNI
                                </Col>
                                <Col className="tipka3" onClick={() => this.tipka('nazad')}>
                                    NAZAD
                                </Col>
                                <Col className="tipka4" onClick={() => this.tipka('izlaz')}>
                                    IZLAZ
                                </Col>
                            </Row>
                        </div>

                    </Card.Body>

                    <Card.Footer className="footer">copyright © by ITAlm | 2022</Card.Footer>
                </Container >
            );
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////
        if (this.state.kategorija === 'unosiNovac') {
            return (

                <Container>
                    <Card.Body>
                        <div className="polje">
                            <div className="poruka">
                                {this.state.info}
                            </div>
                            <div className="unesenNovac">
                                {this.state.odabraoNovac}
                            </div>

                            <Row>
                                <Col className="tipka" onClick={() => this.klBroj(1)}>
                                    1
                                </Col>
                                <Col className="tipka" onClick={() => this.klBroj(2)}>
                                    2
                                </Col>
                                <Col className="tipka" onClick={() => this.klBroj(3)}>
                                    3
                                </Col>
                            </Row>
                            <Row>
                                <Col className="tipka" onClick={() => this.klBroj(4)}>
                                    4
                                </Col>
                                <Col className="tipka" onClick={() => this.klBroj(5)}>
                                    5
                                </Col>
                                <Col className="tipka" onClick={() => this.klBroj(6)}>
                                    6
                                </Col>
                            </Row>
                            <Row>
                                <Col className="tipka" onClick={() => this.klBroj(7)}>
                                    7
                                </Col>
                                <Col className="tipka" onClick={() => this.klBroj(8)}>
                                    8
                                </Col>
                                <Col className="tipka" onClick={() => this.klBroj(9)}>
                                    9
                                </Col>
                            </Row>
                            <Row>
                                <Col></Col>
                                <Col className="tipka" onClick={() => this.klBroj(0)}>
                                    0
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row>
                                <Col className="tipka6" onClick={() => this.tipka('potvrdi')}>
                                    PODIGNI
                                </Col>
                                <Col className="tipka7" onClick={() => this.tipka('obrisi')}>
                                    OBRISI
                                </Col>
                                <Col className="tipka8" onClick={() => this.tipka('izlaz')}>
                                    IZLAZ
                                </Col>
                            </Row>
                        </div>

                    </Card.Body>

                    <Card.Footer className="footer">copyright © by ITAlm | 2022</Card.Footer>
                </Container >
            );
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////
    }
}