import React from 'react';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { url } from '../../../helpers/Request';
import Settings from '../../Buttons/Settings';
import MenuItems from './MenuItems';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    maxWidth: drawerWidth + 20,
    flexShrink: 0,
  },
  drawerPaper: {
    color: '#ffffff',
    backgroundColor: '#2D3446',
    width: drawerWidth,
    maxWidth: drawerWidth + 20
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',//justifyContent: 'space-between',
  },
  drawerButtonIcon: {
    color: "#ffffff"
  },
  helpIcon: {
    color: "#ffffff",
  },
  options: {
    marginTop: 'auto',
    marginBottom: 25,
    marginLeft: "auto",
    marginRight: "auto"
  }
}));

/**
 * A component that renders the drawer sidebar navigation with buttons that link to the pages in the drawerList array.
 * This drawer also contains buttons to switch the language, switch dark/light mode, and close the drawer.
 * @param {open: boolean, drawerList: obj[], darkMode: boolean, setDarkMode: func, setLanguage: func, theme: obj, handleDrawerClose: func} param properties of the drawer component 
 */
export default function NavDrawer({ open, drawerList, darkMode, setDarkMode, setLanguage, theme, handleDrawerClose }) {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        {/* <IconButton onClick={() => window.open("help")}>
          <HelpOutlineIcon className={classes.helpIcon}/>
        </IconButton> */}
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon className={classes.drawerButtonIcon} /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        <MenuItems drawerList={drawerList} />
      </List>

      <div className={classes.options}>
        <Settings darkMode={darkMode} setDarkMode={setDarkMode} setLanguage={setLanguage} />
      </div>

      <label style={{marginBottom: 10}}>{
        ((url === "https://fieldinspection-env.eba-m75rymmr.eu-west-1.elasticbeanstalk.com") && "TEST") ||
        ((url === "https://field-inspection-dev.eu-west-1.elasticbeanstalk.com") && "DEVELOPMENT")
      }</label>
    </Drawer>
  )
}