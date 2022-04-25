import React from "react";
import { Checkbox, ListItemText, MenuItem } from "@material-ui/core";

/** 
  * Formats the json objects in the options array/object to be used as options for the select components.
  * @param {number} key index/name of the json object in the options array/object, if key is false then options is the object to iterate
  * @param {object[]} options options array/object 
  */
export default function jsonMap(key, options) {
  const collator = new Intl.Collator("tr");

  if(key === false) {
    return (
      options && Object.keys(options)?.sort(function(a, b) {
        return collator.compare(a.name, b.name)
      }).map((data) => (
        <MenuItem key={data} value={data}>
          {options[data]}
        </MenuItem>
      ))
    )
  } else {
    return (
      options[key] && Object.keys(options[key])?.sort(function(a, b) {
        return collator.compare(options[key][a], options[key][b])
      }).map((data) => (
        <MenuItem key={data} value={data}>
          {options[key][data]}
        </MenuItem>
      ))
    )
  }
}

export function jsonMapForTagItem(key, options, tagItem) {
  return (
    options[key] && Object.keys(options[key]).map((data) => (
      <MenuItem key={data} value={data}>
        <Checkbox checked={tagItem.indexOf(data) > -1} />
        <ListItemText primary={options[key][data]} />
      </MenuItem>
    ))
  )
}

export function jsonMapForTagItemAlt(options, tagItem) {
  return (
    options && Object.keys(options).map((data) => (
      <MenuItem key={data} value={data}>
        <Checkbox checked={tagItem.indexOf(data) > -1} />
        <ListItemText primary={options[data]} />
      </MenuItem>
    ))
  )
}