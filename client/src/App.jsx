import { Link, Route, Routes } from "react-router-dom";
import React, { useState } from "react";

import Container from "@mui/material/Container";
import HomeRoute from "./routes/home/index";
import LogRoute from "./routes/log";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import WatchRoute from "./routes/watch";

const containerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 5,
};

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const handlePageChange = (_, newPage) => {
    // In case of no new page (null), stick to the current page
    newPage && setCurrentPage(newPage);
  };

  return (
    <Container maxWidth="sm" sx={containerStyles}>
      <Typography component="h1" variant="h3" sx={{ mb: 2 }}>
        Time Logger
      </Typography>
      <ToggleButtonGroup
        exclusive
        color="primary"
        size="large"
        sx={{ mb: 4 }}
        value={currentPage}
        onChange={handlePageChange}
      >
        <ToggleButton as={(props) => <Link to="/log" {...props} />} value="log">
          Send a log entry
        </ToggleButton>
        <ToggleButton
          as={(props) => <Link to="/watch" {...props} />}
          value="watch"
        >
          Watch available logs
        </ToggleButton>
      </ToggleButtonGroup>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/log" element={<LogRoute />} />
        <Route path="/watch" element={<WatchRoute />} />
      </Routes>
    </Container>
  );
};

export default App;
