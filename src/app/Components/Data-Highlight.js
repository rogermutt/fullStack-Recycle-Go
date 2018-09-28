import React from "react";

export default props => (  
      <div class="col s12 m6 l3">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">{props.title}</span>
            <p>{props.text}</p>
          </div>
        </div>
      </div>  
)
