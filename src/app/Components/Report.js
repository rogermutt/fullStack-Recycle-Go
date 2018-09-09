import React, { Component } from "react";

export default class Report extends Component {

    constructor(props) {
      super(props)

      this.state = {
        itemsSelected: [],
        mostCommonItem: "",
        mostCommonDay: "",
        dailyAverage: 0
      }
    }

    componentDidMount(){

      fetch('/api/itemsSelected')
      .then(res => res.json())
      .then(data => {

        let itemsSelected = [];
        data.map(el => el.items).map(array => array.map( el => itemsSelected.push(el)));
        this.setState({itemsSelected});

        this.setState({
          mostCommonItem: this.returnMostCommonItem( this.state.itemsSelected )
        });  

        let timeStampArray = data.map(el => el.timestamp);

        this.setState({
          mostCommonDay: this.returnMostCommonItem ( this.returnMostCommonDay( timeStampArray ) )
        });     
        

        let len = data.length;
        
        this.setState({
          dailyAverage: this.calculateDailyAverage(len , data[len-1].timestamp )
        });  
        
      });
    }

    calculateDailyAverage(totalItems, lastDate) {
      let first_Day = new Date("2018-08-02T08:59:50.337Z"),
          end_Date = new Date(lastDate),
          total_days = (end_Date - first_Day) / (1000 * 60 * 60 * 24);
       
      return (totalItems / total_days).toFixed(2);
    }

    returnMostCommonItem(arr) {
  
    var obj = {}, mostFreq = 0, mostCommon = [];
    
      arr.forEach(ea => {
            if (!obj[ea]) {
                obj[ea] = 1;
            } else {
                obj[ea]++;
            }
            
            if (obj[ea] > mostFreq) {
                mostFreq = obj[ea];
                mostCommon = [ea];
            } else if (obj[ea] === mostFreq) {
                mostCommon.push(ea);
            }
        });
            
        return mostCommon.length > 1 ? mostCommon[0] : mostCommon;
    };

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

      return array.map(rawDate => {
        let date = new Date (rawDate);
        let dayOfWeek = date.getDay();
          return convertToDay(dayOfWeek)
      });

    }

    render () {
        return (
          <div className="row">
              {this.state.itemsSelected.length > 0 ? (  
                
               <React.Fragment>
                  <h4>Highlights of your activity</h4>
                  <li>You have used <strong>{this.state.itemsSelected.length}</strong> items since your started.</li>
                  <li>Your most commonly used item is <strong>{this.state.mostCommonItem}</strong>.</li>
                  <li>You pollute the most on <strong>{this.state.mostCommonDay}s</strong>.</li>
                  <li>On average you throw away <strong>{this.state.dailyAverage} items</strong> per day</li>
               </React.Fragment> 

              ) : (
              <p>No elements in the DB</p>
              )}
          </div>         
          )
        }
}

