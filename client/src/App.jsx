import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";

import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import LogRoute from "./routes/log";
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import WatchRoute from "./routes/watch";
import dayjs from "dayjs";
import { useState } from "react";

const containerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 5,
};

const startOfDay = dayjs().set("hour", 0).set("minute", 0).set("second", 0);
const endOfDay = dayjs().set("hour", 23).set("minute", 59).set("second", 59);

const App = () => {
  const { pathname } = useLocation();
  const [description, setDescription] = useState("");
  const [startDateTime, setStartDateTime] = useState(startOfDay);
  const [endDateTime, setEndDateTime] = useState(endOfDay);
  const [snackStatus, setSnackStatus] = useState({
    open: false,
    message: "",
    duration: 6000,
    severity: "success",
  });

  const closeSnackbar = () => {
    setSnackStatus((prev) => ({ ...prev, open: false }));
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
        value={pathname.slice(1)}
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
        <Route
          path="/log"
          element={
            <LogRoute
              startDateTime={startDateTime}
              endDateTime={endDateTime}
              setStartDateTime={setStartDateTime}
              setEndDateTime={setEndDateTime}
              description={description}
              setDescription={setDescription}
              snackStatus={snackStatus}
              setSnackStatus={setSnackStatus}
            />
          }
        />
        <Route
          path="/watch"
          element={
            <WatchRoute
              snackStatus={snackStatus}
              setSnackStatus={setSnackStatus}
            />
          }
        />
        <Route path="*" element={<Navigate to="/log" />} />
      </Routes>
      <Snackbar
        open={snackStatus.open}
        autoHideDuration={snackStatus.duration}
        onClose={closeSnackbar}
        message={snackStatus.message}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackStatus.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackStatus.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default App;
