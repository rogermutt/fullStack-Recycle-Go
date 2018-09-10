import React, { Component } from "react";
import Doughnut from "./DoughnutChart";
import Line from "./LineChart";

const fakeRegoDate = new Date("2018-08-02T08:59:50.337Z");

export default class Report extends Component {

    constructor(props) {
      super(props)

      this.state = {
        itemsSelected: [],
        mostCommonItem: "",
        mostCommonDay: "",
        dailyAverage: 0,
        chartData: [],
        chartLabels: [],
        last7DaysValues: {},
        last14DaysValues: {}
      }
    }

    componentDidMount(){

    fetch('/api/7to14Days')
    .then(res => res.json())
    .then(data => {

        let timeStampArray = data
        .map(el => el.timestamp)
        .map(rawDate => { 

            let date = new Date (rawDate); 
            let dayOfWeek = date.getDay(); 
            
            return dayOfWeek;
            
          });

        var last14DaysValues = {};

        timeStampArray
        .map(el => this.convertToDay(el))
        .forEach(el => last14DaysValues[el] = ( last14DaysValues[el] || 0) + 1 ); 

        this.setState({ last14DaysValues });

        console.log("14 days ",this.state.last14DaysValues);  
        
          
    }); 

    fetch('/api/last7Days')
    .then(res => res.json())
    .then(data => {
          
        let timeStampArray = data
        .map(el => el.timestamp)
        .map(rawDate => { 

            let date = new Date (rawDate); 
            let dayOfWeek = date.getDay(); 
            
            return dayOfWeek;
            
          });

        var last7DaysValues = {};

        timeStampArray
        .map(el => this.convertToDay(el))
        .forEach(el => last7DaysValues[el] = ( last7DaysValues[el] || 0) + 1 ); 

        this.setState({ last7DaysValues });

        console.log("7 days ",this.state.last7DaysValues);  
    });

    fetch('/api/itemsSelected')
    .then(res => res.json())
    .then(data => {

        let itemsSelected = [];
        data.map(el => el.items).map(array => array.map( el => itemsSelected.push(el)));
        
        let timeStampArray = data.map(el => el.timestamp);

        let len = data.length;

        var itemsSelectedOrganized = {};
        itemsSelected.forEach(el => itemsSelectedOrganized[el] = ( itemsSelectedOrganized[el] || 0) + 1 );      
            
        this.setState({
          itemsSelected: itemsSelected,
          mostCommonItem: this.returnMostCommonItem( itemsSelected ),
          mostCommonDay: this.returnMostCommonItem ( this.convertToDayOfWeek( timeStampArray ) ),
          dailyAverage: this.calculateDailyAverage(len , data[len-1].timestamp ),
          itemsSelectedOrganized: itemsSelectedOrganized,
          chartData: Object.values(itemsSelectedOrganized),
          chartLabels: Object.keys(itemsSelectedOrganized)
        }); 

      });

    }

    LoadDoughnutData (){

      const data = {
        labels: this.state.chartLabels,
        datasets: [{
            data: this.state.chartData,
            backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
            ]
        }]
      }

      return data;

    }

    LoadLineChartData (){

    const data = {
        labels: ['Mon','Tue','Wed','Thur','Fri','Sat','Sun'],
        datasets: [
          {
            label: 'Current Week',
            backgroundColor: 'rgba(255, 99, 132, 1)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255, 99, 132, 1)',
            hoverBorderColor: 'rgba(255, 99, 132, 1)',
            data: Object.values(this.state.last7DaysValues)
          },
          {
            label: 'Previous Week',
            backgroundColor: 'rgba(54, 162, 235, 1)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(54, 162, 235, 1)',
            hoverBorderColor: 'rgba(54, 162, 235, 1)',
            data: Object.values(this.state.last14DaysValues)
          }
        ]
      };

      return data;
    } 

    calculateDailyAverage(totalItems, lastDate) {
      let first_Day = fakeRegoDate,
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

    convertToDay (element) {   
            switch (element) {
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
          case 0: return "Sunday";
              break;
          default: return "Invalid day";
              break;  
            }
    }
    
    convertToDayOfWeek (array) {
        return array
        .map(rawDate => new Date (rawDate) )
        .map(formatedDate => formatedDate.getDay())
        .map(numDay => this.convertToDay(numDay))
    }

    render () {
        return (
          <div className="row">
              {this.state.itemsSelected.length > 0 ? (  
                
                <div className="row">
                <h4>Highlights of your activity</h4>

                <div className="col s12 m6 l3">
                <h4> <strong>{this.state.itemsSelected.length}</strong> </h4>
                <span>Items you used since your started.</span>
                </div>

                <div className="col s12 m6 l3">
                <h4> <strong>{this.state.mostCommonItem}</strong> </h4>
                <span>Your most commonly used item.</span>
                </div>     

                <div className="col s12 m6 l3">
                <h4>  <strong>{this.state.mostCommonDay}s.</strong> </h4>
                <span>The day you pollute the most.</span>
                </div>     

                <div className="col s12 m6 l3">
                <h4>  <strong>{this.state.dailyAverage}</strong> </h4>
                <span>Average items you throw away per day.</span>
                </div>   
                  
                </div>

              ) : (
              <p>No elements in the DB</p>
              )}

            <div className="row">
                <h4>Your activity at glance</h4>        
                <Doughnut data={this.LoadDoughnutData()} />
            </div>    
            
            <div className="row">
                <h4>Your activity at glance</h4>
                <Line data={this.LoadLineChartData()} />
            </div>  

          </div>         
          )
        }
}