import "./index.css";
import React from "react";
import { clear, clickGenerate, nextStep, update } from "./functions.js";

export const Cell = (props) => {
  const {} = props;
  return (
    <div
      key={props.index}
      onClick={() => {
        if (props.selected === "defaultMode" && !props.running) {
          props.setUpdate(update(props.index, props.cellsArr));
        } else if (!props.running) {
          props.setGenerated(
            clickGenerate(
              props.index,
              props.cellsArr,
              props.columnsNum,
              props.rowsNum,
              props.selected
            )
          );
        }
      }}
      //onMouseOverCapture={() => setColor("green")}
      className={
        props.cellsArr[props.index] ? "cellAlive cell" : "cellDead cell"
      }
    ></div>
  );
};
