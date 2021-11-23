import React, { useEffect, useState } from "react";
import { Container, Row, Card, Button, Col } from "react-bootstrap";
import ChartForecastComponent from "../Components/ChartForecastComponent";
import ChartCO2PeopleComponent from "../Components/ChartCO2PeopleComponent";
import ChartCO2Component from "../Components/ChartCO2Component"
import {IconContext} from "react-icons";
import {BsPersonFill, BsClockFill} from "react-icons/bs"
import {HiArrowDown, HiArrowUp} from "react-icons/hi"
import QRCode from "react-qr-code";

function Room(props){
    // Room data is stored here
    const [room, setRoom] = useState({});
    // We show charts based on those vars
    const [co2Chart, setCo2Chart] = useState(false);
    const [forecastChart, setForecastChart] = useState(true);
    const [co2PersonChart, setCo2PersonChart] = useState(false);
    const [showQr, setShowQr] = useState(false);
    const [trend, setTrend] = useState(0);
    // Set room data on load
    useEffect(() => {
        setRoom(props.room[0]);
        const setRandomsTrend = () => {
            let r = Math.random(0, 1);
            r = Math.round(r)
            setTrend(r)
            console.log(r)
        }
        setInterval(() => {
            setRandomsTrend()
        }, 3 * 1000)
        setRandomsTrend()
    },[props.room[0]])

    const setChart = (chart) => {
        switch (chart) {
            case "CO2":
                setCo2Chart(true);
                setForecastChart(false);
                setCo2PersonChart(false);
                break;
            case "FORE":
                setCo2Chart(false);
                setForecastChart(true);
                setCo2PersonChart(false);
                break;
            case "PERS":
                setCo2Chart(false);
                setForecastChart(false);
                setCo2PersonChart(true);
                break;
            default:
                setCo2Chart(true);
                setForecastChart(false);
                setCo2PersonChart(false);
                break;
        }
    }

    return(
        <Container>
            <Row>
                <Col>
                    <Card style={{ width: '100%' }}>
                        <Card.Header as="h4">Salle: {room.name}</Card.Header>
                        <Card.Body>
                            {showQr ? 
                            <Row className="justify-content-md-center">
                                <Col md="auto"><QRCode value="hey" /></Col>
                            </Row> :
                            <Container>
                                <Row onClick={() => setChart("CO2")} style={co2Chart ? {backgroundColor:"#ccdbe6"} : {}}>
                                    <Col>
                                        <Card.Text style={{fontWeight:"bold"}}>CO2</Card.Text>
                                    </Col>
                                    <Col>
                                        <Card.Text>{props.room[0].sensor.sensorsValues[0].co2} ppm</Card.Text>
                                    </Col>
                                    <Col>
                                        <Card.Text>{room.status}</Card.Text>
                                    </Col>
                                </Row>
                                <hr style={{margin:"8px"}}/>
                                <Row onClick={() => setChart("PERS")} style={co2PersonChart ? {backgroundColor:"#ccdbe6"} : {}}>
                                    <Col>
                                        <BsPersonFill />
                                    </Col>
                                    <Col>
                                        <Card.Text>{props.room[0].sensor.sensorsValues[0].nbrPeoples}</Card.Text>
                                    </Col>
                                    <Col>
                                    </Col>
                                </Row>
                                <hr style={{margin:"8px"}}/>
                                <Row onClick={() => setChart("FORE")} style={forecastChart ? {backgroundColor:"#ccdbe6"} : {}}>
                                    <Col>
                                        <BsClockFill />
                                    </Col>
                                    
                                    <Col>
                                        <IconContext.Provider value={{ color: trend === 1 ? "red" : "green", className: "global-class-name" }}>
                                            <Card.Text>
                                                {trend === 1 ?
                                                <HiArrowUp /> 
                                                : <HiArrowDown />} 
                                                {trend === 1 ?
                                                <>{" 1400 ppm"}</> 
                                                :<>{" 0 ppm"}</> 
                                                }
                                            </Card.Text>
                                        </IconContext.Provider>
                                    </Col>
                                    <Col>
                                    </Col>
                                </Row>
                                <hr style={{marginTop:"8px"}}/>
                                <Row>
                                    <Col>
                                        {
                                            co2Chart ? <ChartCO2Component data={{name: room.name, data: room.sensor}}></ChartCO2Component>
                                            : forecastChart ? <ChartForecastComponent data={{name: room.name, co2: room.co2Data, time: room.time}}></ChartForecastComponent> 
                                            : co2PersonChart ? <ChartCO2PeopleComponent data={{name: room.name, data:room.sensor}}></ChartCO2PeopleComponent>
                                            : <></>
                                        }
                                    </Col>
                                </Row>
                                <hr/>
                            </Container>
                            }
                            <Row>
                                <Col className="col-9">
                                    <Button variant="primary" onClick={() => props.setIsHome(true)}>Retour</Button>
                                </Col>
                                <Col>
                                    <Button variant="primary" onClick={() => setShowQr(!showQr)}>{showQr ? "Cacher " : "Afficher "} Code QR</Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Room
