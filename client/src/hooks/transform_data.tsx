import { Test } from "../adapters/tests";
import moment from "moment";
import _ from "lodash";
export const metals = [
  "lead_concentration",
  "arsenic_concentration",
  "cadmium_concentration",
  "mercury_concentration",
];

export const pureTraceLabsColors = [
  "#8f8365",
  "#b2a724",
  "#f4d7a8",
  "#677d4d",
  "#687e4e",
];

export const transformData = (data: Test[]): any => {
  // transform data to each
  let formatedData = {} as any;
  let formatedDates = data.map((test) =>
    moment(test.created_at).format("YYYY/MM/DD HH:mm:ss")
  );
  metals.map(
    (metal) =>
      (formatedData[metal] = {
        name: metal,
        symbolSize: 20,
        data: [],
        type: "scatter",
        encode: {
          x: "timestamp",
        },
      })
  );
  data?.map((test: Test) =>
    metals.forEach((metal) =>
      formatedData[metal]["data"].push([
        moment(test.created_at).format("YYYY/MM/DD HH:mm:ss"),
        test.data[metal as keyof Test["data"]],
      ])
    )
  );
  return {
    series: metals.map((metal) => formatedData[metal]),
    dates: formatedDates,
  };
};
