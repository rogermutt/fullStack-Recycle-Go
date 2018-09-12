import React, { Component } from "react";
import Button from "./Button";
import IconGrid from "./IconGrid";
import productDB from "../productDB.js"
import {Carousel} from 'react-materialize'


export default class Grid extends Component {

    constructor(props) {
      super(props)

      this.state = {
        itemsSelected: [],
        itemsAvailable: this.loadItems()
      }
      
      this.submitItems = this.submitItems.bind(this);
    }
    componentDidMount(){    

      document.addEventListener('DOMContentLoaded', ()=> {
        M.Sidenav.init(document.querySelectorAll('.sidenav'));
        M.Carousel.init(document.querySelectorAll('.carousel.carousel-slider'), {fullWidth: true, indicators: true } ); 
      });   
   
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

              <Carousel options={{ fullWidth: true, indicators: true, padding:100 }}>
      
              <div className="row" >
              {this.state.itemsAvailable.products.filter( item=> item.id < 10).map((item, index) => 
                  (
                    <IconGrid path={`/images/${item.image}`} details={item} addToSelected={this.addToSelected}  />
                  )
              )}
              </div>

              <div className="row" >
              {this.state.itemsAvailable.products.filter( item=> item.id > 9).map((item, index) => 
                  (
                    <IconGrid path={`/images/${item.image}`} details={item} addToSelected={this.addToSelected}  />
                  )
              )}
              </div>

            </Carousel>

            <Button clickHandler={this.submitItems} /> 

          </React.Fragment> 

            )
        }
}