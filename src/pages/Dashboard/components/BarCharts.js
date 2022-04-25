import React from "react";
import { Bar, LabelList } from "recharts";
import BarChart from "../../../components/Chart/BarChart";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red"];
const renderCustomizedLabel = (props) => {
  const { x, y, width, height, value, offset } = props;

  const xOffset = width / 2 + offset - 1;
  const yOffset = height / 2 + 5;

  return (
    <text x={x + xOffset} y={y + yOffset} fill={"black"} textAnchor="end">
      {value === 0 ? "" : value}
    </text>
  );
};

export function UnsuitBarChart({title, data, footer, verticalLabels}) {
  return (
    <BarChart
      verticalLabels={verticalLabels}
      dataSet={data}
      title={title}
      FooterComponent={footer}
    >
      <Bar
        isAnimationActive={false}
        dataKey="Başlanmadı"
        fill={COLORS[0]}
      >
        <LabelList
          dataKey="Başlanmadı"
          position="center"
          content={renderCustomizedLabel}
          style={{ fill: "white" }}
        />
      </Bar>
      <Bar
        isAnimationActive={false}
        dataKey="Onay Bekliyor"
        fill={COLORS[2]}
      >
        <LabelList
          dataKey="Onay Bekliyor"
          position="center"
          content={renderCustomizedLabel}
          style={{ fill: "white" }}
        />
      </Bar>
      <Bar
        isAnimationActive={false}
        dataKey="Süresi Doldu"
        fill={COLORS[3]}
      >
        <LabelList
          dataKey="Süresi Doldu"
          position="center"
          content={renderCustomizedLabel}
          style={{ fill: "white" }}
        />
      </Bar>
    </BarChart>
  )
}

export function ISGBarChart({title, data, footer}) {
  return (
    <BarChart
      dataSet={data}
      title={title}
      FooterComponent={footer}
    >
      <Bar
        isAnimationActive={false}
        dataKey="Başlanmadı"
        fill={COLORS[0]}
      >
        <LabelList
          dataKey="Başlanmadı"
          position="center"
          content={renderCustomizedLabel}
          style={{ fill: "white" }}
        />
      </Bar>
      <Bar
        isAnimationActive={false}
        dataKey="Tamamlandı"
        fill={COLORS[2]}
      >
        <LabelList
          dataKey="Tamamlandı"
          position="center"
          content={renderCustomizedLabel}
          style={{ fill: "white" }}
        />
      </Bar>
      <Bar
        isAnimationActive={false}
        dataKey="Süresi Doldu"
        fill={COLORS[3]}
      >
        <LabelList
          dataKey="Süresi Doldu"
          position="center"
          content={renderCustomizedLabel}
          style={{ fill: "white" }}
        />
      </Bar>
    </BarChart>
  )
}

export function PerDateBarChart({title, data, footer}) {
  return (
    <BarChart
      dataSet={data}
      title={title}
      FooterComponent={footer}
    >
      <Bar
        isAnimationActive={false}
        dataKey="Tamamlanan Görevler"
        fill={COLORS[0]}
      >
        <LabelList
          dataKey="Tamamlanan Görevler"
          position="center"
          content={renderCustomizedLabel}
          style={{ fill: "white" }}
        />
      </Bar>
    </BarChart>
  )
}
