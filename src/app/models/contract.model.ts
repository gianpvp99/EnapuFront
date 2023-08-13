export interface responsePeriodPrograming {
  id: number,
  name: string,
  level: string
}

export interface ResponseContract{
 
  id: number;
  idTerminalPortuario: number;
  detailTerminalPortuario: string;
  descriptionLong: string;
  descriptionShort: string;
  idClient: number;
  cliente: string;
  idTypeContract: number;
  detailTypeContract: string;
  dateContract: Date;
  dateStart: Date;
  dateEnd: Date;
  directionContract: string;
  idUsuario: number;
  user: string;
  option: number;
  commonTables: {
    state: boolean;
    logDelete: boolean;
    dateCreate: Date;
    dateUpdate: Date;
    user: string;
    option: number
  }
}

export interface ResponseResponsible{
 
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
    user: string;
    option: number
  }
}