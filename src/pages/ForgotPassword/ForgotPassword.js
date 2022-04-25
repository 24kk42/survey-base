import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import LanguageHelper from "../../helpers/LanguageHelper";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import logo from "../../assets/images/pincident.png";
import Request from "../../helpers/Request";
import CustomSnackbar from "../../components/Snackbar/Snackbar";
import Settings from "../../components/Buttons/Settings";
import Copyright from "../../components/Footer/Copyright";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: 20,
    width: 300,
    height: "auto",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

export default function ForgotPassword() {
  let history = useHistory();
  const classes = useStyles();
  const darkTheme = createTheme({ palette: { type: "dark" } });
  const lightTheme = createTheme({ palette: { type: "light" } });
  const language = LanguageHelper.getLanguage();

  // eslint-disable-next-line no-unused-vars
  const [languageState, setLanguage] = React.useState(language);
  const [snackbar, setSnackbar] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [severity, setSeverity] = useState("info");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [email, setEmail] = useState("");
  const [darkMode, setDarkMode] = React.useState(
    localStorage.getItem("darkMode")
  );

  async function handleForgot(email) {
    if(email === "") {
      setSnackbarMessage(language.login.provideEmail);
      setSnackbar(true);
    } else {
      const resp = await Request("post", "/api/auth/reset-password/", { email: email })
      console.log(resp);
      if (resp.status === 200) {
        setSnackbarMessage(language.login.emailSentPass);
        setSnackbar(true);
      } else { 
        if(resp.data && resp.data.message) {
          setSnackbarMessage(resp.data.message);
          setSnackbar(true);
        } else {
          setSnackbarMessage(language.login.unexpectedError);
          setSnackbar(true);
        }
      }
    }
  }

  return (
    <Container maxWidth={false}>
      <Settings darkMode={darkMode} setDarkMode={setDarkMode} setLanguage={setLanguage} />
      <CustomSnackbar
        snackbar={snackbar}
        setSnackbar={setSnackbar}
        snackbarMessage={snackbarMessage}
        severity={severity}
      />
      <Container component="main" maxWidth="xs">
        <ThemeProvider theme={darkMode === "true" ? darkTheme : lightTheme}>
          <CssBaseline />
          <div className={classes.paper}>
            <img className={classes.avatar} alt={logo} src={logo} />
            <Typography component="h1" variant="h5">
              {language.login.forgot}
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
                onChange={(email) => setEmail(email.target.value)}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => {
                  handleForgot(email);
                }}
              >
                {language.login.send}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => {
                      history.push("/signin");
                    }}
                  >
                    {language.login.signin}
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
