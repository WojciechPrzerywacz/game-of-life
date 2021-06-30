import "./index.css";
import React, { useState, useEffect } from "react";
import { clear, clickGenerate, nextStep } from "./functions.js";

export default function App() {
  const heightModifier = Math.floor(window.innerHeight / 30);
  const widthModifier = Math.floor(window.innerWidth / 30);
  const [rowsNum, setRowsNum] = useState(heightModifier);
  const [columnsNum, setColumnsNum] = useState(widthModifier);

  const [running, setRunning] = useState(false);
  const [cellsArr, setCellsArr] = useState(clear(rowsNum, columnsNum));

  const [speed, setSpeed] = useState(100);
  const [selected, setSelect] = useState("oneCell");

  useEffect(() => {
    const simulate = () => {
      if (running) {
        console.log(selected);
        setCellsArr(nextStep(cellsArr, rowsNum, columnsNum));
      }
    };

    setTimeout(() => {
      simulate();
    }, speed);
  }, [running, cellsArr, columnsNum, rowsNum, speed, selected]);

  useEffect(() => {
    const handleResize = () => {
      setCellsArr(clear(rowsNum, columnsNum));
      setColumnsNum(widthModifier);
      setRowsNum(heightModifier);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [rowsNum, columnsNum, heightModifier, widthModifier]);

  return (
    <div className="flex">
      <div
        className="cellsGrid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columnsNum}, 20px)`,
          gridGap: "0",
        }}
      >
        {cellsArr.map((value, index) => (
          <div
            key={index}
            style={{
              height: "20px",
              width: "20px",
              border: "1px solid gray",
              boxSizing: "border-box",
              WebkitBoxSizing: "border-box",
            }}
            onClick={() =>
              setCellsArr(
                clickGenerate(index, cellsArr, columnsNum, rowsNum, selected)
              )
            }
            className={value ? "cellAlive" : "cellDead"}
          ></div>
        ))}
      </div>
      <div className="buttons-wrapper">
        <button
          onClick={() => setRunning(running ? false : true)}
          className={"buttons"}
        >
          {running ? "Stop Game" : "Start Game"}
        </button>
        <button
          onClick={() => setCellsArr(clear(rowsNum, columnsNum))}
          className={"buttons"}
        >
          Clear
        </button>

        <input
          type="text"
          value={speed}
          onChange={(event) => setSpeed(event.target.value)}
        />
        <div className="dropdown">
          <button className="dropbtn">Dropdown</button>
          <div className="dropdown-content">
            <div onClick={() => setSelect("oneCell")}>One Cell</div>
            <div onClick={() => setSelect("threeCells")}>Three Cells</div>
            <div onClick={() => setSelect("glider")}>Glider</div>
          </div>
        </div>
      </div>
    </div>
  );
}
