import { useMemo } from "react";
import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

// import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableHeaders } from "./columns";
import { TableBodyContainer } from "./body";
import { IColumns, IGeneric, IData } from "./types";
import { columnsDefaults } from "./defaults";
import { TableCell } from "@mui/material";
const createData = (
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  children?: any[]
): IData => {
  return { name, calories, fat, carbs, protein, children };
};

const rows: Array<IData> = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, [
    {
      name: "Blue berry",
      calories: 14,
      fat: 3.0,
      carbs: 19.2,
      protein: 2.0,
      children: [
        {
          name: "Green berry",
          calories: 10,
          fat: 2.0,
          carbs: 13.2,
          protein: 1.0,
        },
      ],
    },
  ]),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const columns = [
  {
    label: "Dessert (100g serving)",
    path: "name",
  },
  {
    label: "Calories",
    path: "calories",
  },
  {
    label: "Fat (g)",
    path: "fat",
  },
  {
    label: "carbs (g)",
    path: "carbs",
  },
  {
    label: "Protein (g)",
    path: "protein",
  },
];

export default function App() {
  const tableColumns = useMemo(() => {
    return columns.map((column: IColumns) => {
      return { ...columnsDefaults, ...column };
    });
  }, []);
  return (
    <div style={{ height: 400, width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHeaders columns={tableColumns} expandable={true} />
          <TableBodyContainer
            uniqueKey="name"
            data={rows}
            columns={tableColumns}
            expandable={(row, columns) => {
              console.log("row--->", row);
              return <TableCell> Hello There </TableCell>;
            }}
            // expandable={true}
          />
        </Table>
      </TableContainer>
    </div>
  );
}
