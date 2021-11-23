import React, {Component} from "react";
import Chart from "react-apexcharts";
import ClassroomService from "../services/classroom.service";

export default class Room extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            classroom: null,
            options: {
                chart: {
                    id: "co2-chart",
                    width: "100%",
                    height: 380,
                },
                // forecastDataPoints: {
                //   count: 10
                // },
                xaxis: {
                    tickAmount: 5
                },
                yaxis: [
                    {
                        title: {
                            text: "Taux de CO2"
                        }
                    },
                    {
                        opposite: true,
                        title: {
                            text: "Nombre de personnes"
                        }
                    }
                ],
            },
            series: []
        };
    }

    initChart() {
        const sensorValues = this.state.classroom.sensor.sensorValues
        const co2 = sensorValues.map(el => el.co2)
        const people = sensorValues.map(el => el.nbrPeoples)
        const createdAt = sensorValues.map(el => {
            const date = new Date(el.createdAt)
            return date.getHours() + ':' + date.getMinutes()
        })
        this.setState({
            series: [...this.state.series, {name: "Taux de CO2", data: co2}, {
                name: 'Nombre de personnes',
                data: people
            }],
            options: {...this.state.options, xaxis: {...this.state.options.xaxis, categories: createdAt}}
        })
    }

    async componentDidMount() {
        this.setState({
            classroom: await ClassroomService.get(this.props.match.params.id).then(res => res.data)
        })
        this.initChart()
        this.setState({loading: false})
    }

    render() {
        return (
            <div className={`${this.state.loading ? "animate-pulse" : ""}`}>
                Salle : {this.state.loading ? '...' : this.state.classroom.name}
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="line"
                />
            </div>
        );
    }
}