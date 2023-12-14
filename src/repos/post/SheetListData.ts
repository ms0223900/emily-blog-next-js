import SheetDataHelper from "../utils/SheetDataHelper";

export class SheetListData<Data extends Record<any, any>> {
  private data: Data[];

  constructor(d: Data[]) {
    this.data = d;
  }

  static toVOList<
    Data extends Record<string, any>,
    Keys extends (keyof Data)[] = (keyof Data)[]
  >(values: string[][], cols: Keys) {
    const res = values.map((rowVal: string[]) =>
      SheetDataHelper.toValueObject<Data>(rowVal, cols)
    );

    return new SheetListData(res);
  }

  joinWith<ForeignData extends Record<any, any>>(
    key: keyof Data,
    otherDataKey: keyof ForeignData,
    otherData: ForeignData[]
  ) {
    this.data = SheetDataHelper.join<Data, ForeignData>(
      {
        key: key as string,
        data: this.data,
      },
      {
        key: otherDataKey as string,
        data: otherData,
      }
    );
    return this;
  }

  sortBy(sortFn: (data: Data) => number, asc = true) {
    this.data.sort((prev, next) => {
      const prevRes = sortFn(prev);
      const nextRes = sortFn(next);

      return asc ? nextRes - prevRes : prevRes - nextRes;
    });
    return this;
  }

  filter(filterFn: Parameters<Array<Data>["filter"]>[0]) {
    this.data = this.data.filter(filterFn);
    return this;
  }

  toList() {
    return this.data;
  }
}
