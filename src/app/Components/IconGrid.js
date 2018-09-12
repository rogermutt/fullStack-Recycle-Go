import React, { Component } from "react";
import { log } from "util";

export default class IconGrid extends Component {
  
    constructor(props) {
      super(props);
  
      this.state = {
        selected: false,
        details: this.props.details
      }
    }

    componentDidMount(){    
      
    }
  
    AddItem () {
      this.props.addToSelected(this.state.details);
    }
  
    render() {
      return (
          <div onClick={()=>{ this.AddItem()} } className={ (this.state.selected ? 'col s4 selectedItem': 'col s4') }>
            <a> <img className="responsive-img" src={this.props.path} /> </a>
          </div>
      )
    }
  }

