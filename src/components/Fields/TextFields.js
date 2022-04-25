import React from 'react';
import { TextField } from '@material-ui/core';

export const TextArea = ({
  autoFocus,
  number,
  multiline,
  required,
  disabled,
  label,
  value,
  defaultValue,
  shrink,
  onChangeFunc,
  onBlurFunc,
  onKeyPress,
  error,
  helperText,
  style,
  keyboardButtonProps,
}) => {
  return (
    <TextField
      autoFocus={autoFocus ? true : false}
      required={required ? true : false}
      disabled={disabled ? true : false}
      type={number && "number"}
      className={style}
      multiline={multiline}
      InputLabelProps={{ shrink: !!(shrink ? shrink : value) }}
      fullWidth={true}
      error={error}
      helperText={helperText ? helperText : error}
      label={label}
      value={value}
      defaultValue={defaultValue}
      onKeyPress={(ev) => onKeyPress && onKeyPress(ev)}
      onChange={(value) => onChangeFunc && onChangeFunc(value)}
      onBlur={(value) => onBlurFunc && onBlurFunc(value)}
      KeyboardButtonProps={keyboardButtonProps}
    />
  );
};

export function TextSelector({
  required,
  multiple,
  disabled,
  label,
  value,
  shrink,
  onChangeFunc,
  onKeyPress,
  error,
  helperText,
  style,
  options,
  keyboardButtonProps,
}) {
  return (
    <TextField
      required={required ? true : false}
      disabled={disabled ? true : false}
      SelectProps={{
        multiple: multiple ? true : false,
      }}
      KeyboardButtonProps={keyboardButtonProps}
      InputLabelProps={{ shrink: !!(shrink ? shrink : value) }}
      fullWidth={true}
      error={error}
      helperText={helperText ? helperText : error}
      select
      label={label}
      value={value}
      placeholder={value}
      onKeyPress={(ev) => (onKeyPress ? onKeyPress(ev) : null)}
      onChange={(value) => onChangeFunc(value)}
      className={style}
    >
      {options}
    </TextField>
  );
}