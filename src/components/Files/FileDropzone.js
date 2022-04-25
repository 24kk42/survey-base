import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import { lengthOf } from '../Utils/formDataUtils';

const useStyles = makeStyles(() => ({
  previewChip: {
    minWidth: 160,
    maxWidth: 210
  },
  dropzoneMargin: {
    margin: "20px",
    width: "100%"
  },
  fileListContainer: {
    margin: "0 auto"
  },
  fileListLabel: {
    margin: 30
  },
  label: {
    fontSize: 16
  }
}));

export default function FileDropzone({
  files,
  setFiles,
  initialFiles,
  fileName,
  fileError,
  setFileError,
  dropzoneText,
  fileLimit,
  maxFileSize,
}) {
  const classes = useStyles();

  const [length, setLength] = React.useState(lengthOf(files.getAll(fileName)));

  /**
   * Keeps the uploaded file(s) in a FormData object to upload when the button is clicked.
   * @param {obj} acceptedFiles
   */
  const handleDrop = async (acceptedFiles) => {
    let formData = files;
    for (let i = 0; i < acceptedFiles.length; i++) {
      formData.append(fileName, acceptedFiles[i], acceptedFiles[i].name);
    }
    setFiles(formData);
    setFileError && setFileError(null);
    setLength(lengthOf(formData.getAll(fileName)))
  };

  /**
   * Deletes the file from the FormData object.
   * @param {obj} file
   */
  const handleDelete = async (file) => {
    let formData = files;
    let newFormData = new FormData();
    let index = 0;

    for (let pair of files.entries()) {
      if (pair[1].name === file.name) {
        break;
      }
      index++;
    }

    let values = formData.getAll(fileName);
    values.splice(index, 1);
    for (let i = 0; i < values.length; i++) {
      newFormData.append(fileName, values[i]);
    }
    setFiles(newFormData);
    setLength(lengthOf(newFormData.getAll(fileName)))
  };
  
  //console.log(lengthOf(files.getAll(fileName)));

  const RenderDropzone = useCallback(() => {
    return (
      <DropzoneArea
        dropzoneText={
          dropzoneText
            ? dropzoneText
            : "Dosya yüklemek için sürükleyin ya da buraya tıklayın."
        }
        filesLimit={fileLimit ? fileLimit : 1}
        maxFileSize={maxFileSize ? maxFileSize : 10000000}
        useChipsForPreview
        initialFiles={initialFiles}
        clearOnUnmount={false}
        dropzoneProps={{
          disabled: length === (fileLimit ? fileLimit : 1)
        }}
        previewGridProps={{ container: { spacing: 1, direction: "row" } }}
        previewChipProps={{
          onClick: (event) => {
            event.stopPropagation();
            window.open(
              "https://isgapi.gdzelektrik.com.tr:8443/open-file/" +
                event.target.innerText
            );
          },
          classes: { root: classes.previewChip },
        }}
        previewText="Seçili Dosya"
        onDrop={(files) => handleDrop(files)}
        onDelete={(file) => handleDelete(file)}
      />
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialFiles, files]);

  return (
    <Grid container direction="row" alignItems="center">
      <div
        className={classes.dropzoneMargin}
        style={{ color: fileError && "red" }}
      >
        <RenderDropzone />
      </div>
    </Grid>
  );
}