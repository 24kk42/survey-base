import React from 'react';
import { IconButton, Snackbar } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';

export default function CustomSnackbar({snackbar, setSnackbar, snackbarMessage, severity}) {

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setSnackbar(false);
	};
	
	return(
		<Snackbar
			open={snackbar}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'center',
			}}
			autoHideDuration={6000}
			onClose={handleClose}
		>
			<Alert severity={severity}>
				{snackbarMessage}
				<IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
					<CloseIcon fontSize="small" />
				</IconButton>
			</Alert>
		</Snackbar>
	)
}