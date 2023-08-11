import { FC } from "react";
import { TableHead, TableCell, TableRow } from "@mui/material";
import { IColumns } from "./types";
export const TableHeaders: FC<{ columns: IColumns[]; expandable: boolean }> = ({
  columns,
  expandable
}) => {
  return (
    <TableHead>
      <TableRow>
        {expandable && <TableCell></TableCell>}
        {columns.map((column: IColumns) => {
          if (column.hide) return null;
          return (
            <TableCell key={column.label} {...column.styles}>
              {column.label}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};
