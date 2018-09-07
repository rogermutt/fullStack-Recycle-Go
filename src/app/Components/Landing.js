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

            <OceanSVG/>

           {/* <img className="responsive-img" src="images/box.png" /> */}

          {/* If there are items on the DB met print them all inside React frag 
          otherwise print <p> w/ message  */}

          <div className="row">

                    {this.state.itemsSelected.length > 0 ? (  

                    <React.Fragment>          

                      <p> There are {this.state.itemsSelected.length} items on the DB</p> 
                      <p> Busiest day is <strong> {this.state.itemsSelected[0]._id} </strong> </p> 

                    </React.Fragment>

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

