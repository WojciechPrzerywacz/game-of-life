import "./index.css";
import React from "react";
import { clear, clickGenerate, nextStep, update } from "./functions.js";

export const Button = (props) => {
  const { name, event, func } = props;
  return (
    <button className={"buttons"} onClick={() => func(event)}>
      {name}
    </button>
  );
};
