import { render, screen, waitFor } from "@testing-library/react";

import React from "react";
import WatchRoute from ".";
import axios from "axios";

jest.mock("axios", () => ({
  get: jest.fn(),
}));

test("Logs list is shown correctly after calling api endpoint", async () => {
  const setSnackStatus = jest.fn();
  axios.get.mockResolvedValue({
    data: [
      {
        id: 1,
        description: "first log",
        startDateTime: "2020-01-01T00:00:00.000Z",
        endDateTime: "2020-01-01T00:00:00.000Z",
      },
      {
        id: 2,
        description: "second log",
        startDateTime: "2020-01-01T00:00:00.000Z",
        endDateTime: "2020-01-01T00:00:00.000Z",
      },
    ],
  });

  render(<WatchRoute setSnackStatus={setSnackStatus} />);

  expect(axios.get).toHaveBeenCalledTimes(1);

  await waitFor(() => expect(screen.getByText("first log")).toBeDefined());
});
