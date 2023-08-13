export interface ResponseTypeContract{
 
    id: number;
    typeContract: string;
    description: string;
    commonTables: {
      state: boolean;
      logDelete: boolean;
      dateCreate: Date;
      dateUpdate: Date;
      user: string;
      option: 0
    }
}

