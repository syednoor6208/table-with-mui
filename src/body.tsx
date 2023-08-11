import { FC, Fragment, useState, useRef } from "react";
import { TableBody, TableRow, TableCell, Table } from "@mui/material";
import { ITable, IData, IColumns, IGeneric, IPrintRow } from "./types";
import styled from "@emotion/styled";
import get from "lodash.get";

const ArrowIcon = styled.span`
  font-size: 1.2em;
  font-weight: bold;
  padding: 4px;
  width: 40px;
  cursor: pointer;
`;
const TableCellStyled = styled(TableCell)`
  width: 40px;
`;
interface _PrintRow extends IPrintRow {
  visibleColumns: number;
  fromExpand?: boolean;
  row: any;
}
const PrintRows: FC<_PrintRow> = ({
  row,
  columns,
  expandable,
  visibleColumns,
  fromExpand,
}) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const clickHandler = () => {
    setToggle((state: boolean) => {
      return !state;
    });
  };
  return (
    <Fragment>
      <TableRow>
        {expandable ? (
          <TableCellStyled>
            {Array.isArray(row?.children) ? (
              <Fragment>
                {toggle ? (
                  <ArrowIcon onClick={clickHandler}>&#9660;</ArrowIcon>
                ) : (
                  <ArrowIcon onClick={clickHandler}>&#9650;</ArrowIcon>
                )}
              </Fragment>
            ) : null}
          </TableCellStyled>
        ) : null}
        {typeof expandable === "function" && fromExpand
          ? expandable(row, columns)
          : columns.map((column: IGeneric<IColumns>) => {
              if (column.hide) return null;
              return (
                <TableCell key={`${column.path}`}>
                  {get(row, `${column.path}`)}
                </TableCell>
              );
            })}
      </TableRow>

      {expandable && toggle
        ? row?.children?.map((item: IData, index: number) => {
            return (
              <TableRow key={index.toString()}>
                <TableCell
                  colSpan={visibleColumns}
                  style={{ borderBottom: "none" }}
                >
                  <Table>
                    <TableBody>
                      <PrintRows
                        row={item}
                        columns={columns}
                        expandable={expandable}
                        visibleColumns={visibleColumns}
                        fromExpand={true}
                      />
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
            );
          })
        : null}
    </Fragment>
  );
};

const TableBodyStyle = styled(TableBody)`
  .hide-expandable-table {
    display: none;
  }
  .show-expandable-table {
    display: block;
  }
`;

export const TableBodyContainer: FC<ITable> = (props) => {
  const totalVisibleColumns = props.columns.filter(
    (column: IGeneric<IColumns>) => !column.hide
  ).length;
  const firstColumPath = `${props.columns[0].path}`;

  if (props.data.length === 0)
    return (
      <TableBody>
        <TableRow>
          <TableCell> No Data </TableCell>
        </TableRow>
      </TableBody>
    );

  return (
    <TableBodyStyle>
      {props.data.map((row: any) => {
        return (
          <PrintRows
            key={get(row, props.uniqueKey ?? firstColumPath)}
            row={row}
            columns={props.columns}
            expandable={props.expandable}
            visibleColumns={totalVisibleColumns + (props.expandable ? 1 : 0)}
          />
        );
      })}
    </TableBodyStyle>
  );
};
