import React from "react"
import * as _ from 'underscore'
import * as moment from 'moment';


import data from "../data/data"


export default class GetClosestTimes extends React.Component {

    // get Departures time By Weekday
    getDeparturesByWeekday(weekday, time) {
        let departureTimes = [];
        _.map(data, (data) => {
            if (data[weekday]) {
                departureTimes = data.departures;
                return departureTimes;
            }
        });
        return this.displayClosestTime(departureTimes, time);
    }

    displayClosestTime(times, currentTime) {
        // Current time in millis
        const now = +moment(currentTime, 'HH:mm').format('x');
        // Times in milliseconds
        const timesInMillis = times.map(t => +moment(t, "HH:mm").format("x"));
        // closest time:
        const closest = moment(this.closestTime(timesInMillis, now)).format('HH:mm');
        // index of closest time
        const indexOfClosest = times.indexOf(closest);

        return (
            <div>
                <div>
                    {/* if index of closest time  bigger than 1*/}
                    {indexOfClosest > 1 && <div>
                        <div>{times[indexOfClosest - 2]}</div>
                        <div>{times[indexOfClosest - 1]}</div>
                    </div>}
                    {/* if index of closest time is 0 this is first bus for today*/}
                    {indexOfClosest === 0 && <div>first bus for today</div>}
                </div>
                <div><b>{times[indexOfClosest]}</b></div>
                <div>
                    {/* if index of closest time  smaller  than array of departure times length*/}
                    {indexOfClosest < times.length - 3 && <div>
                        <div>{times[indexOfClosest + 1]}</div>
                        <div>{times[indexOfClosest + 2]}</div>
                    </div>}
                    {/* if index of closest time is last index in array of departure times  this is last bus for today*/}
                    {indexOfClosest === times.length-1 && <div>last bus for today</div>}
                </div>
            </div>
        );

    }
    // find Closest time
    closestTime(arr, time) {
        return arr.reduce(function (prev, curr) {
            return Math.abs(curr - time) < Math.abs(prev - time) ? curr : prev;
        });
    }


    render() {
        return (
            <div>
                {this.getDeparturesByWeekday(this.props.weekday, this.props.time)}
            </div>
        )
    }
}