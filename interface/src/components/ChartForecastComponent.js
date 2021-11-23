import React from "react";
import Chart from "react-apexcharts";

function ChartForecastComponent(){
    const data = {
        options: {
          chart: {
            toolbar:{
              tools:{
                download:true,
                selection: false,
                zoom:false,
                zoomin:false,
                zoomout:false,
                reset:false,
                pan:false
              }
            }
          },
          xaxis: {
            categories: [1000, 1005, 1010, 1015, 1020, 1025, 1030, 1035, 1040]
          },
          markers:{
              size: 6
          },
          title:{
              text:"Prédiction de CO2"
          },
          forecastDataPoints: {
            count: 2
          }
        },
        series: [
          {
            name: "Salle 1a",
            data: [400, 420, 500, 690, 900, 1400, 1220, 800]
          }
        ]
    };
    
    return(
        <div className="mixed-chart">
            <Chart
              options={data.options}
              series={data.series}
              type="line"
              width="100%"
              height="300px"
            />
        </div>
    )
}

export default ChartForecastComponent