import React, { useCallback } from "react";
import ReactDOM from "react-dom";
import * as FileSaver from "file-saver";
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Text,
  ResponsiveContainer,
} from "recharts";
import { Button, Grid, makeStyles } from "@material-ui/core";
import html2canvas from "html2canvas";
import { centerFooter, centerTitle } from "./PieChart";

const useStyles = makeStyles((theme) => ({
  chartContainer: {
    display: "flex",
    flexDirection: "column",
  },
  chartLabel: {
    fontSize: 20,
    textAlign: "left",
    margin: "0 auto",
  },
  button: {
    float: "right",
  },
  header: {
    marginBottom: 20,
  }
}));

/**
 * A BarChart component that can use the appropriate dataset depending on the variable given to it.
 * @param {dataSet: string} dataSet determines which dataset to use
 */
export default function Chart({ dataSet, children, title, FooterComponent }) {
  const darkMode = localStorage.getItem("darkMode");
  const classes = useStyles();

  const [labelHeight, setLabelHeight] = React.useState(30);
  const [isEmpty, setIsEmpty] = React.useState(true);
  const [overflow, setOverflow] = React.useState(false);
  const [currentChart, setCurrentChart] = React.useState(null);
  const [data, setData] = React.useState([]);

  const checkIfDataEmpty = useCallback((data) => {
    setIsEmpty(true);
    for (let index in data) {
      for (let prop in data[index]) {
        let temp = data[index][prop];
        if (!isNaN(temp) && temp > 0) {
          setIsEmpty(false);
        }
      }
    }
  }, []);

  const init = useCallback(async () => {
    setData(dataSet);
    dataSet &&
      setLabelHeight(dataSet.length > 10 ? 120 : getLabelHeight(dataSet));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSet, labelHeight]);
  React.useEffect(() => {
    init();
    checkIfDataEmpty(dataSet);
    dataSet && dataSet.length > 100 && setOverflow(true);
  }, [init, checkIfDataEmpty, dataSet]);

  async function exportChart() {
    let chart = ReactDOM.findDOMNode(currentChart).cloneNode(true);
    document.body.appendChild(chart);
    chart.style.color = "black";
    chart.style.backgroundColor = "transparent";
    let toolbar = chart.getElementsByClassName("recharts-wrapper")[0];
    toolbar.style.color = "black";
    let texts = chart.getElementsByTagName("text");
    let button = chart.getElementsByTagName("button")[0];
    button.remove();
    for (let index in texts) {
      if (texts[index].style) {
        texts[index].style.fill = "black";
      }
    }

    centerFooter(chart);
    centerTitle(chart);

    html2canvas(chart, {
      x: 0,
      y: 0,
      backgroundColor: "rgba(0,0,0,0)",
    }).then(function (canvas) {
      let png = canvas.toDataURL();
      FileSaver.saveAs(png, "bar-chart.png");
    });
    document.body.removeChild(chart);
  }

  const getLabelHeight = (data) => {
    let height = 30;
    for (let index in data) {
      const str = data[index].name;
      const newHeight = 30 + (countWords(str) - 1) * 15;
      if (newHeight > height) {
        height = newHeight;
      }
    }
    return height;
  };

  const countWords = (str) => {
    return str ? str.trim().split(/\s+/).length : 1;
  };

  const CustomizedAxisTick = ({ props }) => {
    const { x, y, payload } = props;
    const color = darkMode === "true" ? "white" : "black";

    return (
      <Text
        x={x}
        y={y}
        width={100}
        angle={data.length > 10 ? -55 : 0}
        style={{ fill: color }}
        textAnchor={data.length > 10 ? "end" : "middle"}
        verticalAnchor="start"
      >
        {payload.value}
      </Text>
    );
  };

  return (
    <div>
      {!isEmpty && !overflow ? (
        <div className={"barChart"} ref={(chart) => setCurrentChart(chart)}>
          {/* TITLE */}
          <Grid container className={classes.header}>
            <Grid item xs={1} />
            <Grid item xs={10}>
              <label className={`barChartLabel ${classes.chartLabel}`}>{title}</label>
            </Grid>
            <Grid item xs={1}>
              <Button
                onClick={exportChart}
                variant="outlined"
                className={classes.button}
              >
                İNDİR
              </Button>
            </Grid>
          </Grid>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              className="bar-chart-component"
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              style={{ margin: "0 auto" }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                height={labelHeight}
                interval={0}
                dataKey="name"
                id={"xAxis"}
                stroke={darkMode === "true" ? "white" : "black"}
                tick={(props) => <CustomizedAxisTick props={props} />}
              />
              <YAxis id={"yAxis"} stroke={darkMode === "true" ? "white" : "black"} />
              <Tooltip />
              <Legend />
              {children}
            </BarChart>
          </ResponsiveContainer>
          {FooterComponent && (
            <div>
              <FooterComponent data={data} />
            </div>
          )}
        </div>
      ) : (
        <div>
          <label className={classes.chartLabel}>{title}</label>
          <label
            className={"noDataLabel"}
            style={{
              display: "block",
              marginTop: 10,
              fontSize: 16,
              color: "red",
            }}
          >
            {overflow ? "Veri Çok Büyük" : "Veri Yok"}
          </label>
        </div>
      )}
    </div>
  );
}
