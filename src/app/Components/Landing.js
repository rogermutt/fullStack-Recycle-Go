import React, { Component } from "react";
import Button from "./Button";
import OceanSVG from "./OceanSVG";

export default class Landing extends Component {

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

    render () {
        return (
          <React.Fragment>

            { console.log("items ",this.state.itemsSelected.length) }

            <OceanSVG itemsSelected={this.state.itemsSelected.length} />

          {/* If there are items on the DB met print them all inside React frag 
          otherwise print <p> w/ message  */}
          <div className="row">

                    {this.state.itemsSelected.length > 0 ? ( 
                      
                    <div className="row">

                      <p> There are {this.state.itemsSelected.length} items on the DB</p> 
                      <p> Busiest day is <strong> {this.state.itemsSelected[0]._id} </strong> </p> 

                    </div>

                      ) : (

                      <p>No elements in the Db</p>

                      )}

                      <Button text={"Reports"} /> 
                      <Button text={"Add Items"} /> 
                      <Button text={""} /> 
          
          </div>

          </React.Fragment> 
            )
        }
}

