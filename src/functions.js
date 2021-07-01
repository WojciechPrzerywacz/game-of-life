export const clear = (rows, columns) => {
  const cellsArrCpy = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      cellsArrCpy.push(false);
    }
  }
  return cellsArrCpy;
};
export const update = (index, array) => {
  let cellsArrCpy = [];
  cellsArrCpy = [...array];
  cellsArrCpy[index] = !array[index];
  return cellsArrCpy;
};

export const resizeUpdate = (array, rows, columns) => {
  let cellsArrCpy = [];
  let helperArr = [...array];
  //nowa tablica z samymi 0 o odpowiednim rozmiarze
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      cellsArrCpy.push(false);
    }
  }
  //przypisac to co się da z starej do nowej
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (helperArr.length > j + i * columns)
        cellsArrCpy[j + i * columns] = helperArr[j + i * columns];
    }
  }
  return cellsArrCpy;
};

export const clickGenerate = (index, array, columnsNum, rowsNum, selected) => {
  const cellsArrCpy = [];
  if (selected === "threeCells") {
    for (let i = 0; i < rowsNum; i++) {
      for (let j = 0; j < columnsNum; j++) {
        if (
          index === j + i * columnsNum ||
          index === j + (i - 1) * columnsNum ||
          index === j + (i + 1) * columnsNum
        ) {
          cellsArrCpy.push(true);
        } else {
          cellsArrCpy.push(array[j + i * columnsNum]);
        }
      }
    }
  }

  if (selected === "glider") {
    for (let i = 0; i < rowsNum; i++) {
      for (let j = 0; j < columnsNum; j++) {
        if (
          index === j + (i - 1) * columnsNum ||
          index === j - 1 + (i - 1) * columnsNum ||
          index === j + 1 + i * columnsNum ||
          index === j - 1 + i * columnsNum ||
          index === j - 1 + (i + 1) * columnsNum
        ) {
          cellsArrCpy.push(true);
        } else {
          cellsArrCpy.push(array[j + i * columnsNum]);
        }
      }
    }
  }
  console.log(cellsArrCpy);
  return cellsArrCpy;
};

const neighbourOffsets = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

export const calculateNeighboursCount = (arr, i, j, columnsNum, rowsNum) => {
  let aliveNeighboursAmount = 0;

  for (const neighbourOffsetKey in neighbourOffsets) {
    const [xOffset, yOffset] = neighbourOffsets[neighbourOffsetKey];
    let newColumnOffset = j + xOffset;
    let newRowOffset = i + yOffset;

    if (newColumnOffset < 0 || newColumnOffset > columnsNum - 1) {
      //brzegi
      continue;
    }
    if (newRowOffset < 0 || newRowOffset > rowsNum - 1) {
      //brzegi
      continue;
    }
    const neighbourState = arr[newColumnOffset + newRowOffset * columnsNum];
    if (neighbourState === true) {
      aliveNeighboursAmount++;
    }
  }
  return aliveNeighboursAmount;
};

export const nextStep = (cellsArray, rowsNum, columnsNum) => {
  const cellsArrCpy = [];
  for (let i = 0; i < rowsNum; i++) {
    for (let j = 0; j < columnsNum; j++) {
      let neigbours = calculateNeighboursCount(
        cellsArray,
        i,
        j,
        columnsNum,
        rowsNum
      );
      if (
        //żywa - za mało lub za dużo sąsiadow
        cellsArray[j + i * columnsNum] === true &&
        (neigbours < 2 || neigbours > 3)
      ) {
        cellsArrCpy.push(false);
      } else if (
        //żywa - pozostaje zywa
        cellsArray[j + i * columnsNum] === true &&
        (neigbours === 2 || neigbours === 3)
      ) {
        cellsArrCpy.push(true);
      } else if (cellsArray[j + i * columnsNum] === false && neigbours === 3) {
        //martwa - rodzi sie
        cellsArrCpy.push(true);
      } else if (cellsArray[j + i * columnsNum] === false && neigbours !== 3) {
        //martwa - pozostaje martwa
        cellsArrCpy.push(false);
      }
    }
  }
  return cellsArrCpy;
};
