import React from "react"
import Chart from 'react-apexcharts'

function generateData(count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = 'w' + (i + 1).toString();
    var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push({
      x: x,
      y: y
    });
    i++;
  }
  return series;
}

class Heatmap extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      options: {
        dataLabels: {
          enabled: false
        },
        colors: ["#008FFB"],
      },
      chart: {
        toolbar: {
          show: false,
          tools: {
            download: false,
          }
        }
      },
      series: [
        {
          name: '',
          data: generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: '',
          data: generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: '',
          data: generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: '',
          data: generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: '',
          data: generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: '',
          data: generateData(18, {
            min: 0,
            max: 90
          })
        },
        {
          name: '',
          data: generateData(18, {
            min: 0,
            max: 90
          })
        },
      ],
    }
  }

  render() {
    return (
      

      <div id="chart">
        <Chart
          chart={this.state.chart}
          options={this.state.options}
          series={this.state.series}
          height="200"
          type="heatmap"
          height="300"
        />
      </div>


    );
  }
}

export default Heatmap;
