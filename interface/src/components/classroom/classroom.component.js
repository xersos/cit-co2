import React, { Component } from "react";
import { connect } from "react-redux";
import { updateClassroom, deleteClassroom } from "../../actions/classroom";
import ClassroomDataService from "../../services/classroom.service";
import Button from 'react-bootstrap/Button'

class Classroom extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeVolume = this.onChangeVolume.bind(this);
    this.onChangeSensor = this.onChangeSensor.bind(this);
    this.getClassroom = this.getClassroom.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeClassroom = this.removeClassroom.bind(this);

    this.state = {
      currentClassroom: {
        id: null,
        name: "",
        volume: "",
        occupied: false,
        sensor: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getClassroom(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentClassroom: {
          ...prevState.currentClassroom,
          name: name,
        },
      };
    });
  }

  onChangeVolume(e) {
    const volume = e.target.value;

    this.setState((prevState) => ({
      currentClassroom: {
        ...prevState.currentClassroom,
        volume: volume,
      },
    }));
  }

  onChangeSensor(e) {
    const sensor = e.target.value;

    this.setState(function (prevState) {
      return {
        currentClassroom: {
          ...prevState.currentClassroom,
          sensor: sensor,
        },
      };
    });
  }

  getClassroom(id) {
    ClassroomDataService.get(id)
      .then((response) => {
        this.setState({
            currentClassroom: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updateClassroom(this.state.currentClassroom.id, this.state.currentClassroom)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The classroom was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeClassroom() {
    this.props
      .deleteClassroom(this.state.currentClassroom.id)
      .then(() => {
        this.props.history.push("/classrooms");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentClassroom } = this.state;

    return (
      <div>
        {currentClassroom ? (
          <div className="edit-form">
            <h4>Classroom</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentClassroom.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="volume">volume</label>
                <input
                  type="text"
                  className="form-control"
                  id="volume"
                  value={currentClassroom.volume}
                  onChange={this.onChangeVolume}
                />
              </div>
              <div className="form-group">
                <label htmlFor="sensor">sensor</label>
                <input
                  type="text"
                  className="form-control"
                  id="sensor"
                  value={currentClassroom.sensor.name}
                  onChange={this.onChangeSensor}
                />
              </div>

            </form>

            <Button 
              type="submit"
              variant="danger" 
              onClick={this.removeClassroom}
              >
                Delete
            </Button>

            <Button
              type="submit" 
              variant="info"
              onClick={this.updateContent}
              >
                Update
            </Button>

            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Classroom...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateClassroom, deleteClassroom })(Classroom);