import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

export const Header: React.FC = () => (
  <div>
    <AppBar position="sticky">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit">
          Frères de sang - Classic
        </Typography>
      </Toolbar>
    </AppBar>
  </div>
);
