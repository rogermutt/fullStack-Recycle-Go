import React, { Component } from "react";
import { Modal } from 'react-materialize';
import Button from "./Button";

export default class ModalElement extends Component {

    constructor(props) {
      super(props)

      this.state = {
        quantity: 1
      }

      this.onChangeHandler = this.onChangeHandler.bind(this);
      this.submitHandler = this.submitHandler.bind(this);
      this.closeHandler = this.closeHandler.bind(this);
    }

    onChangeHandler (e){
      this.setState({quantity: e.target.value});
    }

    submitHandler (){    
      this.props.addQuantity(this.state.quantity)
    }

    closeHandler (){    
      this.setState({quantity: 1}); 
    }
  
    render () {
        return (
              <Modal
                header='How many items?'
                actions={
                  <React.Fragment>
                    <a onClick={this.closeHandler} className="waves-effect waves-light btn modal-close">Never mind</a>
                    <a onClick={this.submitHandler} className="waves-effect waves-light btn modal-close">Confirm</a>
                  </React.Fragment>
                }
                trigger={this.props.trigger}>
                  <div className="row ">
                    <div className="input-field col s6">
                      <input onChange={this.onChangeHandler} value={this.state.quantity} id="quantity_items" type="text" className="validate" />
                      <label className="active" htmlFor="quantity_items">Quantity</label>
                    </div>
                  </div>       
              </Modal>
            )
        }
}