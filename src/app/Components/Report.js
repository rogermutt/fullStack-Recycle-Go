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

          {/* If there are items on the DB met print them all inside React frag 
          otherwise print <p> w/ message  */}

          {this.state.itemsSelected.length > 0 ? (  

          <React.Fragment>
            
           <h3> There are {this.state.itemsSelected.length} items on the DB</h3> 

          {this.state.itemsSelected.map(el=>el._id).map((id, idx) =>
          <p key={idx}>{id}</p>
          )} 
          </React.Fragment>

            ) : (
              <p>There are no items on the DB</p>
            )}

          </React.Fragment> 
            )
        }
}

