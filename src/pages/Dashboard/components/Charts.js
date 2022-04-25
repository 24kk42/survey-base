import React, { useCallback } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PieChart from "../../../components/Chart/PieChart";
import BarChart from "../../../components/Chart/BarChart";
import SessionHelper from "../../../helpers/SessionHelper";
import { getAuthorizationForPage } from "../../../helpers/AuthorizationHelper";
import moment from "moment";
import { Bar, LabelList } from "recharts";
import {
    getInspections,
    getBarDataPerDepartment,
    getUnsuitDataPerUser,
    getPersonalGoals,
    getUnsuitData,
    getInspectionDataPerUser,
    getTasksPerDate
} from '../../../components/Chart/ChartData';
import { inspectionTypes } from '../../../assets/constants';
import { ISGBarChart, UnsuitBarChart, PerDateBarChart } from './BarCharts';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red"];
const fixedHeight = 500;

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "hidden",
    flexDirection: "column",
  },
  fixedHeight: {
    maxHeight: fixedHeight,
  },
  footerComponent: {
    display: "flex",
    flexDirection: "column",
  },
  dateFooter: {
    marginTop: 30,
    marginLeft: 0,
    marginRight: "auto",
  },
}));

/**
 * A dashboard component that renders charts depending on the role of the user.
 */
