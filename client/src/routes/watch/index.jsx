import React, { useState } from "react";
import { listItemStyles, listItemTextStyles, listStyles } from "./index.styles";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { formatIsoDateTime } from "../../utils/datetime";
import { useEffect } from "react";

const WatchRoute = ({ snackStatus, setSnackStatus }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BASEPATH)
      .then((response) => {
        setLogs(response.data);
      })
      .catch((err) => {
        showError(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearAll = () => {
    axios
      .delete(process.env.REACT_APP_BASEPATH)
      .then(() => {
        setLogs([]);
        setSnackStatus({
          open: true,
          message: "Cleared all logs",
          duration: 1200,
          severity: "success",
        });
      })
      .catch((err) => {
        showError(err);
      });
  };

  const showError = (err) => {
    setSnackStatus({
      open: true,
      message: err.response?.data?.error || err.message,
      duration: 11000,
      severity: "error",
    });
  };

  return (
    <>
      <Box display="flex" width="96%">
        <Typography variant="body1" component="h2" sx={{ mb: 2 }}>
          Logs - sorted by start date-time
        </Typography>
        <Button
          color="error"
          variant="outlined"
          sx={{ mb: 2, ml: "auto" }}
          onClick={clearAll}
          size="small"
        >
          Clear All
        </Button>
      </Box>

      <List sx={listStyles} subheader={<li />}>
        {logs
          .sort((a, b) => (a.startDateTime > b.startDateTime ? 1 : -1))
          .map((log) => (
            <ListItem key={log.id} sx={listItemStyles}>
              <ListItemText sx={listItemTextStyles} primary={log.description} />
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Typography
                  color="text.secondary"
                  variant="caption"
                  sx={{ mr: 4 }}
                >
                  Start Date: {formatIsoDateTime(log.startDateTime)}
                </Typography>
                <Typography color="text.secondary" variant="caption">
                  End Date: {formatIsoDateTime(log.endDateTime)}
                </Typography>
              </Box>
            </ListItem>
          ))}
      </List>
    </>
  );
};

export default WatchRoute;
