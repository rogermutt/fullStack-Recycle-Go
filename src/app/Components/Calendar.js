import React, { Component } from "react";
import Calendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

export default class CalendarComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      events: [
        {
          start: new Date(),
          end: new Date(),
          title: "4 items"
        }
      ]
    }  
  }

  componentDidMount(){

    fetch('/api/itemsSelected')
    .then(res => res.json())
    .then(data => {

      // let itemsSelected = [];
      // data.map(el => el.items).map(array => array.map( el => itemsSelected.push(el)));
      // this.setState({itemsSelected});
      
    });

  }

  render() {
    return (
      <div className="row">   
        <Calendar
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: "60vh" }}
        />
      </div>
    );
  }
}