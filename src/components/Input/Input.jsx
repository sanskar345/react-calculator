import React, {useState}  from "react";
import "./input.css";

function Input(props) {

  return (
  <div>
  <p className="input-box" style={props.useFont}  >{props.input} </p>
  </div>
  );
}

export default Input;
