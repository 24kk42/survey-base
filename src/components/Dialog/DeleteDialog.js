import { Button, CircularProgress, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import LanguageHelper from "../../helpers/LanguageHelper";

export default function DeleteDialog({remove, open, close, loading, customTitle}) {
  const language = LanguageHelper.getLanguage();

  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{customTitle ? customTitle : "Silmek istediğine emin misin?"}</DialogTitle>
      <DialogActions>
        {(loading === undefined || loading === false) ?
        <Button
          onClick={() => remove()} 
          color="secondary"
          >
          {language.form.delete}
        </Button>
        :
        <CircularProgress color="secondary"/>}
        <Button onClick={close} color="secondary" autoFocus>
          {language.form.closeDialog}
        </Button>
      </DialogActions>
    </Dialog>
  )
}