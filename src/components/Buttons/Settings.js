import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LanguageHelper from '../../helpers/LanguageHelper';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import IconButton from '@material-ui/core/IconButton';
import { Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  options: {
    width: "50",
    height: "20",
    display: "flex",
    marginLeft: "auto",
    marginTop: 15
  },
  language: {
    marginTop: 5,
    marginLeft: 20
  },
  tr: {
    cursor: 'pointer'
  },
  en: {
    cursor: 'pointer'
  },
  themeSwitch: {}
}));

export default function Settings({darkMode, setDarkMode, setLanguage}) {
  const classes = useStyles();

  const switchLanguage = (lang) => {
    LanguageHelper.setLanguage(lang);
    setLanguage(lang);
  };

  const switchTheme = () => {
    if (darkMode === "true") {
      localStorage.setItem("darkMode", "false");
      setDarkMode("false");
    } else {
      localStorage.setItem("darkMode", "true");
      setDarkMode("true");
    }
  }

  return (
    <div className={classes.options}>
      <IconButton
        color="inherit"
        aria-label="Switch Theme"
        onClick={() => switchTheme()}
        edge="start"
        className={classes.themeSwitch}>
        <Brightness4Icon />
      </IconButton>
      {/* <div className={classes.language}>
        <Button className={classes.tr} color="inherit" onClick={() => switchLanguage("tr")}>TR</Button>
        <label> / </label>
        <Tooltip title="Bu özellik şimdilik devre dışıdır.">
          <span><Button disabled className={classes.en} color="inherit" onClick={() => switchLanguage("en")}>EN</Button></span>
        </Tooltip>
      </div> */}
    </div>
  );
}