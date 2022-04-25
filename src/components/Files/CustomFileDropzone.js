/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDropzone } from 'react-dropzone';
import LanguageHelper from '../../helpers/LanguageHelper';
import { CircularProgress, Grid } from '@material-ui/core';
import IconTooltipButton from '../../components/Buttons/IconTooltipButton';
import { fileUrl } from '../../helpers/Request';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
  dropzoneLabel: {
    fontSize: "18px",
    color: theme.palette.type === "light" ? "black" : "white"
  },
  dropzoneTip: {
    fontSize: "16px",
    color: "red"
  },
  fileLabel: {
    fontSize: "14px"
  },
  fileDeleteIcon: {
    marginLeft: "auto",
    marginRight: 0,
    float: "right"
  }
}));

export default function CustomFileDropzone({ 
  dropzoneText, 
  disabled,
  files,
  setFiles,
  fileLimit = 1,
  onlyShowTitleWhenEmpty = false,
  onChange
}) {

  const classes = useStyles();
  const language = LanguageHelper.getLanguage();
  const [loading, setLoading] = React.useState(false);
  const [active, setActive] = React.useState(true);
  const [uploaded, setUploaded] = React.useState(0);

  const init = useCallback(async () => {
    if(files && files.length >= fileLimit) {
      setActive(false);
    } else {
      setActive(true);
    }
  }, [files, setFiles]);
  React.useEffect(() => {
    init();
  }, [init]);

  const onDrop = (acceptedFiles) => {
    setLoading(true);
    let temp = [...files];
    for(let i = 0; i < acceptedFiles.length; i++) {
      temp.push(acceptedFiles[i]);
      if(temp.length === fileLimit) {
        setActive(false);
        break;
      }
    }
    setFiles(temp);
    setUploaded(uploaded + acceptedFiles.length);
    setLoading(false);
    onChange && onChange();
  }

  const removeFile = (e, value) => {
    e.stopPropagation();
    setLoading(true);
    let temp = [...files];
    for(let i = 0; i < temp.length; i++) {
      if(temp[i].name === value.name) {
        temp.splice(i, 1);
      }
    }
    setFiles(temp);
    uploaded > 0 && setUploaded(uploaded - 1);
    setActive(true);
    setLoading(false);
    onChange && onChange();
  }

  const downloadFile = async (e, value) => {
    e.stopPropagation();
    setLoading(true);
    let name = "file";
    let url = "";
    var element = document.createElement('a');
    if (uploaded) {
      for (var file of files) {
        name = file.name;
        url = window.URL.createObjectURL(file);
      }
      element.setAttribute('href', url);
      element.setAttribute('download', name);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    } else {
      url = fileUrl + value.name;
      window.open(url);
    }
    window.URL.revokeObjectURL(url);
    setLoading(false);
  }

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    isFileDialogActive,
  } = useDropzone({ maxFiles: 1, onDrop: onDrop, disabled: !active || disabled });

  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: 'gray',
    borderStyle: 'dashed',
    margin: "10px",
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: active && !disabled ? "pointer" : "default"
  };
  const activeStyle = {
    borderColor: '#2196f3'
  };
  const acceptStyle = {
    borderColor: '#00e676'
  };
  const rejectStyle = {
    borderColor: '#ff1744'
  };
  const focusedStyle = {
    borderStyle: 'solid',
    borderColor: 'white'
  }
  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {}),
    ...(isFileDialogActive ? focusedStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept,
    isFileDialogActive,
    activeStyle,
    acceptStyle,
    rejectStyle,
    focusedStyle,
    baseStyle
  ]);

  const RenderFiles = useCallback(() => {
    return(
      files.map((value, index) => {
        return(
          <Grid container direction="row">
            <Grid item xs={1}>
              <IconTooltipButton title={"Dosyayı Aç / İndir"} onClick={(e) => downloadFile(e, value)}>
                <AttachFileIcon />
              </IconTooltipButton>
            </Grid>
            <Grid item xs={9}>
              <p className={classes.fileLabel}>{value.name}</p>
            </Grid>
            <Grid item xs={2}>
              <div className={classes.fileDeleteIcon}>
                <IconTooltipButton disabled={disabled} title={language.tableDetails.deleteFile} onClick={(e) => removeFile(e, value)}>
                  <ClearIcon />
                </IconTooltipButton>
              </div>
            </Grid>
          </Grid>
        )
      })
    )
  }, [files, setFiles])

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input disabled={disabled} {...getInputProps()} />
        {!disabled &&
        <div>
          {onlyShowTitleWhenEmpty ? 
          (files && files.length === 0 && <p className={classes.dropzoneLabel}>{dropzoneText}</p>) :
          <p className={classes.dropzoneLabel}>{dropzoneText}</p>}
        </div>}
        {files && files.length === 0 && <p className={classes.dropzoneTip}>{active ? "Dosya Yok" : language.tableDetails.disabled}</p>}
        {files && files.length > 0 && <RenderFiles />}
        {loading && <CircularProgress className={classes.loadingProgress} color="secondary"/>}
      </div>
    </div>
  )
}
