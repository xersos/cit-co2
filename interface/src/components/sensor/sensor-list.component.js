import React, { useState, useEffect, useRef, useCallback } from "react";

// Shared //
import Table, { StatusPill } from '../../shared/Tables';

// Service //
import SensorDataService from "../../services/sensor.service";


const SensorsList = (props) => {
  const [sensors, setSensors] = useState([]);
  const sensorsRef = useRef();

  sensorsRef.current = sensors;

  useEffect(() => {
    retrieveSensors();
  }, []);


  const retrieveSensors = () => {
    SensorDataService.getAll()
      .then((response) => {
        setSensors(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openSensor = useCallback((rowIndex) => {
    const id = sensorsRef.current[rowIndex].id;

    props.history.push("/sensor/" + id);
  }, [props.history]);

  const deleteSensor = useCallback((rowIndex) => {
    const id = sensorsRef.current[rowIndex].id;

    SensorDataService.delete(id)
      .then((response) => {
        props.history.push("/sensors/");

        let newSensors = [...sensorsRef.current];
        newSensors.splice(rowIndex, 1);

        setSensors(newSensors);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [props.history]);

  const columns = React.useMemo(() => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusPill,
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openSensor(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteSensor(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
      
    ], [openSensor, deleteSensor])

  return (
      <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="">
          <h1 className="text-xl font-semibold">Sensors List</h1>
        </div>
        <div className="mt-6">
          <Table columns={columns} data={sensors} />
        </div>
      </main>
    </div>
  );
};

export default SensorsList;