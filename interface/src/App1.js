import './App.css';
import { useState, useEffect } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import axios from 'axios'; // DISABLED
import Home from "./Pages/Home.js";
import Room from "./Pages/Room.js";
import NavbarComponent from './Components/NavbarComponent';

function App() {
  // DISABLED
  //const [isLogged, setIsLogged] = useState(true); Not used
  // vars from API
  /*const [co2, setCo2] = useState();
  const [people, setPeople] = useState();
  const [roomName, setRoomName] = useState();
  const [roomSize, setRoomSize] = useState();
  const [historical, setHistorical] = useState();
  const [trend, setTrend] = useState();*/
  const [classRooms, setClassRooms] = useState([]);
  //Loads the room page with this id
  const [room, setRoom] = useState({});
  //Var that checks if we load home screen
  const [isHome, setIsHome] = useState(true);

  // DISABLED - Link to URL
  //const baseURL = "http://127.0.0.1:8000/api";
  // JSON data path
  const d = require("./data.json");

  // On component load
  useEffect(() => {
    // Iterates objects in data.json and stores them in state
    const fetchJSONData = () => {
      let dataTmp = []
      d.forEach(e => dataTmp.push(e))
      setClassRooms(dataTmp)
    }
    // DISABLED - Calls API 
    /*const created = async ()  => {
      await fetchRooms();
      await fetchActual(1);
      await fetchRoomInfo(1);
      //await fetchHistorical();
      await fetchTrend();
      setInterval(async () => {
          await fetchActual(1)
          await fetchRoomInfo(1)
          //await fetchHistorical();
          await fetchTrend();
      }, 30 * 1000)
    }
    try {
      created();  
    } catch (error) {
      console.log(error)
      alert("problème de communication avec le serveur")
    }*/
    fetchJSONData()
  }, [d]);

  // Not used, maybe in premium version
  /*const login = () => {
    let isLoggedTemp = isLogged;
    setIsLogged(!isLoggedTemp);
  }*/

  // Called when we want to load a room and view data
  const viewRoom = (id) => {
    const roomTmp = classRooms.filter( e => e.id === id);
    setRoom(roomTmp);
    setIsHome(false);
  }

  // API Call to fetch room name and size in m²
  /*const fetchRooms = async () => {
    try {
      const resp = await axios.get(`${baseURL}/classroom/`).then(res => res.data)
      setClassRooms(resp)
      console.log(classRooms)
    } catch (error) {
      console.log("can't fetch room info")
    }
  }*/

  // API Call to fetch room name and size in m²
  /*const fetchRoomInfo = async (id) => {
    try {
      const resp = await axios.get(`${baseURL}/classroom/${id}/`).then(res => res.data)
      setRoomName(resp['name'])
      setRoomSize(resp['volume'])
    } catch (error) {
      console.log("can't fetch room info")
    }
  }*/

  // API Call to fetch actual CO2 Values in PPM and # of people detected in a room
  /*const fetchActual = async (id) => {
    try {
      const resp = await axios.get(`${baseURL}/sensor/${id}/`).then(res => res.data)
      setPeople(resp['sensorsValues'][0].nbrPeoples);
      setCo2(resp['sensorsValues'][0].co2);
    } catch (error) {
      console.log("can't fetch current-values")
    }
  }*/

  // DISABLED - API Call to fetch actual historical CO2 Values in PPM 
  /*const fetchHistorical = async () => {
    try {
      const resp = await axios.get(baseURL + '/historical-values').then(res => res.data)
      setHistorical(resp)
    } catch (error) {
      console.log("can't fetch historical-values")
    }
  }*/

  // API Call to co2 trend 
  /*const fetchTrend = async () => {
    try {
      const resp = await axios.get(baseURL + '/trend').then(res => res.data)
      setTrend(resp)
    } catch (error) {
      console.log("can't fetch trend")
    }
  }*/

  return (
    <Container className="fluid">
      <Row>
        <NavbarComponent setIsHome={setIsHome}></NavbarComponent>
      </Row>
      <br/>
      <Row>
        <Col>
          {isHome ? <Home rooms={classRooms} viewRoom={viewRoom}></Home>
          : 
          <Room room={room} setIsHome={setIsHome}></Room>
          }
        </Col>
      </Row>
    </Container>
  );
}

export default App;
