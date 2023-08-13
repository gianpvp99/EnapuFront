export interface ResponseUnitMeasurement{
 
    id: number;
    idUnit: number;
    unitDescription: string;
    description: string;
    commonTables: {
      state: boolean;
      logDelete: boolean;
      dateCreate: Date;
      dateUpdate: Date;
      user: string;
      option: number
    }
}
