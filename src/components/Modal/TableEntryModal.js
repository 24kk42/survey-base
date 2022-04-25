import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Modal } from "@material-ui/core";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { modalStyles } from '../../assets/styles/tableContainer';

const useStyles = makeStyles((theme) => (modalStyles(theme)));

/**
 * Modal component used in tables for adding/editing entries.
 * @param {modal: boolean, handleCloseModal: func, modalLoading: boolean, children: obj} props of the table entry modal 
 */
export default function TableEntryModal({modal, handleCloseModal, modalLoading, children}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Modal
        className={classes.modal}
        open={modal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={modal}>
          <div className={classes.paper}>
            {modalLoading 
              ?
              <CircularProgress color="secondary"/> 
              :
              <div>
                {children}
              </div>
            }
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
}