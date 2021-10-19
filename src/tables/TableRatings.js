import React, {useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';

import '../../node_modules/react-vis/dist/style.css';

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import moment from "moment";


const useStyles = makeStyles({
    table: {
        maxWidth: 600,
    },
});

const tickCount = 12;

let minTick = Infinity;
let maxTick = 0;

const colors = ["#82ca9d", "#445590", "#f36622", "#f3d611"];

const getData = (matches) => {
    let data = [];

    for (let i = matches?.length - 1; i >= 0; i -= 1) {
        const time = moment(matches[i].timestamp * 1000).valueOf();
        if (time < minTick) {
            minTick = time;
        } else if (time > maxTick) {
            maxTick = time;
        }
        matches[i].time = time;
    }
    return matches;
}

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        debugger;

        return (
            <div className="custom-tooltip" style={{padding: "2px", background: "#fcfcfc", border: "1px solid #555555"}}>
                <p className="label">{`${moment(label).format('DD MMM YYYY HH:mm')}`}</p>
                {
                    payload.map((rating,i)=>
                        <p>{rating.name}:{rating.payload.rating}</p>
                    )
                }
            </div>
        );
    }

    return null;
};

const TableRatings = ({ratings, leaderboardNames}) => {

    const classes = useStyles();
    console.log("data: ", ratings[0]);

    const ticks = [];
    const diff = maxTick - minTick;
    for (let i = 0; i <= tickCount; i++) {
        ticks.push(Math.floor(minTick + diff * i / (tickCount + 1)));
    }

    console.log("ticks:", ticks);
    return (
        <div>
            <LineChart width={1230} height={550}
                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis
                    ticks={ticks}
                    dataKey='time'
                    domain={['auto', 'auto']}
                    name='Time'
                    type='number'
                    scale='time'
                    tickFormatter={(unixTime) => moment(unixTime).format('DD MMM YYYY')}
                />
                <YAxis type="number"
                       dataKey="rating"
                       name="rating"
                       domain={['auto', 'auto']}
                />
                {
                    ratings.map((rating, i) =>
                        !rating.hidden &&
                        <Line data={getData(rating.data)} type="monotone" name={leaderboardNames[rating.leaderboardId]} dataKey="rating" stroke={colors[i]}/>
                    )
                }
                //  <Tooltip content={<CustomTooltip />} />
                <Legend/>
            </LineChart>
        </div>
    );
}

export default TableRatings