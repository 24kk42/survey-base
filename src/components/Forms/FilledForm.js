import Request from '../../helpers/Request';
import FileSaver from 'file-saver';
import LanguageHelper from '../../helpers/LanguageHelper';

const language = LanguageHelper.getLanguage();

export const openPDF = (resp, fileName, setSnackbar, setSnackbarMessage, setSeverity) => {
  if(resp.status !== 200) {
    if(resp.data && resp.data.message) {
      setSeverity("error");
      setSnackbarMessage(resp.data.message);
      setSnackbar(true);
    } else {
      setSeverity("error");
      setSnackbarMessage(language.login.unexpectedError);
      setSnackbar(true);
    }
  } else {
    try {
      var byteCharacters = atob(resp.data);
      var byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      var file = new Blob([byteArray], { type: 'application/pdf;base64' });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      return;
    } catch (e) {
      setSeverity("error");
      setSnackbarMessage(e.message);
      setSnackbar(true);
    }
  }
}

/**
 * First gets the form details and then creates a pdf.
 * @param {number} id id of the form
 */
export default function FilledForm(id, xlsx, setSnackbar, setSnackbarMessage, setSeverity, setBackdropLoading) {
  /**
   * Sends a get request to retrieve the pdf of the form.
   * Opens this pdf in a new tab.
   * @param {number} id id of the form
   */
  const getPDF = async (id) => {
    const resp = await Request("get", "/api/forms/" + id + "/as-pdf", null, null, { "Accept": "application/pdf" });
    console.log(resp);
    openPDF(resp, "form", setSnackbar, setSnackbarMessage, setSeverity);
  }

  /**
   * Sends a get request to retrieve the xlsx of the form.
   * Downloads this xlsx.
   * @param {number} id id of the form
   */
  const getXLSX = async (id) => {
    const resp = await Request("get", "/api/forms/" + id + "/as-xlsx", null, null, { "Accept": "application/xlsx" });
    console.log(resp);
    if(resp.status !== 200) {
      if(resp.data && resp.data.message) {
        setSeverity("error");
        setSnackbarMessage(resp.data.message);
        setSnackbar(true);
      } else {
        setSeverity("error");
        setSnackbarMessage(language.login.unexpectedError);
        setSnackbar(true);
      }
    } else {
      const source = "data:application/xlsx;base64, " + encodeURI(resp.data);
      FileSaver.saveAs(source, "form.xlsx");
      return;
    }
  }

  /**
   * Request to get the details of the form.
   * @param {number} id id of the form
   * @returns {obj} a json object that contains form details
   */
  const getFormDetails = async (id) => {
    const resp = await Request("get", "/api/forms/" + id, null);
    return resp.data;
  };

  const init = async () => {
    setBackdropLoading(true);
    const formDetails = await getFormDetails(id);
    xlsx ? await getXLSX(formDetails?.id) : await getPDF(formDetails?.id);
    setBackdropLoading(false);
  }
  if (id) {
    init();
  }
}