export interface ResponseProgramming{
 
    id: number;
    idDetailContract: number;
    idTarifa: number,
    descriptionTarifa: string;
    month: number;
    amounth: number;
    dateStart: Date;
    dateEnd: Date;
    cantFacture: number;
    cantOfMeta: number;
    commonTables: {
      state: boolean;
      logDelete: boolean;
      dateCreate: Date;
      dateUpdate: Date;
      user: string;
      option: number
    }
    action: boolean;
  }
