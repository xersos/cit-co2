import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function ChartCO2Component(props){
  const [roomName, setRoomName] = useState("");
  const [roomTime, setRoomTime] = useState([]);
  const [roomCo2, setRoomCo2] = useState([]);

  useEffect(() =>{
    let data = props.data.data;
    let co2Tmp = []
    let timeTmp = []
    if(data){
      setRoomName(data.name);
      for (let i = data.sensorsValues.length - 7; i < data.sensorsValues.length; i++) {
        const element = data.sensorsValues[i];
        let dateTime = 0
        dateTime = element.creation_date.slice(element.creation_date.length - 12, -7);
        co2Tmp.push(element.co2)
        timeTmp.push(dateTime)
      }
    }
    setRoomTime(timeTmp);
    setRoomCo2(co2Tmp);
  },[props])

  const data = {
    options: {
      chart: {
        id: `CO2 ${roomName}`,
        toolbar:{
          show: true,
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
        categories: roomTime
      },
      markers:{
          size: 6
      },
      title:{
        text: "Evolution du taux de CO2"
      }
    },
    series: [
      {
        name: `Salle ${roomName}`,
        data: roomCo2
      }
    ]
  };
  
  return(
    <div className="">
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

export default ChartCO2Component