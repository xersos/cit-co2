import React, { useEffect, useState } from "react";
import { Container, ListGroup, Row } from "react-bootstrap";
import {BsEye} from "react-icons/bs"

function Home(props){
    const [rooms, setRooms] = useState(props.rooms);

    useEffect(() => {
        setRooms(props.rooms);
    }, [props.rooms]);

    const getListItemBgColor = (co2) => {
        console.log(co2)
        if(co2 < 1400 && co2 >= 400){
            return "warning"
        }else if(co2 >= 1400){
            return "danger"
        }else if(co2 < 400){
            return "success"
        }else{
            return "light"
        }
    }

    return(
        <Container>
            <Row>Mes Salles:</Row>
            <ListGroup>
            {rooms.map((e) => {
            return <Row>
                <ListGroup.Item variant={getListItemBgColor(e.sensor.sensorsValues[e.sensor.sensorsValues.length - 1].co2)}
                    key={e.id} 
                    onClick={() => props.viewRoom(e.id)}>{e.name}
                    <BsEye style={{marginLeft:"90%"}}></BsEye>
                </ListGroup.Item>
            </Row>
            })}
            </ListGroup>
            <Row>Voir tout</Row> {/* TODO: List of all rooms*/} 
        </Container>
    )
}

export default Home
