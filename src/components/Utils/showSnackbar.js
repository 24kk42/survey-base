import LanguageHelper from "../../helpers/LanguageHelper";

export default function showSnackbar(resp, setSeverity, setSnackbarMessage, setSnackbar, successMessage, tableRef, reload) {
  const language = LanguageHelper.getLanguage();

  if(resp.status !== 200) {
    if(resp.data && resp.data.message) {
      setSeverity("error");
      setSnackbarMessage(resp.data.message);
      setSnackbar(true);
    } else if(resp.data && resp.data.error) {
      setSeverity("error");
      setSnackbarMessage(resp.data.error.message);
      setSnackbar(true);
    } else {
      setSeverity("error");
      setSnackbarMessage(language.login.unexpectedError);
      setSnackbar(true);
    }
  } else {
    if(reload) {
      if(typeof reload === "function") {
        if(resp.data && (Array.isArray(resp.data) || typeof resp.data === 'object')) {
          reload(resp.data);
        } else {
          reload();
        }
      } else {
        window.location.reload();
      }
    } else {
      tableRef && tableRef.current && tableRef.current.onQueryChange();
    }
    setSeverity("success");
    setSnackbarMessage(successMessage);
    setSnackbar(true);
  }
}