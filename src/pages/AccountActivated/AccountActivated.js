import React, { useCallback } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory, useLocation } from 'react-router-dom';
import LanguageHelper from '../../helpers/LanguageHelper';
import logo from '../../assets/images/pincident.png'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Request from '../../helpers/Request';
import Copyright from '../../components/Footer/Copyright';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: 20,
    width: 300,
    height: "auto"
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
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

export default function AccountActivated() {
  let location = useLocation();
  const darkMode = localStorage.getItem("darkMode");
  const darkTheme = createTheme({ palette: { type: 'dark' } });
  const lightTheme = createTheme({ palette: { type: 'light' } });
  const token = location.pathname.substring(12);

  const history = useHistory();
  const language = LanguageHelper.getLanguage();
  const classes = useStyles();
  const [message, setMessage] = React.useState("");

  const init = useCallback(async () => {
    const resp = await Request("post", '/api/auth/confirm/' + token);
    if(resp.status !== 200) {
      setMessage(language.login.activateError);
    } else {
      setMessage(language.login.activated);
    }
  }, [language, token]);
  React.useEffect(() => {
    init();
  }, [init]);

  return (
    <Container maxWidth={false}>
      <Container component="main" maxWidth="xs">
        <ThemeProvider theme={darkMode === "true" ? darkTheme : lightTheme}>
          <CssBaseline />
          <div className={classes.paper}>
            <img className={classes.avatar} alt={logo} src={logo} />
            <Typography component="h1" variant="h5">
              {message}
            </Typography>
            <Link style={{fontSize: 20, margin: 30}} href="#" variant="body2" onClick={() => {
              history.push("/signin")
            }}>
              {language.login.signin}
            </Link>
          </div>
          <Box mt={8}>
            <Copyright
              string={"DELTA Smart Technologies"}
              date={new Date().getFullYear()}
              url={"https://deltasmart.tech/en/home/"}
            />
          </Box>
        </ThemeProvider>
      </Container>
    </Container>
  );
}