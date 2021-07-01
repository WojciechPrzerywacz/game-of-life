import "./index.css";
import React, { useState, useEffect } from "react";
import { clear, clickGenerate, nextStep, update } from "./functions.js";

export const SpeedInput = (props) => {
  //console.log(props);
  const { speed, changeSpeed } = props;
  return (
    <div className="flex">
      <p className="text-holder">Current speed: {speed}</p>
      <input
        type="text"
        placeholder="Change game speed (ms)"
        onChange={(event) => changeSpeed(event.target.value)}
      />
    </div>
  );
};
