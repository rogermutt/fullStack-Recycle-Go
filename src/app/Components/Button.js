import React from "react";

export default props => ( 
      <a onClick={props.clickHandler} className="waves-effect waves-light btn"> {props.text ? props.text : "button" } </a>
   )
