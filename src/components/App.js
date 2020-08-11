import React from 'react';
import '../styles/App.scss';
import GetClosestTimes from "./GetClosestTimes";
// React Date Picker:
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const options = {weekday: 'long'};
const date = new Date();
export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            startDate: date,
            weekday: date.toLocaleDateString('en-US', options).toLowerCase(),
            time: `${date.getHours()}:${date.getMinutes()}`,
            findTime: false
        };
        this.onClickFind = this.onClickFind.bind(this);
    }

    // Change date and time
    handleChange = date => {
        this.setState({
            startDate: date,
            weekday: date.toLocaleDateString('en-US', options).toLowerCase(),
            time: `${date.getHours()}:${date.getMinutes()}`
        });
    };

    // click to find closest departure times
    onClickFind(){
        this.setState({
            findTime:true
        })

    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <p>
                        Trip Planner
                    </p>
                </header>
                <div className="datePicker">
                <span> Pick date & Time:</span>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy HH:mm"
                />
                </div>
                <button onClick={this.onClickFind}>Find Time! </button>



                {this.state.findTime &&
                <div className="departureTimes">
                    <div>Departure Times:</div>
                <GetClosestTimes
                    weekday={this.state.weekday}
                    time={this.state.time}
                />
                </div>}


            </div>
        );
    }
}




