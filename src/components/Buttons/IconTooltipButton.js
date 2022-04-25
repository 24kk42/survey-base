import React from 'react';
import { Tooltip, IconButton, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  addButton: {
    fontSize: "20px"
  },
  labelButtonContainer: {
    display: "flex", 
    flexDirection: "row", 
    lineHeight: "2", 
    justifyContent: "space-between", 
    columnGap: 5
  }
}));

/**
 * A labeled icon button component.
 * @param {title: string, onClick: func, children: obj} param properties of IconTooltipButton
 */
export default function IconTooltipButton({ title, label, onClick, children, disabled }) {
  const classes = useStyles();
  return (
    <Tooltip title={title}>
      <div>
        {label 
          ?
          <Button disabled={disabled} color="secondary" onClick={onClick} variant="outlined">
            <div className={classes.labelButtonContainer}>
              {children}
              {label}
            </div>
          </Button>
          :  
          <IconButton
            disabled={disabled}
            color="inherit"
            onClick={onClick}
            edge="start"
            className={clsx(classes.addButton)}>
            {children}
          </IconButton>
        }
      </div>
    </Tooltip>
  )
}