import React, { Component } from "react";
import Button from "./Button";
import OceanSVG from "./OceanSVG";
import { log } from "util";

export default class Landing extends Component {

    constructor(props) {
      super(props)

      this.state = {
        itemsSelected: [],
        dayOfWeek: ""
      }
    }

    componentDidMount(){

      fetch('/api/itemsSelected')
      .then(res => res.json())
      .then(data => {

        let itemsSelected = data
        .map( el => el.items.map( el => el.qty) )
        .map(arr => arr.reduce( (total, num) => total + num) )
        .reduce( (total, num) => total + num)
        
        this.setState({itemsSelected});

        let arrayOfDays = data
        .map(el => el.timestamp)
        .map(rawDate => new Date (rawDate) )
        .map(formattedDate => formattedDate.getDay())
        .map(day => this.convertToDay(day) );
        
        this.setState({
          dayOfWeek: this.returnMostCommonDay( arrayOfDays )
        });       
      
      });

    }

    convertToDay(numberDay){
        switch (numberDay) {
            case 1: return "Monday";
                break;
            case 2: return "Tuesday";
                break;
            case 3: return "Wednesday";
                break;
            case 4: return "Thursday";
                break;
            case 5: return "Friday";
                break;
            case 6: return "Saturday";
                break;
            case 7: return "Sunday";
                break;
            default: return "Invalid day";
                break;  
              }
    }

    returnMostCommonDay (array) {

        var obj = {}, mostFreq = 0, which = [];
    
        array
        .forEach(ea => {
        if (!obj[ea]) {
            obj[ea] = 1;
        } else {
            obj[ea]++;
        }
        
        if (obj[ea] > mostFreq) {
            mostFreq = obj[ea];
            which = [ea];
        } else if (obj[ea] === mostFreq) {
            which.push(ea);
        }
    
        });
        return which.length > 1 ? which[0] : which;
    }

    render () {
        return (
          <React.Fragment>

            <OceanSVG itemsSelected={this.state.itemsSelected} />

            <div className="row">

              {this.state.itemsSelected > 0 ? ( 
                      
              <div className="row">

                <div className="col s12 m6 l6">
                <h4> <strong>{this.state.itemsSelected}</strong> </h4>
                <span>Items you used since your started.</span>
                </div>

                <div className="col s12 m6 l6">
                <h4>  <strong>{this.state.dayOfWeek}s.</strong> </h4>
                <span>The day you pollute the most.</span>
                </div>               
 
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

