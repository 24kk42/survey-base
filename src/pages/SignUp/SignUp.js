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
import logo from '../../assets/images/pincident.png';
import LanguageHelper from "../../helpers/LanguageHelper";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Copyright from '../../components/Footer/Copyright';
import Request from '../../helpers/Request';
import CustomSnackbar from '../../components/Snackbar/Snackbar';
import Settings from '../../components/Buttons/Settings';

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
  }
}));

export default function SignUp() {
  const classes = useStyles();
  let history = useHistory();
  const darkTheme = createTheme({ palette: { type: 'dark' } });
  const lightTheme = createTheme({ palette: { type: 'light' } });
  const language = LanguageHelper.getLanguage();
  
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("")
  const [newPasswordCheck, setNewPasswordCheck] = useState("")
  const [snackbar, setSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [severity, setSeverity] = useState("info");
  const [showMessage, setShowMessage] = useState(false);
  const [languageState, setLanguage] = React.useState(language);
  const [darkMode, setDarkMode] = React.useState(localStorage.getItem("darkMode"));

  async function handleActivate(email, password) {
    const resp = await Request("post", "/api/auth/activate-account/", { email: email, newPassword: password });
    console.log(resp);
    if (resp.status !== 200) {
      if (resp.data && resp.data.message) {
        setSeverity("error");
        setMessage(resp.data.message);
        setSnackbar(true);
      } else {
        setSeverity("error");
        setMessage(language.login.unexpectedError);
        setSnackbar(true);
      }
    } else {
      setMessage(language.login.emailSent);
      setShowMessage(true);
      setTimeout(() => {
        history.push("/signin");
      }, 3000)
    }
  }

  const checkCredentials = () => {
    if (email === "") {
      setMessage(language.login.provideEmail);
      setSnackbar(true);
    }
    else if (newPassword === "") {
      setMessage(language.login.providePassword);
      setSnackbar(true);
    }
    else {
      // eslint-disable-next-line no-useless-escape
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(email)) {
        if (newPasswordCheck === newPassword) {
          handleActivate(email, newPassword);
        }
        else {
          setMessage(language.login.passwordMatch);
          setSnackbar(true);
        }
      }
      else {
        setMessage(language.login.weirdEmail);
        setSnackbar(true);
      }
    }
  }

  return (
    <Container maxWidth={false}>
      <CustomSnackbar
        snackbar={snackbar}
        setSnackbar={setSnackbar}
        snackbarMessage={message}
        severity={severity}
      />
      <Settings darkMode={darkMode} setDarkMode={setDarkMode} setLanguage={setLanguage} />
      <Container component="main" maxWidth="xs"  >
        <ThemeProvider theme={darkMode === "true" ? darkTheme : lightTheme}>
          <CssBaseline />
          <div className={classes.paper} >
            <img className={classes.avatar} alt={logo} src={logo} />
            <Typography component="h1" variant="h5">
              {language.login.activate}
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                id="email_field"
                snackbar={snackbar}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label={language.login.email}
                autoFocus
                onChange={email => setEmail(email.target.value)}
              />
              <TextField
                id="password_field"
                snackbar={snackbar}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label={language.login.password}
                type="password"
                autoFocus
                onChange={newPassword => setNewPassword(newPassword.target.value)}
              />
              <TextField
                id="password_confirm_field"
                snackbar={snackbar}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label={language.login.passwordConfirm}
                type="password"
                autoFocus
                onChange={newPasswordCheck => setNewPasswordCheck(newPasswordCheck.target.value)}
              />
              {
                newPassword !== newPasswordCheck && newPasswordCheck !== "" &&
                <Typography style={{color: "red"}}>
                  {language.login.passwordMatch}
                </Typography>
              }
              {showMessage && 
                <Typography style={{color: "blue"}}>
                  {message}
                </Typography>
              }
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => checkCredentials()}
              >
                {language.login.activate}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" onClick={() => {
                    history.push("/signin")
                  }}>
                    {language.login.haveAccount}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8} >
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