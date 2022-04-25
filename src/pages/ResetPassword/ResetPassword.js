import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles, ThemeProvider, createTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from '@material-ui/core/Link';
import { useLocation, useHistory } from "react-router-dom";
import LanguageHelper from "../../helpers/LanguageHelper";
import logo from "../../assets/images/pincident.png";
import Copyright from "../../components/Footer/Copyright";
import { Box } from "@material-ui/core";
import Request from "../../helpers/Request";
import CustomSnackbar from "../../components/Snackbar/Snackbar";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    justify: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  avatar: {
    margin: 20,
    width: 300,
    height: "auto",
  },
}));

export default function ResetPassword() {
  let history = useHistory();
  let location = useLocation();
  const tokenstr = location.pathname.substring(7);
  const classes = useStyles();
  const language = LanguageHelper.getLanguage();
  const darkMode = localStorage.getItem("darkMode");
  const darkTheme = createTheme({ palette: { type: "dark" } });
  const lightTheme = createTheme({ palette: { type: "light" } });

  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [message, setMessage] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [severity, setSeverity] = useState("info");


  async function handleReset() {
    if(password === "") {
      setSnackbarMessage(language.login.providePassword);
      setSnackbar(true);
    } else if(passwordCheck === "") {
      setSnackbarMessage(language.login.providePasswordConfirm);
      setSnackbar(true);
    } else if(password !== passwordCheck) { 
      setSnackbarMessage(language.login.passwordMatch);
      setSnackbar(true);
    } else {
      const resp = await Request("post", "/api/auth/confirm-reset/" + tokenstr, { newPassword: password })
      console.log(resp);
      if (resp.status === 200) {
        setSnackbarMessage(language.login.passChanged);
        setMessage(true);
        setTimeout(() => {
          history.push("/signin");
        }, 3000)
      } else {
        if (resp.data && resp.data.message) {
          setSnackbarMessage(resp.data.message);
          setSnackbar(true);
        } else {
          setSnackbarMessage(language.login.unexpectedError);
          setSnackbar(true);
        }
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <ThemeProvider theme={darkMode === "true" ? darkTheme : lightTheme}>
        <CssBaseline />
        <div className={classes.paper}>
          <img className={classes.avatar} alt={logo} src={logo} />
          <Typography component="h1" variant="h5">
            {language.login.reset}
          </Typography>
          <TextField
            error={snackbar}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={language.login.password}
            type="password"
            autoFocus
            onChange={(password) => setPassword(password.target.value)}
          />
          <TextField
            error={snackbar}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label={language.login.passwordConfirm}
            type="password"
            autoFocus
            onChange={(passwordCheck) =>
              setPasswordCheck(passwordCheck.target.value)
            }
          />
          {
            password !== passwordCheck && passwordCheck !== "" &&
            <Typography style={{color: "red"}}>
              {language.login.passwordMatch}
            </Typography>
          }
          <CustomSnackbar
            snackbar={snackbar}
            setSnackbar={setSnackbar}
            snackbarMessage={snackbarMessage}
            severity={severity}
          />
          {message &&
          <Typography style={{color: "blue"}}>
            {snackbarMessage}
          </Typography>}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => handleReset()}
          >
            {language.login.reset}
          </Button>
          <Link
            href="#"
            variant="body2"
            onClick={() => {
              history.push("/signin");
            }}
          >
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
  );
}
