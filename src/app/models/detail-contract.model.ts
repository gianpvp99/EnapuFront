export interface ResponseDetailContract{
    id: number;
    idContract: number;
    contractDescriptionLong: String;
    contractDescriptionShort: String;
    dateStart: Date;
    dateEnd: Date;
    idTarifa: String;
    tarifaDescription: String;
    tarifaAmount: number;
    idPeriod: number;
    periodDescription: String;
    periodMonth: number;
    idUnitMeasurement: number;
    unitMeasurementDescription: String;
    unit: number;
    unitDescription: String;
    periodoMeta: number;
    commonTables: {
      state: true;
      logDelete: false;
      dateCreate: Date;
      dateUpdate: Date;
      user: String;
      option: number;
    }
}
