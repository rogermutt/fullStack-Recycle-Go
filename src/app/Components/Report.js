import React, { Component } from "react";

export default class Report extends Component {

    constructor(props) {
      super(props)

      this.state = {
        itemsSelected: []
      }
    }

    componentDidMount(){

      fetch('/api/itemsSelected')
      .then(res => res.json())
      .then(data => {
        this.setState({itemsSelected: data});
        
      });

    }

    printIds(){
      
    }

    render () {
        return (
          <React.Fragment>

             {this.state.itemsSelected.map(el=>el._id).map(id =>
             <p>{id}</p>
             )}
 
          </React.Fragment> 
            )
        }
}

