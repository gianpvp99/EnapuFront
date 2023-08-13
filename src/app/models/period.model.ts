export interface PeriodList{
 
    id: number;
    description: string;
    month: number;
    commonTables: {
      state: boolean;
      logDelete: boolean;
      dateCreate: Date;
      dateUpdate: Date;
      user: string;
      option: 0
    }
}

