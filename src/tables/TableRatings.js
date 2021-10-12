import React, {useRef, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';

import '../../node_modules/react-vis/dist/style.css';

import {XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, Hint} from 'react-vis';

const useStyles = makeStyles({
    table: {
        maxWidth: 600,
    },
});

const getData = (matches) => {
    let data = [];

    for (let i = matches?.length - 1; i >= 0; i -= 1) {
        data.push({
            "x": new Date(matches[i
                ].timestamp * 1000).getTime(), "y": matches[i].rating
        })
    }
    return data;
}

const TableRatings = ({ratings}) => {

    const classes = useStyles();

    return (
        <div>
            <XYPlot xType="time" height={
                300} width={1600}>
                <HorizontalGridLines
                />
                <VerticalGridLines/>
                <XAxis title="Time"/>
                <YAxis title="Rating"/>
                {
                    ratings.map((rating, i) =>
                        !rating.hidden &&
                        <LineSeries
                            data={getData(rating.data)}
                            lineStyle={{stroke: "red"}}
                            markStyle={{stroke: "blue"}}
                        />
                    )
                }
            </XYPlot>
        </div>
    );
}

export default TableRatings