import React, { Component } from "react";
import Button from "./Button";

const arr = ["box.png", "plastic-bag.png", "plastic-bottle.png"];

const ranNum =()=> Math.floor((Math.random() * 200) + 1);

const ImageCont = props => {
  return (
      <div className="col s4"> 
      <img className="responsive-img" src={`/images/${props.path}`} />
      </div>        
  );
};

class Grid extends Component {

    constructor(props) {
      super(props)

      this.state = {
        arr: null
      }
    }

    render () {
        return (
          <React.Fragment>

          <div className="container">
            <div className="row">
            {arr.map((image)=> <ImageCont key={ranNum()} path={image} /> )}
            </div>
      
            <div className="row">
            {arr.map((image)=> <ImageCont key={ranNum()} path={image} /> )}
            </div>
      
            <div className="row">
            {arr.map((image)=> <ImageCont key={ranNum()} path={image} /> )}
            </div>
          </div> 

          <Button /> 

          </React.Fragment> 
            )
        }
}

export default Grid;