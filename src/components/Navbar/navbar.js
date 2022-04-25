import React, { useCallback } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import SessionHelper from '../../helpers/SessionHelper';
import { useHistory } from 'react-router-dom';
import LanguageHelper from '../../helpers/LanguageHelper';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import TopBar from './components/TopBar';
import NavDrawer from './components/NavDrawer';

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  '@global': {
    '*::-webkit-scrollbar': {
      width: '1em'
    },
    '*::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.2)',
    },
    '*::-webkit-scrollbar-thumb:hover': {
      backgroundColor: 'rgba(0,0,0,.3)',
    }
  },
  root: {
    display: 'flex',
  },
  hide: {
    display: 'none',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth + 40,
  }
}));

/**
 * A topbar + sidebar component that takes in another component to render as the content
 * @param {component: obj} component the page to render 
 */
const Navbar = React.memo(function Navbar({ component, drawerList }) {
  const history = useHistory();
  const classes = useStyles();

  const theme = useTheme();
  const darkTheme = createTheme({ palette: { type: 'dark' } });
  const lightTheme = createTheme({ palette: { type: 'light' } });

  const [darkMode, setDarkMode] = React.useState(localStorage.getItem("darkMode"));
  // eslint-disable-next-line no-unused-vars
  const [languageState, setLanguage] = React.useState(LanguageHelper.getLanguage());
  const [open, setOpen] = React.useState(true);

  const init = useCallback(async () => {

  }, []);
  React.useEffect(() => {
    init();
  }, [init]);

  const logout = () => {
    SessionHelper.deleteUser();
    history.push('signIn');
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={darkMode === "true" ? darkTheme : lightTheme}>
      <CssBaseline>
        <TopBar
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          logout={logout} />

        <NavDrawer
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          setLanguage={setLanguage}
          open={open}
          drawerList={drawerList}
          theme={theme}
          handleDrawerClose={handleDrawerClose}
        />

        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {component}
        </main>
      </CssBaseline>
    </ThemeProvider>
  )
});

export default Navbar;