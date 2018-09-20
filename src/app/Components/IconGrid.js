import React, { Component } from "react";

import Modal from "./Modal";
import Image from "./Image";
import Badge from "./NumberBadge";

export default class IconGrid extends Component {
  
    constructor(props) {
      super(props);
  
      this.state = {
        details: this.props.details 
      } 
      this.updateQuantity = this.updateQuantity.bind(this);
      
    }

    updateQuantity (qty){  
      this.props.addToSelected(this.state.details, Number(qty) );
    } 
 
    render() {
      return (
        <React.Fragment>

       
          { this.props.itemsSelected.map(el=>el.id).indexOf(this.state.details.id) > -1 ? 
          (
              <div onClick={this.updateQuantity} className='col s4 selectedItem'>
              
              <Image path={this.props.path} />

                  <Badge quantity={this.props.itemsSelected.map(item => {
                    return item.id === this.state.details.id ? Number(item.qty) : ""  
                  })} />

              </div>   
          ) :
              <Modal addQuantity={this.updateQuantity} trigger= {
                <div className='col s4'>
                <Image path={this.props.path} />

                  <Badge quantity={this.props.itemsSelected.map(item => {
                    return item.id === this.state.details.id ? Number(item.qty) : ""
                  })} />
             
              </div>      
              }/>
          }

        </React.Fragment>
      )
    }
  }

