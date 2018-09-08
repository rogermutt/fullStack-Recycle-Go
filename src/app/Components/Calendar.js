import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

export default class CalendarComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      events: []
    }  
  }

  updateStateEvents (data) {

    let newEventsList = [];

      data.map(el => {

        let obj = new Object();
            obj.start = new Date (el.timestamp);
            obj.end = new Date (el.timestamp);  
            obj.title = `${el.items.length} item(s)`;  

            newEventsList.push(obj);   
      });
    
    return newEventsList;
    
  }

  componentDidMount(){

    fetch('/api/itemsSelected')
    .then(res => res.json())
    .then(data => {

      let newList = this.updateStateEvents(data);

      this.setState({events: newList});
      
    });

  }

  render() {
    return (
      <div className="row">   
        <Calendar
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: "65vh" }}
        />
      </div>
    );
  }
}