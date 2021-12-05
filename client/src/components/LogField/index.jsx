import TextField from "@mui/material/TextField";

const LogField = ({ value, setValue }) => {
  return (
    <TextField
      id="entry-log-description"
      label="Description"
      multiline
      rows={4}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      variant="outlined"
      sx={{
        width: {
          xs: 300,
          sm: 500,
          lg: 675,
        },
        marginBottom: 2,
      }}
    />
  );
};

export default LogField;
