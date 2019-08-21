import React, { useState } from "react";
import "./App.css";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import Volunteer from "./modules/volunteers";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" onClick={toggleDrawer}>
            Menu
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={toggleDrawer}>
        <p>Hello</p>
      </Drawer>
      <Container maxWidth="md">
        <Volunteer />
      </Container>
    </>
  );
}

export default App;
