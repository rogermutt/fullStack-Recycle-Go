import React, { Component } from "react";
import Button from "./Button";
import IconGrid from "./IconGrid";
import productDB from "../productDB.js"

export default class Grid extends Component {

    constructor(props) {
      super(props)

      this.state = {
        itemsSelected: [],
        itemsAvailable: this.loadItems()
      }
      
      this.submitItems = this.submitItems.bind(this);
    }
 
    loadItems (){
      return productDB;
    }

    addToSelected(itemClicked) {
      itemsSelected.push(itemClicked);
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

  <div className="carousel carousel-slider center " data-indicators="true" >

    <div className="carousel-fixed-item center">
       <Button clickHandler={this.submitItems} /> 
    </div>

    <div className="carousel-item" href="#one!">
          <div className="row" >
            {this.state.itemsAvailable.products.filter( item=> item.id < 10).map((item, index) => 
                (<div key={index} className="col s4">
                  <IconGrid path={`/images/${item.image}`} details={item} addToSelected={this.addToSelected}  />
                </div>)
              )}
          </div>
    </div>

    <div className="carousel-item" href="#two!">
          <div className="row" >
            {this.state.itemsAvailable.products.filter( item => item.id > 9).map((item, index) => 
                (<div key={index} className="col s4">
                  <IconGrid path={`/images/${item.image}`} details={item} addToSelected={this.addToSelected}  />
                </div>)
              )}
          </div>
    </div>
 </div>       

          {/* <div className="container">
            <div className="row" >

            {this.state.itemsAvailable.products.map((item, index) => 
               
              (<div key={index} className="col s4">
                <IconGrid path={`/images/${item.image}`} details={item} addToSelected={this.addToSelected}  />
              </div>)

             )}
            </div>

            <div className="row">
            <Button clickHandler={this.submitItems} /> 
            </div>

          </div>  */}

          </React.Fragment> 

            )
        }
}