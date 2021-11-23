import React, { useState, useEffect, useRef, useCallback } from "react";

// Shared //
import Table from '../../shared/Tables';

// Service //
import SensorValuesDataService from "../../services/sensor-values.service";
import moment from "moment";

const SensorValuesList = (props) => {
  const [sensorValues, setSensorValues] = useState([]);
  const sensorValuesRef = useRef();

  sensorValuesRef.current = sensorValues;

  useEffect(() => {
    retrieveSensorValues();
  }, []);

  const retrieveSensorValues = () => {
    SensorValuesDataService.getAll()
      .then((response) => {
        setSensorValues(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteSensorValues = useCallback((rowIndex) => {
    const id = sensorValuesRef.current[rowIndex].id;

    SensorValuesDataService.delete(id)
      .then((response) => {
        props.history.push("/sensor-values/");

        let newSensorValues = [...sensorValuesRef.current];
        newSensorValues.splice(rowIndex, 1);

        setSensorValues(newSensorValues);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [props.history]);

  const columns = React.useMemo(() => [
      {
        Header: "Co2",
        accessor: "co2",
      },
      {
        Header: "Nombre de personnes",
        accessor: "nbrPeoples",
      },
      {
        Header: "Sensor",
        accessor: "sensor.name",
      },
      {
        Header: "Created at",
        id: "creation_date",
        accessor: d =>
        moment(d.creation_date).format("HH:mm - ddd d/M/YYYY"),
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => deleteSensorValues(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ], [deleteSensorValues])

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="">
          <h1 className="text-xl font-semibold">Sensor Values List</h1>
        </div>
        <div className="mt-6">
          <Table columns={columns} data={sensorValues} />
        </div>
      </main>
    </div>
  );
};

export default SensorValuesList;