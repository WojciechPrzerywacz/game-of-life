import "./index.css";
import React, { useState, useEffect } from "react";
import { clear, clickGenerate, nextStep, update } from "./functions.js";

export const SpeedInput = (props) => {
  //console.log(props);

  return (
    <div className="flex">
      <p className="text-holder">Current speed: {props.speed}</p>
      <input
        type="text"
        placeholder="Change game speed (ms)"
        onChange={(event) => props.changeSpeed(event.target.value)}
      />
    </div>
  );
};
