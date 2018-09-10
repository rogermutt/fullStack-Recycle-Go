import React, { Component } from "react";
import {Doughnut} from 'react-chartjs-2';

export default class DoughnutExample extends Component {

    constructor(props) {
        super(props)
  
        this.state = {
            data: {
                labels: this.props.labels,
                datasets: [{
                    data: this.props.data,
                    backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                    ]
                }]
            }
        }
    }

  render() {
    return (
        <Doughnut data={this.state.data} />
    );
  }
};