import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useStyles } from './styles';

export default function CustomTable({ tableData }) {
  const { headers, body } = tableData;
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.tableCont}>
      <Table aria-label="simple table">
        <TableHead className={classes.tableHead}>
          <TableRow>
            {headers.map((header) => (
              <TableCell>
                <strong>{header}</strong>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {body.map((row) => (
            <TableRow className={classes.tableRow} {...row.attributes}>
              {row.cells.map((cell) => (
                <TableCell {...cell.attributes} className={classes.tableCell}>
                  {cell.value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
