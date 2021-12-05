import { fireEvent, render, screen } from "@testing-library/react";

import LogField from ".";
import React from "react";

test("displays correctly", () => {
  const props = {
    value: "",
    setValue: jest.fn(),
  };

  render(<LogField {...props} />);

  const field = screen.getByRole("textbox");

  expect(field).toBeInTheDocument();

  fireEvent.change(field, { target: { value: "test" } });

  expect(props.setValue).toHaveBeenCalledWith("test");
});

test("changes value", () => {
  const props = {
    value: "",
    setValue: jest.fn(),
  };

  render(<LogField {...props} />);

  const field = screen.getByRole("textbox");

  fireEvent.change(field, { target: { value: "test" } });

  expect(props.setValue).toHaveBeenCalledWith("test");
});
