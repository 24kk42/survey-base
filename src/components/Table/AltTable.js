import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

export default function AltTable({ titles, rows }) {
  const RenderRow = ({ row }) => {
    const width = 100 / titles.length + "%";
    let props = {
      width: width,
    };
    if (row.length > titles.length) {
      props = row[row.length - 1];
    }
    row = row.slice(0, titles.length);
    return (
      <TableRow>
        {row.map((cell, index) => (
          <TableCell key={index + (cell && cell?.key)} style={props}>
            {cell !== null && cell !== undefined ? cell : "Yok"}
          </TableCell>
        ))}
      </TableRow>
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {titles.map((data, index) => {
              return <TableCell>{data}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <RenderRow row={row} key={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
