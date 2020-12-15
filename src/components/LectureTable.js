import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Grid,
  TextField,
  InputAdornment,
  Button,
} from "@material-ui/core";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import SearchIcon from "@material-ui/icons/Search";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const LectureTable = ({ search, lectures }) => {
  const [title, setTitle] = useState("");

  const history = useHistory();
  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  return (
    <React.Fragment>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} sm={8}>
          {search && (
            <form>
              <TextField
                type="text"
                fullWidth
                label="과목명"
                value={title}
                onChange={onChangeTitle}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <Button type="submit">
                        <SearchIcon />
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          )}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow style={{ color: "#648CFF" }}>
                  <StyledTableCell>과목코드</StyledTableCell>
                  <StyledTableCell>강의명</StyledTableCell>
                  <StyledTableCell>교수</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {lectures.map((l) => (
                  <TableRow key={l.code}>
                    <TableCell style={{color: "#50B4FF"}}>{l.code}</TableCell>
                    <TableCell
                      onClick={(e) => {
                        history.push("/detail/" + l.code);
                      }}
                    >
                      {l.title}
                    </TableCell>
                    <TableCell>{l.professor}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default LectureTable;
