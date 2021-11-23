import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function LineColumnChartComponent(props){
  const [roomName, setRoomName] = useState("");
  const [roomTime, setRoomTime] = useState([]);
  const [roomCo2, setRoomCo2] = useState([]);
  const [roomPeople, setRoomPeople] = useState([]);

  useEffect(() => {
    let data = props.data.data;
    console.log(props)
    let co2Tmp = []
    let timeTmp = []
    let peopleTmp = []
    if(data){
      setRoomName(data.name);
      for (let i = data.sensorsValues.length - 7; i < data.sensorsValues.length; i++) {
        const element = data.sensorsValues[i];
        let dateTime = element.creation_date.slice(element.creation_date.length - 12, -7);
        co2Tmp.push(element.co2)
        timeTmp.push(dateTime)
        peopleTmp.push(element.nbrPeoples)
      }
    }
    
    setRoomTime(timeTmp);
    setRoomCo2(co2Tmp);
    setRoomPeople(peopleTmp);
  },[props])

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
        categories: roomTime
      },
      markers:{
          size: 6
      },
      title:{
          text:"CO2 & Personnes présentes"
      },
      yaxis: [
        {
          title: {
              text: 'CO2'
          },
        },
        {
          opposite: true,
          title: {
              text: "personnes"
          }
      }]
    },
    series: [
      {
        name: "CO2",
        type: "line",
        data: roomCo2
      },
      {
        name: "personnes",
        type: "column",
        data: roomPeople
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

export default LineColumnChartComponent