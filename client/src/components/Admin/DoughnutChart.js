import React from "react";
import Chart from "chart.js";

import "./DoughnutChart.css";

class DoughnutChart extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    this.adminDoughnutChart = new Chart(this.canvasRef.current, {
      type: "doughnut",
      data: {
        labels: ["Stock in", "Stock out"],

        datasets: [
          {
            data: this.props.data.map(d => d.value),
            backgroundColor: ["#f76b1a", "#00001e"]
          }
        ]
      }
    });
  }
  render() {
    return (
      <div>
        <canvas ref={this.canvasRef} height="250px" />
      </div>
    );
  }
}

export default DoughnutChart;
