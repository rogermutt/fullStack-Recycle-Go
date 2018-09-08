import React, { Component } from "react";
import Button from "./Button";
import IconGrid from "./IconGrid";

const arr = ["box.png", "plastic-bag.png", "plastic-bottle.png"];

const ranNum =()=> Math.floor((Math.random() * 200) + 1);

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
  
      console.log("clickHandler ", e.target);  
      // let list = this.state.itemsSelected;
      // list.push(e.target.src);
      // this.setState({itemsSelected: list});
    }

    submitItems (e) {

      console.log("items Submitted ", this.state.itemsSelected); 

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
              console.log("Router responded ", data);
              this.setState({itemsSelected: []});
          
            })
            .catch(err => console.error(err));
      }

    render () {
        return (
          <React.Fragment>

          <div className="container">
            <div className="row" onClick={this.clickHandler}>
            {arr.map((image) => <IconGrid key={ranNum()} path={`/images/${image}`} /> )}
            </div>
      
            <div className="row">
            {arr.map((image) => <IconGrid key={ranNum()} path={`/images/${image}`} /> )}
            </div>
      
            <div className="row">
            {arr.map((image) => <IconGrid key={ranNum()} path={`/images/${image}`} /> )}
            </div>

            <div className="row">
            <Button clickHandler={this.submitItems} /> 
            </div>

          </div> 

          </React.Fragment> 

            )
        }
}