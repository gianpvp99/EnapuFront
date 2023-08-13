export interface ResponseI{
    id: number;
    idRol: number;
    rolDescription: string;
    idTerminalPortuario: string;
    terminalPortuarioDescription: string;
    lastName: string;
    lastMotherName: string;
    name: string;
    country: string;
    department: string;
    province: string;
    disctrict: string;
    address: string;
    numberPhone: string;
    email: string;
    nameUser: string;
    password: string;
    messagge: string;
    commonTables: {
        state: boolean;
        logDelete: boolean;
        dateCreate: Date;
        dateUpdate: Date;
        user: string;
        option: number;
    }
}

