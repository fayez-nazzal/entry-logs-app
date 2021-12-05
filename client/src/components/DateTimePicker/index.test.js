import { render, screen } from "@testing-library/react";

import DateTimePicker from ".";
import React from "react";
import dayjs from "dayjs";

test("displays correctly with date formatted", () => {
  const props = {
    value: "2021-12-05T17:50:26.100Z",
    setValue: jest.fn(),
  };

  render(<DateTimePicker {...props} />);

  const field = screen.getByRole("textbox");

  expect(field).toBeInTheDocument();

  expect(field.value).toBe(dayjs(props.value).format("YYYY/MM/DD HH:mm a"));
});
