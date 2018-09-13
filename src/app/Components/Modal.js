import React, { Component } from "react";
import { Modal } from 'react-materialize';

export default class ModalElement extends Component {

    constructor(props) {
      super(props)

      this.state = {
        itemsSelected: []
      }
      
    }
    componentDidMount(){    

    }
  
    render () {
        return (
          <React.Fragment>

              <Modal
                header='How many items?'
                trigger={<button>MODAL</button>}>
                  <div className="row">
                    <div className="input-field col s6">
                      <input value="Alvin" id="first_name2" type="text" className="validate" />
                      <label className="active" htmlFor="first_name2">First Name</label>
                    </div>
                  </div>
              </Modal>

          </React.Fragment> 

            )
        }
}