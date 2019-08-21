import React, { useState } from "react";
import "./App.css";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import Volunteer from "./modules/volunteers";
import Bus from "./modules/bus";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  return (
    <Router>
      <AppBar position="static" style={{ width: "100%" }}>
        <Toolbar>
          <Typography variant="h6" onClick={toggleDrawer}>
            Menu
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={toggleDrawer}>
        <div style={{ minWidth: "15em" }}>
          <nav>
            <ul>
              <li>
                <Link to="/">Volunteers</Link>
              </li>
              <li>
                <Link to="/bus/">Bus</Link>
              </li>
            </ul>
          </nav>
        </div>
      </Drawer>
      <Container maxWidth="md" style={{ overflowX: "auto" }}>
        <Route path="/" exact component={Volunteer} />
        <Route path="/bus/" component={Bus} />
      </Container>
    </Router>
  );
}
export default App;
