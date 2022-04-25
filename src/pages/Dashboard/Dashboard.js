import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Copyright from "../../components/Footer/Copyright";
import moment from "moment-timezone";
import TableBackdrop from "../../components/Table/TableBackdrop";
import { ExportButton, DateSettings } from "./components/Settings";
import Charts from "./components/Charts";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    height: "100vh",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  copyright: {
    position: "relative",
    bottom: 0,
  },
}));

/**
 * A dashboard component that renders charts depending on the role of the user.
 */
export default function Dashboard() {
  const classes = useStyles();

  const [backdropLoading, setBackdropLoading] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new moment().set("date", 1).set("hour", 0).set("minute", 0).toISOString(true));
  const [endDate, setEndDate] = React.useState(new moment().add("month", 1).set("date", 1).set("hour", 23).set("minute", 59).add("days", -1).toISOString(true));

  return (
    <div className={classes.root}>
      <TableBackdrop backdropLoading={backdropLoading} />
      <CssBaseline />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3} justify="space-between">
            <DateSettings
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
            />
            <ExportButton setBackdropLoading={setBackdropLoading} />

            <Charts startDate={startDate} endDate={endDate} setBackdropLoading={setBackdropLoading} />
          </Grid>
        </Container>
        <Box pt={4} className={classes.copyright}>
          <Copyright
            string={"DELTA Smart Technologies"}
            url={"https://deltasmart.tech/en/home/"}
            date={new Date().getFullYear()}
          />
        </Box>
      </main>
    </div>
  );
}
