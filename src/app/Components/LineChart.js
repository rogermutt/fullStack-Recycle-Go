import React from "react";
import {Bar} from 'react-chartjs-2';

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
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: 'Previous Week',
        backgroundColor: 'rgba(54, 162, 235, 1)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54, 162, 235, 1)',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
        data: [35, 29, 40, 41, 36, 45, 20]
      }
    ]
  };


export default props => ( 
    <Bar data={data} />
 )