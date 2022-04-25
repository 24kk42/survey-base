import React from 'react';
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker, KeyboardDateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { tr } from "date-fns/locale";
import { Calendar } from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel" 
import weekends from "react-multi-date-picker/plugins/highlight_weekends"

export function MonthPicker({label, value, required, shrink, onChangeFunc, style, keyboardButtonProps, error, helperText}) {
  return(
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={tr}>
      <KeyboardDatePicker
        okLabel="TAMAM"
        cancelLabel="İPTAL"
        clearLabel="TEMİZLE"
        todayLabel="BUGÜN"
        id="date-picker-inline"
        format="MMM yyyy"
        views={['month', 'year']}
        margin="normal"
        error={error}
        helperText={helperText ? helperText : error}
        required={required}
        InputLabelProps={{ shrink: !!shrink }}
        label={label}
        value={value}
        onChange={value => onChangeFunc(value)}
        className={style}
        KeyboardButtonProps={keyboardButtonProps}
      />
    </MuiPickersUtilsProvider>
  )
}

export function CustomDatePicker({label, value, required, disabled, shrink, onChangeFunc, style, keyboardButtonProps, error, helperText}) {
  return(
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={tr}>
      <KeyboardDatePicker
        okLabel="TAMAM"
        cancelLabel="İPTAL"
        clearLabel="TEMİZLE"
        todayLabel="BUGÜN"
        id="date-picker-inline"
        format="dd/MM/yyyy"
        margin="normal"
        error={error}
        disabled={disabled}
        helperText={helperText ? helperText : error}
        InputLabelProps={{ shrink: !!shrink }}
        required={required}
        fullWidth={true}
        label={label}
        value={value}
        onChange={value => onChangeFunc(value)}
        className={style}
        KeyboardButtonProps={keyboardButtonProps}
      />
    </MuiPickersUtilsProvider>
  )
}

export function DateTimePicker({label, value, required, disabled, shrink, onChangeFunc, style, keyboardButtonProps, error, helperText}) {
  return(
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={tr}>
      <KeyboardDateTimePicker
        okLabel="TAMAM"
        cancelLabel="İPTAL"
        clearLabel="TEMİZLE"
        todayLabel="BUGÜN"
        id="date-picker-inline"
        format="dd/MM/yyyy HH:mm"
        margin="normal"
        error={error}
        ampm={false}
        disabled={disabled}
        helperText={helperText ? helperText : error}
        InputLabelProps={{ shrink: !!shrink }}
        required={required}
        fullWidth={true}
        label={label}
        value={value}
        onChange={value => onChangeFunc(value)}
        className={style}
        KeyboardButtonProps={keyboardButtonProps}
      />
    </MuiPickersUtilsProvider>
  )
}

export function MultiDatePicker({minDate, label, dates, required, disabled, shrink, onChangeFunc, style, keyboardButtonProps, error, helperText}) {
  return(
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={tr}>
      <Calendar
        plugins={[
          <DatePanel header={label} sort="date" />,
          weekends()
        ]}
        weekStartDayIndex={1}
        value={dates}
        inputMode="none"
        minDate={minDate}
        onChange={dates => onChangeFunc(dates)}
        id="multi-date-picker-inline"
        format="DD/MM/YYYY"
        margin="normal"
        error={error}
        locale={gregorian_tr}
        disabled={disabled}
        helperText={helperText ? helperText : error}
        InputLabelProps={{ shrink: !!shrink }}
        required={required}
        fullWidth={true}
        label={label}
        className={style}
        KeyboardButtonProps={keyboardButtonProps}
      />
    </MuiPickersUtilsProvider>
  )
}

export function TimePicker({label, value, required, shrink, onChangeFunc, style, keyboardButtonProps, error, helperText}) {
  return(
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={tr}>
      <KeyboardTimePicker
        okLabel="TAMAM"
        cancelLabel="İPTAL"
        clearLabel="TEMİZLE"
        todayLabel="BUGÜN"
        margin="normal"
        id="time-picker"
        label={label}
        required={required}
        ampm={false}
        InputLabelProps={{ shrink: !!shrink }}
        error={error}
        helperText={helperText ? helperText : error}
        fullWidth
        value={value}
        onChange={(value, date) => onChangeFunc(value, date)}
        className={style}
        KeyboardButtonProps={keyboardButtonProps}
      />
    </MuiPickersUtilsProvider>
  )
}

const gregorian_tr = {
  name: "gregorian_tr_lowercase",
  months: [
    ["Ocak", "Oca"],
    ["Şubat", "Şub"],
    ["Mart", "Mar"],
    ["Nisan", "Nis"],
    ["Mayıs", "May"],
    ["Haziran", "Haz"],
    ["Temmuz", "Tem"],
    ["Ağustos", "Ağu"],
    ["Eylül", "Eyl"],
    ["Ekim", "Eki"],
    ["Kasım", "Kas"],
    ["Aralık", "Ara"],
  ],
  weekDays: [
    ["Cumartesi", "Cmt"],
    ["Pazar", "Paz"],
    ["Pazartesi", "Pzt"],
    ["Salı", "Sal"],
    ["Çarşamba", "Çar"],
    ["Perşembe", "Per"],
    ["Cuma", "Cum"],
  ],
  digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  meridiems: [
    ["AM", "am"],
    ["PM", "pm"],
  ],
};