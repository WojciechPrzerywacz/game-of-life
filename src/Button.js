import "./index.css";
import React from "react";

export const Button = (props) => {
  const { name, func } = props;
  return (
    <button className={"buttons"} onClick={func}>
      {name}
    </button>
  );
};
