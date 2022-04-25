import React, { useCallback } from "react";
import { ResponsiveContainer } from "recharts";
import MaterialTable, { MTableToolbar } from "@material-table/core";
import { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import LanguageHelper from "../../helpers/LanguageHelper";
import SessionHelper from "../../helpers/SessionHelper";
import { getAuthorizationForPage } from "../../helpers/AuthorizationHelper";
import { Refresh } from "@material-ui/icons";
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import GridOnIcon from '@material-ui/icons/GridOn';
import { exportToXLSX, exportToPDF } from "../Utils/Export";
import ListIcon from '@material-ui/icons/List';
import IconTooltipButton from "../Buttons/IconTooltipButton";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Request from "../../helpers/Request";
import CustomRow from "./CustomRow";
import { openPDF } from "../Forms/FilledForm";
import { useTheme } from "@material-ui/styles";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  Refresh: forwardRef((props, ref) => <Refresh {...props} ref={ref} />),
  exportPDF: forwardRef((props, ref) => <PictureAsPdfIcon {...props} ref={ref} />),
  exportXLSX: forwardRef((props, ref) => <GridOnIcon {...props} ref={ref} />),
  List: forwardRef((props, ref) => <ListIcon {...props} ref={ref} />),
  Transfer: forwardRef((props, ref) => <SyncAltIcon {...props} ref={ref} />)
};

