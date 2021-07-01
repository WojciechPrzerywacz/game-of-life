import "./index.css";
import React from "react";
import { clickGenerate, update } from "./functions.js";

export const Cell = (props) => {
  const { running, rowsNum, columnsNum, index, selected, cellsArr, updateArr } =
    props;
  return (
    <div
      key={index}
      onClick={() => {
        if (selected === "defaultMode" && !running) {
          updateArr(update(index, cellsArr));
        } else if (!running) {
          updateArr(
            clickGenerate(index, cellsArr, columnsNum, rowsNum, selected)
          );
        }
      }}
      className={cellsArr[index] ? "cellAlive cell" : "cellDead cell"}
    ></div>
  );
};
