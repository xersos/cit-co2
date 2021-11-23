import React, {Component} from "react";
import {Link} from "react-router-dom";
import ClassroomService from "../services/classroom.service";


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    };
  }

  // 6199109727ac233e91be5e43
  async componentDidMount() {
    this.setState({
      rooms: await ClassroomService.getAll().then(res => res.data)
    })
  }


  render() {
    const rooms = Array.from(this.state.rooms, (el, i) => (
        <div>
          <Link to={"/room/" + el.id}>{el.name}</Link>
        </div>
    ))
    return (
        <div>
          <span>Liste des salles de classe :</span>
          {rooms}
        </div>
    );
  }
}