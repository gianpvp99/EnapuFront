export interface ListUnit{
 
    id: number;
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

