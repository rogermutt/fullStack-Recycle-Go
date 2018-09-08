import React, { Component } from "react";
import Button from "./Button";

const arr = ["box.png", "plastic-bag.png", "plastic-bottle.png"];

const ranNum =()=> Math.floor((Math.random() * 200) + 1);

class Roger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {addClass: false}
  }
  toggle() {
    this.setState({addClass: !this.state.addClass});
  }
  render() {
    let boxClass = ["col", "s4"];
    if(this.state.addClass) {
      boxClass.push('otherclass');
    }
    return(
        <div className={boxClass.join(' ')}  onClick={this.toggle.bind(this)}>{this.state.addClass ? "Remove a class" : "Add a class (click the box)"}
        <br />
        Read the tutorial 
        <a href="http://www.automationfuel.com" target="_blank">here</a>.</div>       
    );
  }
}

const ImageCont = props => (
      <div className="col s4 otherclass"> 
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
            <div className="row">
            <Roger/>
            <Roger/>
            <Roger/>
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