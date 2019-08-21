import React, { useState, useEffect, useReducer } from "react";
import produce from "immer";
import { people as data } from "../../data";
import Fuse from "fuse.js";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@mdi/react";
import {
  mdiCloseCircle,
  mdiCheckCircle,
  mdiToggleSwitch,
  mdiToggleSwitchOff
} from "@mdi/js";

const initialState = data;

function reducer(state, action) {
  return produce(state, draft => {
    switch (action.type) {
      case "setPresent": {
        const temp = state.findIndex(({ id }) => action.payload === id);
        draft[temp].present = true;
        break;
      }
      case "setAbsent": {
        const temp = state.findIndex(({ id }) => action.payload === id);
        draft[temp].present = false;
        break;
      }
      case "setDoubleCheck": {
        const temp = state.findIndex(({ id }) => action.payload === id);
        draft[temp].doubleChecked = true;
        break;
      }
      case "unSetDoubleCheck":
        const temp = state.findIndex(({ id }) => action.payload === id);
        draft[temp].doubleChecked = false;
        break;
      case "sortSeat":
        draft.reverse();
        break;
      default:
        throw new Error();
    }
  });
}

export default () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const [state, dispatch] = useReducer(reducer, initialState);

  const options = {
    keys: ["name"]
  };

  useEffect(() => {
    const fuse = new Fuse(state, options);
    const result = fuse.search(searchTerm);
    setSearchResult(result);
  }, [searchTerm, state]);

  const handleChange = e => {
    const name = e.target.value;
    setSearchTerm(name);
  };

  const handlePresent = ({ present, id }) => () => {
    dispatch({
      type: !present ? "setPresent" : "setAbsent",
      payload: id
    });
  };

  const handleDoubleChecked = ({ doubleChecked, id }) => () => {
    dispatch({
      type: !doubleChecked ? "setDoubleCheck" : "unSetDoubleCheck",
      payload: id
    });
  };

  const sortToggle = () => {
    dispatch({
      type: "sortSeat"
    });
  };

  let results = searchResult.length === 0 ? state : searchResult;

  return (
    <>
      <TextField
        id="outlined-name"
        label="Name"
        margin="normal"
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
      />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell onClick={sortToggle}>Seat</TableCell>
            <TableCell>Present</TableCell>
            <TableCell>Double Checked</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map(({ id, name, seat, present, doubleChecked }) => {
            return (
              <TableRow key={id}>
                <TableCell>{name}</TableCell>
                <TableCell>{seat}</TableCell>
                <TableCell>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {present ? (
                      <Icon path={mdiCheckCircle} size={1} color="green" />
                    ) : (
                      <Icon path={mdiCloseCircle} size={1} color="red" />
                    )}
                    <IconButton
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={handlePresent({ present, id })}
                    >
                      {present ? (
                        <Icon path={mdiToggleSwitch} size={1} />
                      ) : (
                        <Icon path={mdiToggleSwitchOff} size={1} />
                      )}
                    </IconButton>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {doubleChecked ? (
                      <Icon path={mdiCheckCircle} size={1} color="green" />
                    ) : (
                      <Icon path={mdiCloseCircle} size={1} color="red" />
                    )}
                    <IconButton
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={handleDoubleChecked({ doubleChecked, id })}
                    >
                      {doubleChecked ? (
                        <Icon path={mdiToggleSwitch} size={1} />
                      ) : (
                        <Icon path={mdiToggleSwitchOff} size={1} />
                      )}
                    </IconButton>
                  </Box>

                  {doubleChecked}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
