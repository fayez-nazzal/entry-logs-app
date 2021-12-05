import AdapterDayjs from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MuiDateTimePicker from "@mui/lab/DateTimePicker";
import TextField from "@mui/material/TextField";

const DateTimePicker = ({ value, setValue, label, ...rest }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MuiDateTimePicker
        value={value}
        label={label}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
        {...rest}
      />
    </LocalizationProvider>
  );
};

export default DateTimePicker;
