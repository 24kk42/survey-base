import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { fileUrl } from "../../helpers/Request";

const useStyles = makeStyles((theme) => ({
  fileButton: {
    cursor: "pointer",
    marginBottom: 5,
  },
  fileButtonLabel: {
    cursor: "pointer",
    fontSize: "0.8vw",
  },
}));

/**
 * Renders a list of buttons that when clicked, opens the file in another tab.
 * @param {fileKeys: obj[]} fileKeys an array of file links
 */
export default function ListOfFiles({ fileKeys }) {
  const classes = useStyles();
  return fileKeys.map((data, index) => {
    return (
      <div key={index}>
        <Button
          variant="contained"
          color="primary"
          className={classes.fileButton}
          onClick={() => window.open(data.fileKey || fileUrl + data.name)}
        >
          <label className={classes.fileButtonLabel}>
            {data.fileKey ? data.fileKey.split(fileUrl) : data.name}
          </label>
        </Button>
      </div>
    );
  });
}
