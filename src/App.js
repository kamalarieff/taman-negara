import React, { useState } from "react";
import "./App.css";
import { data } from "./data";
import Container from "@material-ui/core/Container";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Fuse from "fuse.js";

function App() {
  const temp = data.map(item => {
    const names = item["Who"].split(",");
    return { ...item, Who: [...names] };
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(temp);
  const fuse = new Fuse(temp, { keys: ["Who"], threshold: "0" });

  const handleChange = e => {
    const name = e.target.value;
    setSearchTerm(name);
    if (name === "") {
      setSearchResult(temp);
      return;
    }

    const result = fuse.search(name);
    setSearchResult(result);
  };

  console.log("searchResult", searchResult);
  return (
    <Container maxWidth="md">
      <TextField
        id="outlined-name"
        label="Name"
        margin="normal"
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Day</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Task</TableCell>
            <TableCell>Who</TableCell>
            <TableCell>Note</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchResult.map(({ Day, Time, Task, Who, Note }) => {
            return (
              <TableRow>
                <TableCell>{Day}</TableCell>
                <TableCell>{Time}</TableCell>
                <TableCell>{Task}</TableCell>
                <TableCell>
                  {Who.map(name => (
                    <p>{name}</p>
                  ))}
                </TableCell>
                <TableCell>{Note}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Container>
  );
}

export default App;
