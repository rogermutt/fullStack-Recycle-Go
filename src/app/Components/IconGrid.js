import React, { Component } from "react";

import Modal from "./Modal";

export default class IconGrid extends Component {
  
    constructor(props) {
      super(props);
  
      this.state = {
        selected: false,
        details: this.props.details,
        qty: 0
      }
      this.addQuanity = this.addQuanity.bind(this);
    }

    addQuanity (qty){  
        let newQty = this.state.qty + Number(qty);
        
        this.setState( {qty: newQty}, () => 
        this.props.addToSelected(this.state) );
    }
  
    render() {
      return (
        <Modal addQuanity={this.addQuanity} trigger={
          <div className={ (this.state.selected ? 'col s4 selectedItem': 'col s4') }>
          <a> <img className="responsive-img" src={this.props.path} /> </a>
        </div>      
        }/>
      )
    }
  }

