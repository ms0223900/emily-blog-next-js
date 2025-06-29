const cloneMore = (cardListData: any, amount: number): any[] => {
    const res = [...cardListData];
    for (let i = 0; i < amount; i++) {
        res.push(...cardListData);
    }
    return res;
}

export default cloneMore;