import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import moment from "moment";
import SaveAlt from "@material-ui/icons/SaveAlt";
import IconTooltipButton from "../../../components/Buttons/IconTooltipButton";
import ChartsPDF from "../../../components/Reports/ChartsPDF";
import { MonthPicker } from "../../../components/Selectors/DatePickers";

const fixedHeight = 500;

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "hidden",
    flexDirection: "column",
  },
  textField: {
    width: "90%",
    margin: 10,
  },
}));

export function ExportButton({ setBackdropLoading }) {
  const classes = useStyles();

  const exportPdf = async () => {
    setBackdropLoading(true);
    ChartsPDF(
      document.getElementsByClassName(
        "MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"
      )[1],
      fixedHeight,
      setBackdropLoading
    );
  };

  return (
    <Grid item>
      <Paper className={classes.paper} style={{ height: 100, width: 100 }}>
        <div style={{ margin: "auto", marginLeft: "32%" }}>
          <IconTooltipButton title="PDF Olarak İndir" onClick={exportPdf}>
            <SaveAlt />
          </IconTooltipButton>
        </div>
      </Paper>
    </Grid>
  );
}

export function DateSettings({ startDate, setStartDate, endDate, setEndDate }) {
  const classes = useStyles();
  
  return (
    <Grid item xs={8}>
      <Paper className={classes.paper} style={{ height: 100 }}>
          <MonthPicker
            style={classes.textField}
            label="Tarih"
            value={moment(startDate).add(3, "hour")}
            shrink={startDate}
            onChangeFunc={(value) => {
              setStartDate(moment(value).set("date", 1).set("hour", 0).set("minute", 0).toISOString(true));
              setEndDate(moment(value).set("date", 1).set("hour", 23).set("minute", 59).add(1, "month").add(-1, "days").toISOString(true));
            }}
          />
      </Paper>
    </Grid>
  );
}

/* <Grid item xs={6}>
    <CustomDatePicker
      style={classes.textField}
      label="Bitiş Tarihi"
      value={moment(endDate)}
      shrink={endDate}
      onChangeFunc={(value) =>
        setEndDate(moment(value).set("hour", 23).set("minute", 59).toISOString(true))
      }
    />
  </Grid> */