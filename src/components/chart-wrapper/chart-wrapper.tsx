import React from 'react'
import { visualization } from '../../data/population.json';
import { ChartType } from '../../constants';
import { NotSupported } from '../not-supported/not-supported';
import { RacingChartD3Wrapper } from '../racing-chart-d3/racing-chart-d3-wrapper';


export const ChartWrapper = () => {
  switch(visualization) {
    case ChartType.racingBars:
      return <RacingChartD3Wrapper />
    default:
      return <NotSupported />
  }
}