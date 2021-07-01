import "./index.css";
import React, { useState, useEffect } from "react";
import {
  clear,
  clickGenerate,
  nextStep,
  update,
  resizeUpdate,
} from "./functions.js";
import { Cell } from "./Cell";
import { Button } from "./Button";
import { SpeedInput } from "./SpeedInput";
import { DropdownMenu } from "./DropdownMenu";

export default function App() {
  const heightModifier = Math.floor(window.innerHeight / 60);
  const widthModifier = Math.floor(window.innerWidth / 60);
  const [rowsNum, setRowsNum] = useState(heightModifier);
  const [columnsNum, setColumnsNum] = useState(widthModifier);

  const [running, setRunning] = useState(false);
  const [cellsArr, setCellsArr] = useState(clear(rowsNum, columnsNum));

  const [speed, setSpeed] = useState(100);
  const [selected, setSelect] = useState("defaultMode");

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
      setColumnsNum(Math.floor(window.innerWidth / 50));
      setRowsNum(Math.floor(window.innerHeight / 50));
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
            running={running}
            rowsNum={rowsNum}
            columnsNum={columnsNum}
            index={index}
            selected={selected}
            cellsArr={cellsArr}
            setUpdate={(arr) => setCellsArr(arr)}
            setGenerated={(arr) => setCellsArr(arr)}
          ></Cell>
        ))}
      </div>
      <div className="buttons-wrapper">
        <Button
          rowsNum={rowsNum}
          columnsNum={columnsNum}
          running={running}
          cellsArr={cellsArr}
          stopGame={(run) => setRunning(run)}
          clearBoard={(arr) => setCellsArr(arr)}
          goToNextStep={(arr) => setCellsArr(arr)}
        ></Button>

        <SpeedInput
          speed={speed}
          changeSpeed={(val) => setSpeed(val)}
        ></SpeedInput>

        <DropdownMenu
          selected={selected}
          changeSelect={(res) => setSelect(res)}
        ></DropdownMenu>
      </div>
    </div>
  );
}
