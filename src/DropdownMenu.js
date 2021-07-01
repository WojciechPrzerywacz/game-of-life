import "./index.css";
import React from "react";
import { Button } from "./Button";

export const DropdownMenu = (props) => {
  const { selected, changeSelect } = props;

  return (
    <div className="dropdown">
      <Button name={selected} />
      {/* <button className="dropbtn">{selected}</button> */}
      <div className="dropdown-content">
        <div onClick={() => changeSelect("defaultMode")}>Default Mode</div>
        <div onClick={() => changeSelect("threeCells")}>Three Cells</div>
        <div onClick={() => changeSelect("glider")}>Glider</div>
      </div>
    </div>
  );
};
