import React from 'react';
import LanguageHelper from '../../helpers/LanguageHelper';
import { Grid, Select, MenuItem, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  pageSelector: {
    width: "80px"
  }
}));

/**
 * A select component used to change pages.
 * @param {pages: any[], handlePageChange: func, activeStep: number} param properties of PageSelector
 */
export default function PageSelector({ pages, handlePageChange, activeStep }) {
  const language = LanguageHelper.getLanguage();
  const classes = useStyles();
  return (
    <Grid item>
      <Select
        labelId="page-label"
        id="page"
        className={classes.pageSelector}
        value={activeStep}
        onChange={value => handlePageChange(value.target.value)}
      >
        {pages.map((data, index) => {
          return (
            <MenuItem key={index} value={data}>{data + 1}</MenuItem>
          )
        })}
      </Select>
      <FormHelperText id="page-label">{language.form.question}</FormHelperText>
    </Grid>
  )
}