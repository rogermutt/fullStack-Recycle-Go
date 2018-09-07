import React, { Component } from "react";
import Button from "./Button";

const arr = ["box.png", "plastic-bag.png", "plastic-bottle.png"];

const ranNum =()=> Math.floor((Math.random() * 200) + 1);

const ImageCont = props => (
      <div className="col s4"> 
        <a> <img className="responsive-img" src={`/images/${props.path}`} onClick={props.click} />  </a>
      </div>        
  );

export default class Grid extends Component {

    constructor(props) {
      super(props)

      this.state = {
        itemsSelected: []
      }
      
      this.clickHandler = this.clickHandler.bind(this);
      this.submitItems = this.submitItems.bind(this);
    }

    clickHandler(e) {
      console.log("clickHandler");  
      let list = this.state.itemsSelected;
      list.push(e.target.src);
      this.setState({itemsSelected: list});
    }

    submitItems (e) {

      console.log("submitItems"); 

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
              console.log("Here ",data);
              this.setState({itemsSelected: []});
          
            })
            .catch(err => console.error(err));
      }


    render () {
        return (
          <React.Fragment>

          <div className="container">
            <div className="row">
            {arr.map((image)=> <ImageCont click={this.clickHandler} key={ranNum()} path={image} /> )}
            </div>
      
            <div className="row">
            {arr.map((image)=> <ImageCont key={ranNum()} path={image} /> )}
            </div>
      
            <div className="row">
            {arr.map((image)=> <ImageCont key={ranNum()} path={image} /> )}
            </div>
          </div> 

          <Button clickHandler={this.submitItems} /> 

          </React.Fragment> 
            )
        }
}