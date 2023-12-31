const SheetDataHelper = {
  toValueObject: <Data extends Record<string, any>>(
    values: any[],
    columnKeys: (keyof Data)[]
  ): Data => {
    const res = {} as Data;
    for (let i = 0; i < columnKeys.length; i++) {
      const col = columnKeys[i] as keyof Data;
      res[col] = values[i];
    }
    return res;
  },

  join: <
    PrimaryData extends Record<any, any>,
    ForeignData extends Record<any, any>
  >(
    primary: { key: string; data: PrimaryData[] },
    foreign: { key: string; data: ForeignData[] }
  ): (PrimaryData & ForeignData)[] => {
    const res = [] as (PrimaryData & ForeignData)[];

    for (let i = 0; i < primary.data.length; i++) {
      const val = primary.data[i];

      const found = foreign.data.find(
        (fd) => fd[foreign.key] === val[primary.key]
      );
      res[i] = {
        ...val,
        ...(found ? found : {}),
      };
    }

    return res;
  },
};

export default SheetDataHelper;
