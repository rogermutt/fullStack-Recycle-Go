import React from "react";

export default props => { 
    return (
    <span className="badge" data-badge-caption={props.quantity > 0 ? "item(s)" : ""} > 
    {props.quantity > 0 ? props.quantity : "" } 
    </span>
    )
} 
