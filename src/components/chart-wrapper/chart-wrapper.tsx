import React from 'react'
import { visualization } from '../../data/population.json';
import { ChartType } from '../../constants';
import { RacingChart } from '../racing-chart/racing-chart';
import { NotSupported } from '../not-supported/not-supported';

export const ChartWrapper = () => {
  switch(visualization) {
    case ChartType.racingBars:
      return <RacingChart />
    default:
      return <NotSupported />
  }
}