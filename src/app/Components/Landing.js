import React, { Component } from "react";
import Button from "./Button";
import OceanSVG from "./OceanSVG";

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

        let itemsSelected = [];
        data.map(el => el.items).map(array => array.map( el => itemsSelected.push(el)));
        this.setState({itemsSelected});

        let arr = data.map(el => el.timestamp);

        let roger = this.returnMostCommonDay( arr )
        
        this.setState({
          dayOfWeek: roger
        });  
        console.log(this.state.dayOfWeek);
        
      
      });

    }

    returnMostCommonDay (array) {

        const convertToDay = stringDate => {
            switch (stringDate) {
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
    
        var obj = {}, mostFreq = 0, which = [];
    
        array
        .map(rawDate => {
    
        let date = new Date (rawDate);
        let dayOfWeek = date.getDay();
        return convertToDay(dayOfWeek)
        })
        
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

            <OceanSVG itemsSelected={this.state.itemsSelected.length} />

          <div className="row">

              {this.state.itemsSelected.length > 0 ? ( 
                      
              <div className="row">

              <p> There are {this.state.itemsSelected.length} items on the DB</p> 
              <p> Busiest day is <strong> {this.state.dayOfWeek} </strong> </p> 

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

