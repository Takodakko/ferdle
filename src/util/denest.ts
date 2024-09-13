import { squareStatusGrid } from '../appTypes';

export const denestSquareStatusGrid = function(obj: squareStatusGrid) {
    const newVersion: squareStatusGrid = {
        0: [...obj[0]],
        1: [...obj[1]],
        2: [...obj[2]],
        3: [...obj[3]],
        4: [...obj[4]],
        5: [...obj[5]],
    };
    return newVersion;
};

export const denestArrayOfArrays = function(array: string[][]) {
  const newVersion: string[][] = [];
  array.forEach((row) => {
    newVersion.push([...row]);
  });
  return newVersion;
};
