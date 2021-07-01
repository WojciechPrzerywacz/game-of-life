import "./index.css";
import React, { useState, useEffect } from "react";
import { clear, nextStep, resizeUpdate } from "./functions.js";
import { Cell } from "./Cell";
import { Button } from "./Button";
import { SpeedInput } from "./SpeedInput";
import { DropdownMenu } from "./DropdownMenu";

export default function App() {
  const heightModifier = Math.floor(window.innerHeight / 40);
  const widthModifier = Math.floor(window.innerWidth / 40);
  const [rowsNum, setRowsNum] = useState(heightModifier);
  const [columnsNum, setColumnsNum] = useState(widthModifier);

  const [running, setRunning] = useState(false);
  const [cellsArr, setCellsArr] = useState(clear(rowsNum, columnsNum));

  const [speed, setSpeed] = useState(100);
  const [selected, setSelect] = useState("defaultMode");

  const goToNextStep = () => {
    setCellsArr(nextStep(cellsArr, rowsNum, columnsNum));
  };

  const clearBoard = () => {
    setCellsArr(clear(rowsNum, columnsNum));
  };

  const toggleRunningState = () => {
    setRunning(!running);
  };

  useEffect(() => {
    const simulate = () => {
      if (running) {
        console.log(selected);
        setCellsArr(nextStep(cellsArr, rowsNum, columnsNum));
      }
    };
    if (running) {
      setTimeout(() => {
        simulate();
      }, speed);
    }
  }, [running, cellsArr, columnsNum, rowsNum, speed, selected]);

  useEffect(() => {
    const handleResize = () => {
      setColumnsNum(Math.floor(window.innerWidth / 40));
      setRowsNum(Math.floor(window.innerHeight / 40));
      setCellsArr(resizeUpdate(cellsArr, rowsNum, columnsNum));
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [rowsNum, columnsNum, heightModifier, widthModifier, cellsArr]);

  return (
    <div className="flex">
      <div
        className="cellsGrid"
        style={{
          gridTemplateColumns: `repeat(${columnsNum}, 20px)`,
        }}
      >
        {cellsArr.map((value, index) => (
          <Cell
            key={index}
            running={running}
            rowsNum={rowsNum}
            columnsNum={columnsNum}
            index={index}
            selected={selected}
            cellsArr={cellsArr}
            updateArr={setCellsArr}
          />
        ))}
      </div>
      <div className="buttons-wrapper">
        <Button
          name={running ? "Start Game" : "Stop Game"}
          func={toggleRunningState}
        />

        <Button name="Clear" func={clearBoard} />

        <Button name="Next Step" func={goToNextStep} />

        <SpeedInput speed={speed} changeSpeed={setSpeed} />

        <DropdownMenu selected={selected} changeSelect={setSelect} />
      </div>
    </div>
  );
}
