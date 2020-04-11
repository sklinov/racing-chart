import React, { useState, useEffect } from "react";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Cell } from "recharts";
import { getRegionColor } from "../../utils";
import population from "../../data/population.json";
import css from "./racing-chart.module.scss";

export interface DataFormat {
  item: string;
  region: string;
  data: number;
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

const INITIAL_YEAR: number = 1960;
const FINAL_YEAR: number = 1980;

const populationData: PopFormat = JSON.parse(JSON.stringify(population));

export const RacingChart = () => {
  const [currentYear, setCurrentYear] = useState<number>(INITIAL_YEAR);
  const [dataMax, setDataMax] = useState<number>(0);
  const [data, setData] = useState<DataFormat[]>();

  const getTitle = () => {
    const titleOption = populationData.options.find(
      (option) => option.name === "title"
    );
    if (titleOption) return titleOption.value;
  };

  useEffect(() => {
    if (currentYear < FINAL_YEAR) {
      setTimeout(() => setCurrentYear(currentYear + 1), 200);
    }
  }, [currentYear]);

  useEffect(() => {
    const data: DataFormat[] = populationData.data
      .map((dataitem) => {
        return {
          item: dataitem.item,
          data: dataitem.data[currentYear],
          region: dataitem.region,
        };
      })
      .sort((a, b) => b.data - a.data)
      .slice(0, 10);
    setData(data);
    setDataMax(Math.max(...data.map((item) => item.data)));
  }, [currentYear]);

  const renderBarChart = () => {
    return (
      <BarChart
        data={data}
        layout='vertical'
        className={css.chart}
        height={500}
        width={800}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <YAxis dataKey='item' type='category' width={100} />
        <XAxis
          type='number'
          domain={[0, dataMax]}
          interval={1000000}
          label={{
            fill: "red",
            fontSize: "16px",
            fontWeight: 600,
            formatter: (value) =>
              Number.parseInt(value as string).toLocaleString("ch-CH"),
          }}
        />
        <Bar
          isAnimationActive={true}
          dataKey='data'
          label={{
            position: "insideRight",
            fill: "black",
            fontSize: "16px",
            fontWeight: 600,
            formatter: (value) =>
              Number.parseInt(value as string).toLocaleString("ch-CH"),
          }}
        >
          {data &&
            data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getRegionColor(entry.region)}
                className={css.chart}
              />
            ))}
        </Bar>
      </BarChart>
    );
  };

  return (
    <div style={{ marginLeft: "auto", marginRight: "auto" }}>
      <h1>{getTitle()}</h1>
      {renderBarChart()}
      <h3>Current year: {currentYear}</h3>
    </div>
  );
};
