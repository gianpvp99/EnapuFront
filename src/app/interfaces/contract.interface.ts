export interface listContract {
    idContract: string
}

export interface maintenanceContractI {
    id: number;
    idTerminalPortuario: string;
    descriptionLong: string;
    descriptionShort: string;
    idClient: string;
    idTypeContract: number;
    dateContract: Date;
    dateStart: Date;
    dateEnd: Date;
    directionContract: string;
    idUsuario: number;
    user: string;
    option: number
}
export interface Detail{
    id: number
    idContract: number;
    idTarifa: string;
    idPeriod: number;
    idUnitMeasurement: number;
    periodoMeta: number;
    user: string;
    option: number
}


export interface detailText{
    tarifa: string;
    Period: string;
    Unit: string;
    unitMeasurement: string;
    periodoMeta: number;
}
export interface idResponsible {
    id: number
}
export interface responsible{
    id: number;
    idContract: number;
    idUser: number;
    user: string;
    option: number   
}
export interface responsibleText{
    responsible: string;
    email: string;
}
export interface maintenanceResponsibleI {
    id: number;
    idContract: number;
    idUser: number;
    user: string;
    option: number;
}

export interface responsibleAssign{
    id: number;
    idContract: number;
    idUser: number;
    name: string;
    email: string;
    user: number;
    commonTables: {
        state: boolean;
        logDelete: boolean;
        dateCreate: Date;
        dateUpdate: Date;
        user: number;
        option: number;
    }
}

export interface maintenanceAddContractI {
    id: number;
    idTerminalPortuario: string;
    descriptionLong: string;
    descriptionShort: string;
    idClient: string;
    idTypeContract: number;
    dateContract: Date;
    dateStart: Date;
    dateEnd: Date;
    directionContract: string;
    idUsuario: number;
    user: string;
    option: number;

    detail:Detail[];
    responsible: responsible[];
}

export interface listTipoTarifaI {
    idTerminal: string,
    idServicio: string
}