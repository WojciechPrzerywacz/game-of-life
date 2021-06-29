import "./index.css";
import React, { useState, useEffect, useRef } from "react";
import { Cell } from "./Cell.js";

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

export default function App() {
  const [rowsNum, setRowsNum] = useState(Math.floor(window.innerHeight / 30));
  const [columnsNum, setColumnsNum] = useState(
    Math.floor(window.innerWidth / 30)
  );

  useEffect(() => {
    const handleResize = () => {
      setCellsArr(generate(rowsNum, columnsNum));
      setColumnsNum(Math.floor(window.innerWidth / 30));
      setRowsNum(Math.floor(window.innerHeight / 30));
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const calculateNeighboursCount = (arr, i, j) => {
    let aliveNeighboursAmount = 0;

    for (const neighbourOffsetKey in neighbourOffsets) {
      const [xOffset, yOffset] = neighbourOffsets[neighbourOffsetKey];

      let newColumnOffset = j + xOffset;
      let newRowOffset = i + yOffset;

      if (newColumnOffset < 0 || newColumnOffset > columnsNum - 1) {
        continue;
      }
      if (newRowOffset < 0 || newRowOffset > rowsNum - 1) {
        continue;
      }
      const neighbourState =
        arr[newColumnOffset + newRowOffset * columnsNum].props.isAlive;
      if (neighbourState === true) {
        aliveNeighboursAmount++;
      }
    }
    console.log("NEXT");
    console.log(aliveNeighboursAmount);
    console.log("NEXT");

    return aliveNeighboursAmount;
  };

  const generate = (rows, column) => {
    const cellsArrCpy = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < column; j++) {
        cellsArrCpy.push(
          <Cell
            key={(j + i * columnsNum).toString()}
            row={i}
            column={j}
            isAlive={Math.random() < 0.4}
          ></Cell>
        );
      }
    }
    return cellsArrCpy;
  };

  const nextStep = (cellsArray) => {
    if (!running) {
      return cellsArray;
    }
    const cellsArrCpy = [];
    for (let i = 0; i < rowsNum; i++) {
      for (let j = 0; j < columnsNum; j++) {
        let neigbours = calculateNeighboursCount(cellsArray, i, j);
        if (
          cellsArray[j + i * columnsNum].props.isAlive === true &&
          (neigbours < 2 || neigbours > 3)
        ) {
          //umiera
          cellsArrCpy.push(<Cell row={i} column={j} isAlive={false}></Cell>);
        }
        if (
          cellsArray[j + i * columnsNum].props.isAlive === true &&
          (neigbours === 2 || neigbours === 3)
        ) {
          //żyje
          cellsArrCpy.push(<Cell row={i} column={j} isAlive={true}></Cell>);
        }

        if (
          cellsArray[j + i * columnsNum].props.isAlive === false &&
          neigbours === 3
        ) {
          //żyje
          cellsArrCpy.push(<Cell row={i} column={j} isAlive={true}></Cell>);
        }

        if (
          cellsArray[j + i * columnsNum].props.isAlive === false &&
          neigbours !== 3
        ) {
          //nie żyje tak jak wcześniej nie żył
          cellsArrCpy.push(<Cell row={i} column={j} isAlive={false}></Cell>);
        }
      }
    }
    //setTimeout(nextStep(cellsArrCpy), 100)
    return cellsArrCpy;
  };

  const simulate = () => {
    setCellsArr(nextStep(cellsArr));
    //setTimeout(simulate, 1000);
  };

  const [running, setRunning] = useState(false);
  const [cellsArr, setCellsArr] = useState(generate(rowsNum, columnsNum));

  const cellsArrRef = React.useRef(cellsArr);
  const setCellsRef = (data) => {
    cellsArrRef.current = data;
    setCellsArr(data);
  };

  return (
    <div className="flex">
      <div
        className="cellsGrid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columnsNum}, 20px)`,
          gridGap: "0px",
        }}
      >
        {cellsArr}
      </div>
      <button
        onClick={() => setRunning(running ? false : true)}
        className={"buttons"}
      >
        {running ? "Stop Game" : "Start Game"}
      </button>
      <button
        onClick={() => setCellsArr(generate(rowsNum, columnsNum))}
        className={"buttons"}
      >
        Generate
      </button>
      <button onClick={simulate} className={"buttons"}>
        Next Step
      </button>
    </div>
  );
}
//setInterval(() => setCellsArr(nextStep(cellsArr)), 1000);
