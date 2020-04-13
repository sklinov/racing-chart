import React, { useState, useEffect } from "react";
import population from "../../data/population.json";
import css from "./racing-chart-d3.module.scss";
import { RacingBarChartD3 } from "./racing-chart-d3";

export interface DataFormat {
  item: string;
  region: string;
  data: number;
  image: string;
}

export interface InitialDataFormat {
  item: string;
  image: string;
  region: string;
  data: number[];
}

export interface Option {
  [key: string]: string;
}

export interface PopFormat {
  visualization: string;
  options: Option[];
  data: InitialDataFormat[];
}

const initialData: DataFormat[] = [
  {
    item: "1",
    region: "1",
    data: 1,
    image: '1'
  },
];

const INITIAL_YEAR: number = 1960;
const FINAL_YEAR: number = 2017;
const TOP: number = 10;

const populationData: PopFormat = JSON.parse(JSON.stringify(population));

export const RacingChartD3Wrapper = () => {
  const [currentYear, setCurrentYear] = useState<number>(INITIAL_YEAR);;
  const [data, setData] = useState<DataFormat[]>(initialData);

  const getTitle = () => {
    const titleOption = populationData.options.find(
      (option) => option.name === "title"
    );
    if (titleOption) return titleOption.value;
  };

  useEffect(() => {
    if (currentYear < FINAL_YEAR) {
      setTimeout(() => setCurrentYear(currentYear + 1), 180);
    }
  }, [currentYear]);

  useEffect(() => {
    const data: DataFormat[] = populationData.data
      .map((dataitem) => {
        return {
          item: dataitem.item,
          data: dataitem.data[currentYear],
          region: dataitem.region,
          image: dataitem.image,
        };
      })
      .sort((a, b) => b.data - a.data)
      .slice(0, TOP);
    setData(data);
  }, [currentYear]);

  return (
    <>
      <h1 className={css.header}>{getTitle()}</h1>
      <h1 className={css.currentYear}>{currentYear}</h1>
      <RacingBarChartD3 data={data} />
    </>
  );
};
