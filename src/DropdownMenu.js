import "./index.css";
import React from "react";
import { clear, clickGenerate, nextStep, update } from "./functions.js";

export const DropdownMenu = (props) => {
  //console.log(props);
  return (
    <div className="dropdown">
      <button className="dropbtn">{props.selected}</button>
      <div className="dropdown-content">
        <div onClick={() => props.changeSelect("defaultMode")}>
          Default Mode
        </div>
        <div onClick={() => props.changeSelect("threeCells")}>Three Cells</div>
        <div onClick={() => props.changeSelect("glider")}>Glider</div>
      </div>
    </div>
  );
};
