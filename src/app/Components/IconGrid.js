import React, { Component } from "react";

import Modal from "./Modal";
import Image from "./Image";

export default class IconGrid extends Component {
  
    constructor(props) {
      super(props);
  
      this.state = {
        selected: false,
        details: this.props.details,
        qty: 0
      }
      this.updateQuantity = this.updateQuantity.bind(this);
      
    }

    static getDerivedStateFromProps(props, state) {
       return props.IDSelected.indexOf(state.details.id) > -1 ? { selected: true, } : { selected: false, };
    }

    updateQuantity (qty){  
        
        let newQty =  this.state.qty > 0 ? 0 : this.state.qty + Number(qty);
        this.setState( {qty: newQty}, () => 
        this.props.addToSelected(this.state) );
        
    } 
 
    render() {
      return (
        <React.Fragment>
          { this.state.selected ? 
          (
              <div onClick={this.updateQuantity} className={ (this.state.selected ? 'col s4 selectedItem': 'col s4') }>
              <Image path={this.props.path} />
              <span className="badge"> { (this.state.qty > 0 ? this.state.qty : '') } </span>
              </div>   
          ) :
              <Modal addQuantity={this.updateQuantity} trigger= {
                <div className={ (this.state.selected ? 'col s4 selectedItem': 'col s4') }>
                <Image path={this.props.path} />
                <span className="badge"> { (this.state.qty > 0 ? this.state.qty : '') } </span>
              </div>      
              }/>
          }
        </React.Fragment>
      )
    }
  }

