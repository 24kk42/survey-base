import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import LanguageHelper from '../../helpers/LanguageHelper';
import logo from '../../assets/images/pincident.png'
import SessionHelper from '../../helpers/SessionHelper';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Request from '../../helpers/Request';
import Copyright from '../../components/Footer/Copyright';
import CustomSnackbar from "../../components/Snackbar/Snackbar";
import Settings from '../../components/Buttons/Settings';
import { CircularProgress } from '@material-ui/core';

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
  buttonContainer: {
    marginTop: 10,
    textAlign: "center",
    paddingBottom: 20
  }
}));

export default function SignIn({update, setUpdate}) {
  const darkTheme = createTheme({ palette: { type: 'dark' } });
  const lightTheme = createTheme({ palette: { type: 'light' } });
  const history = useHistory();
  const classes = useStyles();
  const language = LanguageHelper.getLanguage();

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState("info");
  const [darkMode, setDarkMode] = React.useState(localStorage.getItem("darkMode"));
  // eslint-disable-next-line no-unused-vars
  const [languageState, setLanguage] = React.useState(language);
  const [loading, setLoading] = React.useState(false);

  async function handleLogin(username, password) {
    setLoading(true);
    const resp = await Request("post", "/api/auth/signin", { username: username, password: password });
    console.log(resp);
    if (resp?.status === 200) {
      let data = resp.data;
      SessionHelper.setUser(data);
      setUpdate(!update);
      history?.location?.state ? history.push(history?.location?.state?.from?.pathname) : history.push('/dashboard');
    } else {
      if (resp.data && resp.data.message) {
        setSeverity("error");
        setSnackbarMessage(resp.data.message);
        setSnackbar(true);
      } else {
        setSeverity("error");
        setSnackbarMessage(language.login.unexpectedError);
        setSnackbar(true);
      }
    }
    setLoading(false);
  }

  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin(username, password)
    }
  }

  return (
    <Container maxWidth={false}>
      <CustomSnackbar
        snackbar={snackbar}
        setSnackbar={setSnackbar}
        snackbarMessage={snackbarMessage}
        severity={severity}
      />
      <Settings darkMode={darkMode} setDarkMode={setDarkMode} setLanguage={setLanguage} />
      <Container component="main" maxWidth="xs">
        <ThemeProvider theme={darkMode === "true" ? darkTheme : lightTheme}>
          <CssBaseline />
          <div onKeyDown={_handleKeyDown} className={classes.paper}>
            <img className={classes.avatar} alt={logo} src={logo} />
            <Typography component="h1" variant="h5">
              {language.login.title}
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                error={snackbar}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label={language.login.email}
                autoFocus
                onChange={username => setUsername(username.target.value.trim())}
              />
              <TextField
                error={snackbar}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label={language.login.password}
                type="password"
                onChange={password => setPassword(password.target.value)}
              />
              <div className={classes.buttonContainer}>
                {loading ?
                  <CircularProgress color="secondary"/>
                  :
                  <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => {
                    if (username === "") {
                      setSnackbarMessage(language.login.provideEmail);
                      setSnackbar(true);
                    }
                    else if (password === "") {
                      setSnackbarMessage(language.login.providePassword)
                      setSnackbar(true);
                    }
                    else {
                      // eslint-disable-next-line no-useless-escape
                      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                      if (re.test(username)) {
                        handleLogin(username, password)
                      }
                      else {
                        setSnackbar(true);
                        setSnackbarMessage(language.login.weirdEmail)
                      }
                    }
                  }}
                >
                  {language.login.signin}
                </Button>}
              </div>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" onClick={() => {
                    history.push("/forgot")
                  }}>
                    {language.login.forgot}
                  </Link>
                </Grid>
                <Grid item xs>
                  <Link href="#" variant="body2" onClick={() => {
                    history.push("/signup")
                  }}>
                    {language.login.activate}
                  </Link>
                </Grid>
              </Grid>
            </form>
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