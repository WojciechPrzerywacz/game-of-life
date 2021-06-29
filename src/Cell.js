import "./index.css";
import React, { useState } from "react";

export const Cell = (props) => {
  //console.log(columnIndex*columnsNum+rowIndex)
  //console.log(neighboursCount);
  return (
    <div
      //key={num}
      style={{ height: "20px", width: "20px", border: "1px solid gray" }}
      //onClick={() => setstate(state ? false : true)}
      className={props.isAlive ? "cellAlive" : "cellDead"}
    ></div>
  );
};
