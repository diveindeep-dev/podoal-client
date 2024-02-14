export const arrangePodoal = (arranges: number[]) => {
  let positionIndex = 0;
  let result: number[][] = [];

  arranges.map((arrange: number) => {
    let row = [];
    for (let i = 0; i < arrange; i++) {
      positionIndex++;
      row.push(positionIndex);
    }
    return result.push(row);
  });

  return result;
};
