export const tableContainerStyles = {
    //marginBottom: "30px"
    //height: "100vh"
};

export const modalStyles = (theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: "none",
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        maxHeight: "45vw",
        outline: "none",
        maxWidth: "90%",
        backgroundColor: theme.palette.background.paper,
        border: "none",
        borderRadius: "15px",
        padding: theme.spacing(2, 4, 3),
    },
})

export const modalFormStyles = (theme) => ({
    submit: {
        marginTop: "10px",
    },
    formControl: {
        width: "70vw",
        maxWidth: 600,
        maxHeight: "42vw",
    },
    textField: {
        marginBottom: "2vw",
        whiteSpace: 'pre-wrap'
    },
    dateField: {
        marginBottom: "2vw",
        marginTop: 0	
    }
})