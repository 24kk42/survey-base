import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListIcon from '@material-ui/icons/List';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  listItemIcon: {
    color: "#ffffff"
  },
  nested: {
    paddingLeft: theme.spacing(4),
  }
}));

/**
 * A component that renders the drawer sidebar navigation with buttons that link to the pages in the drawerList array.
 * This drawer also contains buttons to switch the language, switch dark/light mode, and close the drawer.
 * @param {open: boolean, drawerList: obj[], darkMode: boolean, setDarkMode: func, setLanguage: func, theme: obj, handleDrawerClose: func} param properties of the drawer component 
 */
export default function RenderMenuItem({ value, index, outer }) {
  const classes = useStyles();
  const history = useHistory();

  const onClick = () => {
    history.push(value?.Path);
  }

  return (
    <ListItem button key={value?.label} onClick={onClick} className={!outer && classes.nested}>
      <ListItemIcon className={classes.listItemIcon} >
        {(index === 0 && outer) ? <HomeIcon /> : <ListIcon />}
      </ListItemIcon>
      <ListItemText primary={value?.label} />
    </ListItem>
  )
}