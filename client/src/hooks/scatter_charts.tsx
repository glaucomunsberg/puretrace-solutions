import * as echarts from "echarts/core";
import { color, init } from "echarts";
import type { ECharts } from "echarts";
import React, { useEffect, useRef, useState } from "react";
import { Test } from "../adapters/tests";
import * as moment from "moment";
import { transformData, metals, pureTraceLabsColors } from "./transform_data";

export interface ScatterChartsData {
  data: Test[];
  loading: boolean;
}

const ScatterCharts = ({ data, loading }: ScatterChartsData) => {
  const echartsScatterChartRef = useRef<HTMLDivElement>(null);

  const [echarsData, setEcharsData] = useState([] as Test[]);

  useEffect(() => {
    setEcharsData(data);
  }, [data]);

  const [echarsScatterChartsOptions, setEcharsScatterChartsOptions] = useState({
    legend: {
      data: [""],
      top: 0,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    color: pureTraceLabsColors,
    dataZoom: [
      {
        type: "slider",
      },
      {
        type: "inside",
      },
    ],
    xAxis: { type: "category", boundaryGap: false, data: [] },
    yAxis: {},
    series: [],
  });

  useEffect(() => {
    //if (data?.length === 0) return;
    const returnedData = transformData(echarsData);
    setEcharsScatterChartsOptions({
      ...echarsScatterChartsOptions,
      series: returnedData.series,
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: returnedData.dates,
      },
      tooltip: {
        trigger: "item",
        axisPointer: {
          type: "cross",
        },
      },
      legend: {
        data: metals,
        top: 0,
      },
    });
  }, [echarsData]);

  useEffect(() => {
    // Initialize chart
    let chart: ECharts | undefined;
    if (echartsScatterChartRef.current !== null) {
      chart = init(echartsScatterChartRef.current, "light");
      chart.setOption(echarsScatterChartsOptions as any);
    }

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    function resizeChart() {
      chart?.resize();
    }
    window.addEventListener("resize", resizeChart);

    // add on click in series
    chart?.on("click", function (params) {
      console.log("click", params);
    });

    // Return cleanup function
    return () => {
      chart?.dispose();
      window.removeEventListener("resize", resizeChart);
    };
  }, [echarsScatterChartsOptions]);

  return (
    <div
      ref={echartsScatterChartRef}
      style={{
        width: "100%",
        height: "400px",
        maxHeight: "450px",
      }}
    />
  );
};

export default ScatterCharts;
