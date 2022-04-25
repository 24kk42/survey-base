import React, { useCallback } from "react";
import ReactDOM from "react-dom";
import { PieChart, Pie, Sector, Cell, Tooltip, Legend } from "recharts";
import { Button, Grid, makeStyles } from "@material-ui/core";
import * as FileSaver from "file-saver";
import html2canvas from "html2canvas";

const COLORS = ["#0088FE", "#FFBB28", "#FF8042", "#00C49F", "red"];
const RADIAN = Math.PI / 180;

/**
 * Enlarges the slice when hovered over.
 * @param {props: obj} props properties of the piechart
 */
const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
  } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 15}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

/**
 * Renders a label on the slices that shows the data.
 * @param {props} props properties of the piechart
 */
const renderCustomizedLabel = (
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value
) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {value !== 0 && `${value}`}
    </text>
  );
};

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
 * A PieChart component that can use the appropriate dataset depending on the variable given to it.
 * @param {dataSet: string} dataSet determines which dataset to use
 */
export default function Chart({ dataSet, children, title, FooterComponent }) {
  const classes = useStyles();

  const [currentChart, setCurrentChart] = React.useState(null);
  const [activeIndex, setActiveIndex] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [isEmpty, setIsEmpty] = React.useState(true);

  const onMouseOver = useCallback((data, index) => {
    setActiveIndex(index);
  }, []);

  const onMouseLeave = useCallback((data, index) => {
    setActiveIndex(null);
  }, []);

  const init = useCallback(async () => {
    checkIfDataEmpty(dataSet);
    setData(dataSet);
  }, [dataSet]);
  React.useEffect(() => {
    init();
  }, [init]);

  const checkIfDataEmpty = (data) => {
    for (let index in data) {
      for (let prop in data[index]) {
        let temp = data[index][prop];
        if (!isNaN(temp) && temp > 0) {
          setIsEmpty(false);
        }
      }
    }
  };

  async function exportChart() {
    let chart = ReactDOM.findDOMNode(currentChart).cloneNode(true);
    document.body.appendChild(chart);
    chart.style.color = "black";
    chart.style.backgroundColor = "transparent";
    let legend = chart.getElementsByClassName("recharts-legend-item-text");
    for (let el in legend) {
      if (legend[el].className === "recharts-legend-item-text") {
        legend[el].style.color = "black";
      }
    }
    let button = chart.getElementsByTagName("button")[0];
    button.remove();

    centerFooter(chart);
    centerTitle(chart);

    html2canvas(chart, {
      x: 0,//window.pageXOffset + chart.getBoundingClientRect().x,
      y: 0,//window.pageYOffset + chart.getBoundingClientRect().y,
      backgroundColor: "rgba(0,0,0,0)",
    }).then(function (canvas) {
      let png = canvas.toDataURL();
      FileSaver.saveAs(png, "pie-chart.png");
    });
    document.body.removeChild(chart);
  }

  return (
    <div>
      {!isEmpty ? (
        <div className={"pieChart"} ref={(chart) => setCurrentChart(chart)}>
          <Grid container className={classes.header}>
            <Grid item xs={1} />
            <Grid item xs={10}>
              <label className={`pieChartLabel ${classes.chartLabel}`}>{title}</label>
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
          <div>
            <PieChart
              className="pie-chart-component"
              style={{ margin: "0 auto" }}
              width={500}
              height={350}
            >
              <Tooltip wrapperStyle={{ width: 150, backgroundColor: "#ccc" }} />
              <Legend
                payload={data.map((item, index) => ({
                  id: item.name,
                  type: "square",
                  value: `${item.name}: ${item.value}`,
                  color: COLORS[index % COLORS.length],
                }))}
                width={200}
                wrapperStyle={{
                  right: "5%",
                  top: "25%",
                  border: "1px solid #d5d5d5",
                  borderRadius: 3,
                  lineHeight: "40px",
                }}
              />
              <Pie
                isAnimationActive={false}
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                onMouseOver={onMouseOver}
                onMouseLeave={onMouseLeave}
                data={data}
                cx={120}
                cy={150}
                labelLine={false}
                label={(props) =>
                  renderCustomizedLabel(
                    props.cx,
                    props.cy,
                    props.midAngle,
                    props.innerRadius,
                    props.outerRadius,
                    props.value
                  )
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
            {FooterComponent && (
              <div>
                <FooterComponent data={data} />
              </div>
            )}
          </div>
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
            Veri Yok
          </label>
        </div>
      )}
    </div>
  );
}

export function centerFooter(paper) {
  let x = Array.from(window.document.querySelectorAll("*[class*=\"barDateFooter\"]"));
  let y = Array.from(window.document.querySelectorAll("*[class*=\"pieDateFooter\"]"));
  x = x.concat(y);
  let temp = [];
  for(let i = 0; i < x.length; i++) {
    if(!includesClass(temp, x[i])) {
      let className = x[i].className;
      let footer = paper.getElementsByClassName(className);
      if(footer[0]) {
        footer[0].style.textAlign = "center";
        footer[0].style.margin = "0 auto";
        footer[0].style.marginBottom = "60px";
      }
    }
  }
}

export function centerTitle(paper) {
  let x = Array.from(window.document.querySelectorAll("*[class*=\"barChartLabel\"]"));
  let y = Array.from(window.document.querySelectorAll("*[class*=\"pieChartLabel\"]"));
  x = x.concat(y);
  let temp = [];
  for(let i = 0; i < x.length; i++) {
    if(!includesClass(temp, x[i])) {
      temp.push(x[i]);
      let className = x[i].className;
      let title = paper.getElementsByClassName(className);
      if(title[0]) {
        title[0].style.display = "block";
        title[0].style.margin = "0 auto";
        title[0].style.textAlign = "center";
      }
    }
  }
}

function includesClass(arr, obj) {
  for(let i = 0; i < arr.length; i++) {
    if(arr[i].className === obj.className) {
      return true;
    }
  }
  return false;
}