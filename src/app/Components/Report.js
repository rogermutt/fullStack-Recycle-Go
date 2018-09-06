import React, { Component } from "react";

export default class Report extends Component {

    constructor(props) {
      super(props)

      this.state = {
        arr: null
      }
    }

    componentDidMount(){
      console.log("hello"); 

    fetch('/api/itemsSelected')
      .then(res => res.json())
      .then(data => {
        console.log("yep ",data);
         
      });

    }

    render () {
        return (
          <React.Fragment>
          <p>Hello</p>

          </React.Fragment> 
            )
        }
}

