import React, { Component } from "react";

import Modal from "./Modal";
import Image from "./Image";
import Badge from "./Badge";

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

        <div className="icon-container" >


        { this.props.isItemSelected ? (  
              <div onClick={this.updateQuantity} className='col s4 selectedItem card'>
              
                  <Image path={this.props.path} />

                  <Badge quantity={"Test"} />

              </div>   
          ) :
              <Modal addQuantity={this.updateQuantity} trigger= {

                  <div className='col s4 card'>

                  <Image path={this.props.path} />

                  <Badge quantity={"Test"} />
             
                  </div>    
                    
              }/>  }
    

        </div>
      )
    }
  }

