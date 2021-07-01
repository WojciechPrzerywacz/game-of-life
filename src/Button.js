import "./index.css";
import React from "react";
import { clear, clickGenerate, nextStep, update } from "./functions.js";

export const Button = (props) => {
  //console.log(props);

  return (
    <div>
      <button //start/stop
        onClick={() => props.stopGame(props.running ? false : true)}
        className={"buttons"}
      >
        {props.running ? "Stop Game" : "Start Game"}
      </button>
      <button //next step
        onClick={() =>
          props.goToNextStep(
            nextStep(props.cellsArr, props.rowsNum, props.columnsNum)
          )
        }
        className={"buttons"}
      >
        Next Step
      </button>
      <button //czyściciel
        onClick={() => props.clearBoard(clear(props.rowsNum, props.columnsNum))}
        className={"buttons"}
      >
        Clear Board
      </button>
    </div>
  );
};
