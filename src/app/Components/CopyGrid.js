import React, { Component } from "react";
import Button from "./Button";

const arr = ["box.png", "plastic-bag.png", "plastic-bottle.png"];

const ImageCont = props => {
  return (
      <div className="col s4"> 
      <img className="responsive-img" src={`/images/${props.path}`} />
      </div>        
  );  
};


class CopyGrid extends Component {

    constructor(props) {
      super(props)

      this.state = {
        itemsSelected: []
      }
      this.selectHandler = this.selectHandler.bind(this);
      this.submitHandler = this.submitHandler.bind(this);
    }

    selectHandler(e) {

      const { innerText } = e.target;
      var itemsSelected = this.state.itemsSelected;
      itemsSelected.push(innerText);

      this.state = {  itemsSelected  }
      
    }

    submitHandler(e) {
       

      console.log("click ", this.state.itemsSelected);

      
      fetch('/api/itemsSelected', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log("data ", data);
         
        })
        .catch(err => console.error(err));
    



    }

    render () {
        return (
          <React.Fragment>

          <div className="container">
            <div className="col s4"> 
            <a onClick={this.selectHandler} className="waves-effect waves-light btn">Plastic Bag</a>
            </div>
          </div>

          <form onSubmit={this.submitHandler}>        
             <button type="submit" className="btn light-blue darken-4">
                  Send 
              </button>
          </form>

          </React.Fragment> 
            )
        }
}

export default CopyGrid;