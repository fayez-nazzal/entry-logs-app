import Box from "@mui/material/Box";
import DateTimePicker from "../../components/DateTimePicker";
import { Fab } from "@mui/material";
import LogField from "../../components/LogField/index";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const LogRoute = ({
  startDateTime,
  setStartDateTime,
  endDateTime,
  setEndDateTime,
  description,
  setDescription,
  snackStatus,
  setSnackStatus,
}) => {
  const postLog = () => {
    axios
      .post(`${process.env.REACT_APP_BASEPATH}/add`, {
        description,
        startDateTime: startDateTime.toISOString(),
        endDateTime: endDateTime.toISOString(),
      })
      .then(() => {
        setDescription("");
        setSnackStatus({
          open: true,
          message: "Log added successfully",
          duration: 3000,
          severity: "success",
        });
      })
      .catch((err) => {
        setSnackStatus({
          open: true,
          message: err.response?.data?.error || err.message,
          duration: 11000,
          severity: "error",
        });
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
