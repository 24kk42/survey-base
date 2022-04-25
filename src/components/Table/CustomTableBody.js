import React, { useCallback } from "react";
import { AutoSizer, List } from "react-virtualized";
import "react-virtualized/styles.css";
import CustomRow from "./CustomRow";

export const CustomTableBody = (props) => {
  const rowRenderer = useCallback(
    (props) => ({ index, key, style }) => {
      return (
        <div
          key={key}
          style={{ ...style, display: "table", tableLayout: "fixed" }}
        >
          <CustomRow
            key={key}
            index={index}
            data={props.renderData[index]}
            options={props.options}
            onToggleDetailPanel={props.onToggleDetailPanel}
            icons={props.icons}
            actions={props.actions}
            components={props.components}
            columns={props.columns}
            getFieldValue={props.getFieldValue}
            onRowSelected={props.onRowSelected}
          />
        </div>
      );
    },
    []
  );
  //console.log(props);
  return (
    <tbody>
      <AutoSizer>
        {() => (
          <List
            rowCount={props.renderData.length}
            height={props.tableHeight}
            width={props.tableWidth}
            rowHeight={150}
            rowRenderer={rowRenderer(props)}
            scrollToIndex={props.scrollIndex}
            overscanRowCount={10}
          />
        )}
      </AutoSizer>
    </tbody>
  );
};
