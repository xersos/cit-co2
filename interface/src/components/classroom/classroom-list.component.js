import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";

// Shared //
import Table, { StatusPill } from '../../shared/Tables';

// Service //
import ClassroomDataService from "../../services/classroom.service";


const ClassroomsList = (props) => {
  const [classrooms, setClassrooms] = useState([]);
  const classroomsRef = useRef();

  classroomsRef.current = classrooms;

  useEffect(() => {
    retrieveClassrooms();
  }, []);


  const retrieveClassrooms = () => {
    ClassroomDataService.getAll()
      .then((response) => {
        setClassrooms(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openClassroom = useCallback((rowIndex) => {
    const id = classroomsRef.current[rowIndex].id;

    props.history.push("/classroom/" + id);
  }, [props.history]);

  const deleteClassroom = useCallback((rowIndex) => {
    const id = classroomsRef.current[rowIndex].id;

    ClassroomDataService.delete(id)
      .then((response) => {
        props.history.push("/classrooms/");

        let newClassrooms = [...classroomsRef.current];
        newClassrooms.splice(rowIndex, 1);

        setClassrooms(newClassrooms);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [props.history]);

  const columns = useMemo(() => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Volume",
        accessor: "volume",
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
              <span onClick={() => openClassroom(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteClassroom(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
      
    ], [openClassroom, deleteClassroom])

  return (
      <div className="min-h-screen bg-gray-100 text-gray-900">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="">
          <h1 className="text-xl font-semibold">Classrooms List</h1>
        </div>
        <div className="mt-6">
          <Table columns={columns} data={classrooms} />
        </div>
      </main>
    </div>
  );
};

export default ClassroomsList;