export default function Table({
  noRowActions,
  disableCreate,
  tableName,
  authName,
  columns,
  tableRef,
  setSnackbar,
  setSnackbarMessage,
  setSeverity,
	fetchData,
  data,
  handleOpenModal,
  handleOpenDeleteModal,
  handleOpenTransferModal,
  detailsPanel,
  detailsWindow,
  deleteTooltip,
  transferTooltip,
  isDeletable,
  isTransferable,
  isDeleteHidden,
  isEditable,
  isEditHidden,
  deleteEntry,
  updateFunc,
  numOfEntries,
  setNumOfEntries,
  type,
  localization,
  rowStyle,
  filters,
  guideLink,
  guideName,
  setSelectionIds,
  headerComponents,
  height,
  reloadFunction,
  extraAction, //{authorization, tooltip, icon, position, onClick}
  actionModal,
  createTooltip
}) {
  const user = SessionHelper.getUser();
  const theme = useTheme();
  const roles = user.roles;
  const authorization = getAuthorizationForPage(roles, authName);
  const language = LanguageHelper.getLanguage();

  const [pageSize, setPageSize] = React.useState(20);

  const init = useCallback(async () => {
    if(noRowActions) {
      if(localization) {
        localization.header.actions = null;
      } else {
        language.tableLocalization.header.actions = null;
      }
    };
    for(let i = 0; i < columns.length; i++) {
      if(!columns[i].emptyValue) {
        columns[i].emptyValue = language.etc.empty;
      }
    };
    const footer = document.getElementsByClassName("MuiTableFooter-root");
    if(footer.length > 0) {
      footer[0].style.backgroundColor = theme.palette.background.paper;
    }
  }, [columns, language, noRowActions, localization, theme]);
  React.useEffect(() => {
    init();
  }, [init]);

  const openGuide = async () => {
    const resp = await Request("get", guideLink);
    console.log(resp);
    openPDF(resp, guideName, setSnackbar, setSnackbarMessage, setSeverity)
  }
  
  return (
    <React.Fragment>
      <ResponsiveContainer>
        <MaterialTable
          columns={columns}
          title={tableName}
          localization={localization ? localization : language.tableLocalization}
          icons={tableIcons}
					tableRef={tableRef}
					data={data ? data : (query) => fetchData(query, setSnackbar, setSnackbarMessage, setSeverity, setNumOfEntries, type, filters)}
          onPageChange={() => {window.scrollTo(0, 0)}}
					onSearchChange={() => {setTimeout(() => {}, 3000)}}
					detailPanel={detailsPanel}
          onRowsPerPageChange={pageSize => setPageSize(pageSize)}
          onSelectionChange={(data, rowData) => {
            if(isDeletable(user, rowData)) {
              let temp = [];
              for(let index in data) {
                temp.push(data[index]?.id);
              }
              setSelectionIds(temp);
            } else {
              rowData && rowData.tableData && (rowData.tableData.checked = false);
              rowData && rowData.tableData && (rowData.tableData.selection = false);
            }
          }}  
          options={{
            headerStyle: {
              position: 'sticky',
              top: 0,
              backgroundColor: '#D3D3D3',
            },
            maxBodyHeight: '650px',
            selection: handleOpenDeleteModal && setSelectionIds,
            selectionProps: data => ({
              disabled: !isDeletable(user, data)
            }),
            draggable: false,
            pageSize: pageSize,
            pageSizeOptions: [20, 50, 100, numOfEntries].filter(n => n <= numOfEntries).sort(function(a, b) {return a - b}),
            debounceInterval: 1000,
            emptyRowsWhenPaging: false,
            doubleHorizontalScroll: true,
            rowStyle: rowData => rowStyle && rowStyle(rowData),

            
            //tableLayout: 'auto',
            /* headerStyle: { 
              position: 'sticky', 
              top: 120
            }, */
          }}
          editable={{
            isDeletable: isDeletable && ((rowData) => isDeletable(user, rowData)),
            isDeleteHidden: isDeleteHidden && ((rowData) => isDeleteHidden(rowData)),
            isEditable: isEditable && ((rowData) => isEditable(user, rowData)),
            isEditHidden: isEditHidden && ((rowData) => isEditHidden(rowData)),
            onRowDelete: !noRowActions && authorization.delete && deleteEntry && ((oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  deleteEntry(oldData);
                  resolve();
                }, 500);
              })),
            onRowUpdate: !noRowActions && authorization.edit && updateFunc && ((newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  updateFunc(newData, oldData);
                  resolve();
                }, 500)
              }))
          }}
          actions={[
            !noRowActions && authorization.edit && handleOpenModal && !isEditHidden && {
              icon: tableIcons.Edit,
              tooltip: language.tableLocalization.body.editTooltip,
              position: "row",
              onClick: (event, rowData) => handleOpenModal(rowData),
            },
            !noRowActions && detailsWindow && {
              icon: tableIcons.List,
              tooltip: "Detayları Aç",
              position: "row",
              onClick: (event, rowData) => detailsWindow(rowData),
            },
            rowData => (!noRowActions && authorization.delete && handleOpenTransferModal && isTransferable && {
              icon: tableIcons.Transfer,
              tooltip: transferTooltip ? transferTooltip(rowData) : 'Görevleri Devret',
              disabled: !isTransferable(user, rowData),
              hidden: Array.isArray(rowData),
              position: "row",
              onClick: (event, rowData) => handleOpenTransferModal(rowData)
            }),
            rowData => (!noRowActions && authorization.delete && handleOpenDeleteModal && isDeletable && {
              icon: tableIcons.Delete,
              tooltip: deleteTooltip ? deleteTooltip(rowData) : 'Sil',
              disabled: Array.isArray(rowData) ? false : !isDeletable(user, rowData),
              hidden: isDeleteHidden && isDeleteHidden(rowData),
              position: "row",
              onClick: (event, rowData) => handleOpenDeleteModal(rowData)
            }),
            // A HIDDEN ACTION TO TRIGGER THE ACTIONS COLUMN WHEN THERE ARE TRANSFER OR DELETE FUNCTIONALITIES
            !noRowActions && (handleOpenDeleteModal || handleOpenTransferModal) && {
              icon: tableIcons.Add,
              hidden: true,
              tooltip: " ",
              position: "row",
              onClick: null
            },
            !noRowActions && extraAction && extraAction.auth && {
              icon: extraAction?.icon,
              tooltip: extraAction?.tooltip,
              position: extraAction?.position,
              onClick: (event, rowData) => extraAction.onClick(rowData)
            },
            // For Drill Page, this actionModal prop is needed, (This is not the best solution!!)
            !noRowActions && actionModal && actionModal.auth && {
              icon: actionModal?.icon,
              tooltip: actionModal?.tooltip,
              position: actionModal?.position,
              onClick: (event, rowData) => actionModal.onClick(rowData)
            },
            {
              icon: tableIcons.exportPDF,
              tooltip: "PDF Olarak İndir",
              isFreeAction: true,
              onClick: () => {
                if(tableRef?.current?.state) {
                  exportToPDF(tableRef.current.state.columns, tableRef.current.state.data, tableName);
                }
              }
            }, 
            {
              icon: tableIcons.exportXLSX,
              tooltip: "XLSX Olarak İndir",
              isFreeAction: true,
              onClick: () => {
                if(tableRef?.current?.state) {
                  exportToXLSX(tableRef.current.state.columns, tableRef.current.state.data, tableName);
                }
              }
            },
            {
              icon: tableIcons.Refresh,
              tooltip: "Yenile",
              isFreeAction: true,
              onClick: () => {
                if(reloadFunction) {
                  reloadFunction()
                } else {
                  tableRef.current && tableRef.current.onQueryChange()
                }
              },
            }, 
            authorization.create && handleOpenModal && !disableCreate && {
              icon: tableIcons.Add,
              tooltip: language.tableLocalization.body.addTooltip,
              isFreeAction: true,
              onClick: () => handleOpenModal(null),
            }
          ]}
          components={{
            Toolbar: props => (
              <div style={{
                paddingBottom: 10, 
                position: "sticky", 
                top: 60, 
                zIndex: 10,
                backgroundColor: theme.palette.background.paper
              }}>
                <MTableToolbar {...props} />
                {guideLink &&
                <div style={{marginLeft: 20 , textAlign: "left"}}>
                  <IconTooltipButton title="Kılavuz" label="Kılavuz" onClick={openGuide} >
                    <MenuBookIcon />
                  </IconTooltipButton>
                </div>}
                {headerComponents &&
                <div style={{marginLeft: 20 , textAlign: "left"}}>
                  {headerComponents}
                </div>}
              </div>
            ),
            /* Header: props => (
              <MTableHeader {...props} data-sticky style={{
                position: 'sticky',
                top: 0
              }}/>
            ), */
            Row: CustomRow,
            /* Body: (props) => (
              <CustomTableBody
                {...props}
                // headerHeight={tableHeaderHeight}
                tableWidth={1640}
                tableHeight={860}
                scrollIndex={scrollIndex}
              />
            ), */
          }}
        />
      </ResponsiveContainer>
    </React.Fragment>
  );
}
