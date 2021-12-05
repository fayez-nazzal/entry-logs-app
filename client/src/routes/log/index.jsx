import Box from "@mui/material/Box";
import DateTimePicker from "../../components/DateTimePicker";
import { Fab } from "@mui/material";
import Hidden from "@mui/material/Hidden";
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

  const SendFab = (props) => (
    <Fab
      size="medium"
      color="primary"
      data-testid="send-button"
      onClick={postLog}
      {...props}
    >
      <SendIcon />
    </Fab>
  );

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
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          mt: 1,
        }}
      >
        <DateTimePicker
          value={startDateTime}
          setValue={setStartDateTime}
          label="Start Date"
        />
        <Box ml={{ sm: 1, md: 3 }} mb={{ xs: 3, sm: 0 }} />
        <DateTimePicker
          value={endDateTime}
          setValue={setEndDateTime}
          label="End Date"
        />
        <Box mr={{ sm: 1, md: 2 }} />
        <SendFab
          sx={{
            position: {
              xs: "absolute",
              sm: "static",
            },
            bottom: {
              xs: 32,
              sm: "initial",
            },
            right: {
              xs: 32,
              sm: "initial",
            },
            ml: {
              sm: "auto",
            },
          }}
        />
      </Box>
    </>
  );
};

export default LogRoute;
