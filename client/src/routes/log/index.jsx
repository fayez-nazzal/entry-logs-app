import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import DateTimePicker from "../../components/DateTimePicker";
import { Fab } from "@mui/material";
import LogField from "../../components/LogField/index";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import dayjs from "dayjs";

const baseURL = "http://localhost:3000/entrylogs";

const startOfDay = dayjs().set("hour", 0).set("minute", 0).set("second", 0);
const endOfDay = dayjs().set("hour", 23).set("minute", 59).set("second", 59);

const LogRoute = () => {
  const [description, setDescription] = useState("");

  const [startDateTime, setStartDateTime] = useState(startOfDay);

  const [endDateTime, setEndDateTime] = useState(endOfDay);

  const postLog = () => {
    axios
      .post(baseURL, {
        description,
        startDateTime: startDateTime.toISOString(),
        endDateTime: endDateTime.toISOString(),
      })
      .then(() => {
        setDescription("");
      });
  };

  return (
    <>
      <LogField value={description} setValue={setDescription} />
      <Box
        sx={{
          width: {
            xs: 300,
            sm: 500,
            lg: 668,
          },
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          mt: 1,
        }}
      >
        <DateTimePicker
          value={startDateTime}
          setValue={setStartDateTime}
          label="Start Date"
        />
        <Box ml={3} />
        <DateTimePicker
          value={endDateTime}
          setValue={setEndDateTime}
          label="End Date"
        />
        <Fab
          size="medium"
          color="primary"
          sx={{ ml: "auto" }}
          onClick={postLog}
        >
          <SendIcon />
        </Fab>
      </Box>
    </>
  );
};

export default LogRoute;
