import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import '../../node_modules/react-vis/dist/style.css';

import { XYPlot, LineSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis } from 'react-vis';

const useStyles = makeStyles({
  table: {
    maxWidth: 600,
  },
});

const TableRatings = ({ matches }) => {

  const classes = useStyles();

  var data = [];

  for (var i = matches.length - 1; i >= 0; i -= 1) {
    data.push({ "x": new Date(matches[i].timestamp * 1000).getTime(), "y": matches[i].rating })
  }

  return (
    <div>
      <XYPlot xType="time" height={300} width={1600}>
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis title="Time" />
        <YAxis title="Rating" />
        <LineSeries data={data} lineStyle={{ stroke: "red" }} markStyle={{ stroke: "blue" }} />
      </XYPlot>
    </div>
  );
}

export default TableRatings