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


        let itemsSelected = [];
        data.map(el => el.items).map(array => array.map( el => itemsSelected.push(el)));
        this.setState({itemsSelected});

        console.log( this.state.itemsSelected );
        
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

          {/* If there are items on the DB met print them all inside React frag 
          otherwise print <p> w/ message  */}

          {this.state.itemsSelected.length > 0 ? (  

          <React.Fragment>
            
           <h3> There are {this.state.itemsSelected.length} items on the DB</h3> 

          {this.state.itemsSelected.map((id, idx) =>
          <p key={idx}>{id}</p>
          )} 
          </React.Fragment>

            ) : (

            <p>No elements in the Db</p>

            )}

          </React.Fragment> 
            )
        }
}

