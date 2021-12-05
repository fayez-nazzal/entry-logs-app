export const listStyles = {
  width: "100%",
  position: "relative",
  overflowX: "hidden",
  overflowY: "auto",
  maxHeight: 400,
  padding: "0 12px",
  "& ul": { padding: 0 },
  "& *": {
    wordWrap: "break-word !important",
  },
};

export const listItemStyles = {
  borderRadius: 2,
  bgcolor: "#f8f8f8",
  display: "flex",
  flexDirection: "column",
  mb: 2,
  "&:hover": {
    backgroundColor: "#f1f1f1",
    transition: "background-color 0.2s ease-in-out",
  },
};

export const listItemTextStyles = {
  minHeight: 40,
  maxHeight: 120,
  width: "400px",
  overflowX: "hidden",
  overflowY: "auto",
};
