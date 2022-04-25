import React from "react";
import { makeStyles, Grid, Button } from "@material-ui/core";
import IconTooltipButton from "../Buttons/IconTooltipButton";
import FilterList from "@material-ui/icons/FilterList";

const useStyles = makeStyles((theme) => ({
  applyButton: {},
  clearButton: {},
  buttons: {
    marginTop: 30,
  },
}));

export function TableFiltersButtons({ tableRef, newTableFilters, setFilterProps, clearFilters }) {
  const classes = useStyles();

  return (
    <Grid container className={classes.buttons}>
      <Grid item xs={3}>
        <Button
          variant="outlined"
          className={classes.clearButton}
          onClick={() => {
            clearFilters();
          }}
        >
          Filtreleri Temizle
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant="contained"
          color="primary"
          className={classes.applyButton}
          onClick={() => {
            setFilterProps(newTableFilters);
            tableRef.current && tableRef.current.onQueryChange();
          }}
        >
          Filtreleri Uygula
        </Button>
      </Grid>
      <Grid item xs={3}></Grid>
    </Grid>
  );
}

export function TableFiltersOpenButton({ collapse, setCollapse, setFiltersOpen }) {
  return (
    <IconTooltipButton
        title="Filtreleri Göster"
        onClick={() => {
          setCollapse(!collapse);
          setTimeout(() => {
            setFiltersOpen(!collapse);
          }, 500);
        }}
      >
        <FilterList fontSize="large" />
    </IconTooltipButton>
  )
}
