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
        last14DaysValues: {},
        totalNumItems: 0
      }
    }

    componentDidMount(){

        fetch('/api/7to14Days')
        .then(res => res.json())
        .then(data => {

            var last14DaysValues = {
                'Mon': 0,'Tue': 0,'Wed': 0,'Thur': 0,'Fri': 0,'Sat': 0,'Sun': 0
            };
            
            data.map(el => {
                
                let dayOfWeek = this.convertToDay( new Date (el.timestamp).getDay() );
                let shortDay = dayOfWeek.slice(0,3);
                let qty = el.items.map(el=> el.qty).reduce((acc, curr) => acc + curr)
                
                last14DaysValues[shortDay] = qty;
            });
     
            this.setState({ last14DaysValues });            

        }); 

        fetch('/api/last7Days')
        .then(res => res.json())
        .then(data => {

            var last7DaysValues = {
                'Mon': 0,'Tue': 0,'Wed': 0,'Thur': 0,'Fri': 0,'Sat': 0,'Sun': 0
            };
            
            data.map(el => {
                
                let dayOfWeek = this.convertToDay( new Date (el.timestamp).getDay() );
                let shortDay = dayOfWeek.slice(0,3);
                let qty = el.items.map(el=> el.qty).reduce((acc, curr) => acc + curr)
                
                last7DaysValues[shortDay] = qty;
            });
     
            this.setState({ last7DaysValues });
        });

        fetch('/api/itemsSelected')
        .then(res => res.json())
        .then(data => {

            // fixed > used to define most common item using qty 
            let mostCommonItems = data.map(el => el.items).map(array => {     
                var highest = Math.max.apply(Math, array.map(o=> o.qty))
                var obj = array.find(o=> o.qty == highest)
                return obj;
            });
            let highestItem = mostCommonItems.find(o=> o.qty == Math.max.apply(Math, mostCommonItems.map(o=> o.qty)) )

            let itemsSelected = [];
            
            data.map(el => el.items).map(array => array.map(el => itemsSelected.push( el.name )));

            let totalNumberItems = data
            .map(el => el.items).map(arr => arr.map(el => el.qty).reduce((acc, curr) => acc + curr))
            .reduce((acc, curr) => acc + curr);
 
            console.log("itemsSelected ", totalNumberItems );

            let timeStampArray = data.map(el => el.timestamp);

            var itemsSelectedOrganized = {};
            itemsSelected.forEach(el => itemsSelectedOrganized[el] = ( itemsSelectedOrganized[el] || 0) + 1 );      
                
            let catList = [];

            data
            .map(el => el.items)  
            .map(arr => arr.map( el => el.categories))
            .map( el => el.map( arr => arr.map( el => catList.push(el) ) ) )

            this.setState({
            itemsSelected: itemsSelected,
            mostCommonItem: highestItem.name,
            mostCommonDay: this.returnMostCommonItem ( this.convertToDayOfWeek( timeStampArray ) ),
            dailyAverage: this.calculateDailyAverage(totalNumberItems, fakeRegoDate, data[data.length - 1].timestamp ),
            itemsSelectedOrganized: itemsSelectedOrganized,
            chartData: Object.values(this.ocurrencesInArray(catList)),
            chartLabels: catList.filter( (el, pos)=> catList.indexOf(el) == pos ).sort(),
            totalNumItems: totalNumberItems
            }); 

        });

    }

    ocurrencesInArray (arr) {
        arr = arr.sort();
        var itemsSelectedOrganized = {};
        arr.forEach(el => itemsSelectedOrganized[el] = ( itemsSelectedOrganized[el] || 0) + 1 );      
        return itemsSelectedOrganized;
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
            '#FA8072',
            '#d3ffce',
            '#40e0d0',
            '#20b2aa'
            ],
            hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FA8072',
            '#d3ffce',
            '#40e0d0',
            '#20b2aa'
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

    calculateDailyAverage(totalItems, firstDate, lastDate) {

        var one_day=1000*60*60*24;

      let first_Day = firstDate.getTime(),
          end_Date = new Date(lastDate).getTime();

          var difference_ms = end_Date - first_Day;

          var diff = Math.round(difference_ms/one_day);
 
          
        
      return (totalItems / diff).toFixed(2);
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
              { this.state.itemsSelected.length > 0 ? (  
                
                <div className="row">
                <h5>Highlights of your activity</h5>

                <div className="col s12 m6 l3">
                <h5> <strong>{this.state.totalNumItems}</strong> </h5>
                <span>Items you used since your started.</span>
                </div>

                <div className="col s12 m6 l3">
                <h5> <strong>{ this.state.mostCommonItem }</strong> </h5>
                <span>Your most commonly used item.</span>
                </div>     

                <div className="col s12 m6 l3">
                <h5>  <strong>{this.state.mostCommonDay}s.</strong> </h5>
                <span>The day you pollute the most.</span>
                </div>     

                <div className="col s12 m6 l3">
                <h5>  <strong>{this.state.dailyAverage}</strong> </h5>
                <span>Average items you throw away per day.</span>
                </div>   
                  
                </div>

              ) : (
              <p>No elements in the DB</p>
              )}

            <div className="row">
                <h5>Your activity at glance</h5>        
                <Doughnut data={this.LoadDoughnutData()} />
            </div>    
            
            <div className="row">
                <h5>Your activity at glance</h5>
                <Line data={this.LoadLineChartData()} />
            </div>  

          </div>         
          )
        }
}