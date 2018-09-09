import React, { Component } from "react";
import Button from "./Button";
import IconGrid from "./IconGrid";

const arr = ["box.png", "plastic-bag.png", "plastic-bottle.png", "box.png", "plastic-bag.png", "plastic-bottle.png", "box.png", "plastic-bag.png", "plastic-bottle.png"];

const itemsList = 
["Plastic Bag", "Plastic Bottle",
 "Food Container", "Coffee Cup", 
 "Food Wrapper", "Cardboard",
 "Drink Can", "Food Can",
 "Plastic Cutlery"
];

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
      
      let target = e.target.dataset.idx;
      let list = this.state.itemsSelected;

      let idx = list.indexOf(target);

      idx === -1 ?  
      list.push(target)  : 
      list.splice( list.indexOf(target), 1) ;

      this.setState({
        itemsSelected: list
      });

      console.log("state ", this.state.itemsSelected);  
      
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
            <div className="row" >
            {arr.map((image, index) => <IconGrid key={index} idx={ itemsList[index]} path={`/images/${image}`} test={this.clickHandler} /> )}
            </div>

            <div className="row">
            <Button clickHandler={this.submitItems} /> 
            </div>

          </div> 

          </React.Fragment> 

            )
        }
}