export default function Charts({startDate, endDate, setBackdropLoading}) {
  const user = SessionHelper.getUser();
  const roles = SessionHelper.getUser().roles;
  const isAdmin = user?.roles.includes("ROLE_SİSTEM_ADMİNİ");
  const authorization = getAuthorizationForPage(roles, "dashboard");
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [personalGoalsData, setPersonalGoalsData] = React.useState(null);
  const [inspectionsData, setInspectionsData] = React.useState(null);
  const [personalInspectionsData, setPersonalInspectionsData] = React.useState(null);
  const [personalUnsuitData, setPersonalUnsuitData] = React.useState(null);
  const [inspectionsForDepartmentData, setInspectionsForDepartmentData] = React.useState(null);
  const [unsuitableData, setUnsuitableData] = React.useState(null);
  const [companyUnsuitableData, setCompanyUnsuitableData] = React.useState(null);
  const [perUserForCompanyData, setPerUserForCompanyData] = React.useState(null);
  const [perUserForDepartmentData, setPerUserForDepartmentData] = React.useState(null);
  const [unsuitPerUserForDepartmentData, setUnsuitPerUserForDepartmentData] = React.useState(null);
  const [unsuitPerUserForCompanyData, setUnsuitPerUserForCompanyData] = React.useState(null);
  const [perDepartmentData, setPerDepartmentData] = React.useState(null);
  const [tasksPerDateData, setTasksPerDateData] = React.useState(null);

  const init = useCallback(async () => {
    setBackdropLoading(true);
    const currentUser = user?.id;
    const department = user?.department?.id;
    const company = isAdmin ? -1 : user?.company?.id;
    const [
      personalGoals, 
      inspections, 
      personalInspections, 
      personalUnsuit, 
      inspectionsForDepartment,
      unsuitable,
      companyUnsuitable,
      perUserForCompany,
      perUserForDepartment,
      unsuitPerUserForDepartment,
      unsuitPerUserForCompany,
      perDepartment,
      tasksPerDate
    ] = await Promise.all([
      getPersonalGoals(startDate, endDate), 
      getInspections(startDate, endDate, company, null, null), 
      getInspections(startDate, endDate, null, null, currentUser),
      getUnsuitData(startDate, endDate, currentUser, null, null), 
      getInspections(startDate, endDate, null, department, null),
      getUnsuitData(startDate, endDate, null, null, department),
      getInspectionDataPerUser(startDate, endDate, company, null),
      getInspectionDataPerUser(startDate, endDate, null, department),
      getUnsuitDataPerUser(startDate, endDate, null, department),
      getUnsuitDataPerUser(startDate, endDate, company, null),
      getBarDataPerDepartment(startDate, endDate),
      getTasksPerDate(moment(endDate))
    ])
    setPersonalGoalsData(formatDataForPersonalGoalsChart(personalGoals));
    setInspectionsData(formatDataForPieCharts(inspections)); //COMPANY INSPECTIONS
    setPersonalInspectionsData(formatDataForPieCharts(personalInspections)); //PERSONAL INSPECTIONS
    setPersonalUnsuitData(formatDataForPieCharts(personalUnsuit, true)); //PERSONAL UNSUIT INSPECTIONS
    setInspectionsForDepartmentData(formatDataForPieCharts(inspectionsForDepartment)); //DEPARTMENT INSPECTIONS
    setUnsuitableData(formatDataForPieCharts(unsuitable, true)); //DEPARTMENT UNSUIT INSPECTIONS
    setCompanyUnsuitableData(formatDataForPieCharts(companyUnsuitable, true)); //COMPANY UNSUIT INSPECTIONS
    setPerUserForCompanyData(formatDataForBarCharts(perUserForCompany)); //COMPANY INSPECTIONS
    setPerUserForDepartmentData(formatDataForBarCharts(perUserForDepartment)); //DEPARTMENT INSPECTIONS
    setUnsuitPerUserForDepartmentData(formatDataForBarCharts(unsuitPerUserForDepartment, true)); //DEPARTMENT UNSUIT INSPECTIONS
    setUnsuitPerUserForCompanyData(formatDataForBarCharts(unsuitPerUserForCompany, true)); //COMPANY UNSUIT INSPECTIONS
    setPerDepartmentData(formatDataForBarCharts(perDepartment));
    setTasksPerDateData(formatDataForDateBarChart(tasksPerDate));
    setBackdropLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endDate, startDate, user]);
  React.useEffect(() => {
    init();
  }, [init]);

  /**
   * Formats the data array to use with the chart.
   * @param {data: obj[]} data chart data to format
   * @return {obj[]} formatted data
   */
  const formatDataForBarCharts = (data, unsuit) => {
    let chartData = [];
    for (let p in data) {
      let name = "";
      let row = {};
      for (let prop in data[p]) {
        if (data[p][prop] !== null) {
          if (prop === "todo") {
            row["Başlanmadı"] = data[p][prop];
          } else if (prop === "done") {
            row[unsuit ? "Onay Bekliyor" : "Tamamlandı"] = data[p][prop];
          } else if (prop === "expired") {
            row["Süresi Doldu"] = data[p][prop];
          } else if (prop === "userName" || prop === "departmentName") {
            name = data[p][prop];
          }
        }
      }
      row.name = name;
      chartData.push(row);
    }
    return chartData;
  };

  const formatDataForDateBarChart = (data) => {
    let chartData = [];
    for (let p in data) {
      const row = {name: p, "Tamamlanan Görevler": data[p]};
      chartData.push(row);
    }
    return chartData;
  };

  /**
   * Formats the data array to use with the chart.
   * @param {data: obj[]} data chart data to format
   * @return {obj[]} formatted data
   */
  const formatDataForPieCharts = (data, unsuit) => {
    let chartData = [];
    for (let prop in data) {
      if (data[prop] !== null && data[prop] > -1) {
        let name = "";
        if (prop === "approved") {
          name = "Onaylandı";
        } else if (prop === "todo") {
          name = "Başlanmadı";
        } else if (prop === "done") {
          name = unsuit ? "Onay Bekliyor" : "Tamamlandı";
        } else if (prop === "expired") {
          name = "Tarihi Geçti";
        }
        let row = {
          name: name,
          value: data[prop],
        };
        chartData.push(row);
      }
    }
    return chartData;
  };

  const formatDataForPersonalGoalsChart = (dat) => {
    let chartData = [];
    let data = dat.statistics;
    for (let p in data) {
      let name = "";
      let row = {};
      for (let prop in data[p]) {
        if (data[p][prop] !== null) {
          if (prop === "goalInMonths") { row["Hedef"] = data[p][prop] }
          else if (prop === "completedInspections") { row["Gerçekleşen"] = data[p][prop] }
          else if (prop === "type") { name = inspectionTypes[`${data[p][prop]}`] }
        }
      }
      row.name = name;
      chartData.push(row);
    };
    return chartData;
  }

  const DateFooter = (type) => {
    let className = "";
    if(type === "bar") {
      className = `barDateFooter ${classes.dateFooter}`;
    } else if(type === "pie") {
      className = `pieDateFooter ${classes.dateFooter}`;
    } else {
      className = classes.dateFooter;
    }
    return (
      <div className={classes.footerComponent}>
        <label className={className}>
          {moment(startDate).format("DD/MM/YYYY") +
            " - " +
            moment(endDate).format("DD/MM/YYYY")}
        </label>
      </div>
    );
  };

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

  return (
    <Grid container spacing={3}>
      {/* CHARTS */}
      {authorization.personalGoals && 
      <Grid item xs={12}> 
        <Paper className={fixedHeightPaper}>
          <BarChart 
            dataSet={personalGoalsData} 
            title={"İSG Denetim Hedeflerim"}
            FooterComponent={() => DateFooter("bar")}>
            <Bar isAnimationActive={false} dataKey="Hedef" fill={COLORS[0]} >
              <LabelList
                dataKey="Hedef" position="center" content={renderCustomizedLabel} style={{ fill: "white" }}
              />
            </Bar>
            <Bar isAnimationActive={false} dataKey="Gerçekleşen" fill={COLORS[1]} >
              <LabelList
                dataKey="Gerçekleşen" position="center" content={renderCustomizedLabel} style={{ fill: "white" }}
              />
            </Bar>
          </BarChart>
        </Paper>
      </Grid>}
      {authorization.personalTasks && (
        <Grid item xs={12} md={6} lg={6}>
          <Paper className={fixedHeightPaper}>
            <PieChart
              dataSet={personalInspectionsData}
              title={"İSG Denetim Görevlerim"}
              FooterComponent={() => DateFooter("pie")}
            />
          </Paper>
        </Grid>
      )}
      {authorization.personalUnsuitTasks && (
        <Grid item xs={12} md={6} lg={6}>
          <Paper className={fixedHeightPaper}>
            <PieChart
              dataSet={personalUnsuitData}
              title={"Uygunsuzluk Giderme Görevlerim"}
              FooterComponent={() => DateFooter("pie")}
            />
          </Paper>
        </Grid>
      )}
      {authorization.departmentTasks && (
        <Grid item xs={12} md={6} lg={6}>
          <Paper className={fixedHeightPaper}>
            <PieChart
              dataSet={inspectionsForDepartmentData}
              title={"Bölümün İSG Denetim Görevleri Durumları"}
              FooterComponent={() => DateFooter("pie")}
            />
          </Paper>
        </Grid>
      )}
      {authorization.companyTasks && (
        <Grid item xs={12} md={6} lg={6}>
          <Paper className={fixedHeightPaper}>
            <PieChart
              dataSet={inspectionsData}
              title={"Şirketin İSG Denetim Görevi Durumları"}
              FooterComponent={() => DateFooter("pie")}
            />
          </Paper>
        </Grid>
      )}
      {authorization.departmentUnsuitTasks && (
        <Grid item xs={12} md={6} lg={6}>
          <Paper className={fixedHeightPaper}>
            <PieChart
              dataSet={unsuitableData}
              title={"Bölümün Uygunsuzluk Giderme Görevi Durumları"}
              FooterComponent={() => DateFooter("pie")}
            />
          </Paper>
        </Grid>
      )}
      {authorization.companyUnsuitTasks && (
        <Grid item xs={12} md={6} lg={6}>
          <Paper className={fixedHeightPaper}>
            <PieChart
              dataSet={companyUnsuitableData}
              title={"Şirketin Uygunsuzluk Giderme Görevi Durumları"}
              FooterComponent={() => DateFooter("pie")}
            />
          </Paper>
        </Grid>
      )}
      {authorization.tasksPerDate && (
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>
            <PerDateBarChart
              data={tasksPerDateData}
              title={"YGK Denetimleri"}
              footer={() => DateFooter("bar")}
            />
          </Paper>
        </Grid>
      )}
      {authorization.departmentTasksPerUser && (
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>
            <ISGBarChart
              data={perUserForDepartmentData}
              title={"Bölümün Kişi Bazlı İSG Denetim Görevi Durumları"}
              footer={() => DateFooter("bar")}
            />
          </Paper>
        </Grid>
      )}
      {authorization.companyTasksPerUser && (
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>
            <ISGBarChart
              data={perUserForCompanyData}
              title={"Şirketin Kişi Bazlı İSG Denetim Görevi Durumları"}
              footer={() => DateFooter("bar")}
            />
          </Paper>
        </Grid>
      )}
      {authorization.departmentUnsuitTasksPerUser && (
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>
            <UnsuitBarChart
              data={unsuitPerUserForDepartmentData}
              title={"Bölümün Kişi Bazlı Uygunsuzluk Giderme Görevi Durumları"}
              footer={() => DateFooter("bar")}
            />
          </Paper>
        </Grid>
      )}
      {authorization.companyUnsuitTasksPerUser && (
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>
            <UnsuitBarChart
              data={unsuitPerUserForCompanyData}
              title={"Şirketin Kişi Bazlı Uygunsuzluk Giderme Görevi Durumları"}
              footer={() => DateFooter("bar")}
            />
          </Paper>
        </Grid>
      )}
      {authorization.tasksPerDepartment && (
        <Grid item xs={12}>
          <Paper className={fixedHeightPaper}>
            <ISGBarChart
              verticalLabels
              data={perDepartmentData}
              title={"Bölüm Bazlı İSG Denetim Görevi Durumları"}
              footer={() => DateFooter("bar")}
            />
          </Paper>
        </Grid>
      )}
    </Grid>
  );
}
