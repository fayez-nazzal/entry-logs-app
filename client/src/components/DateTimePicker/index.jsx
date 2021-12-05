import AdapterDayjs from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
import TextField from "@mui/material/TextField";

const DateTimePicker = ({ value, setValue, label, ...rest }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDateTimePicker
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
