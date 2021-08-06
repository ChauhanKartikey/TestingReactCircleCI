import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import User from "../User";

const server = setupServer(
  rest.get("https://reqres.in/api/users", (req, res, ctx) => {
    return res(
      ctx.json({
        data: [
          {
            id: 1,
            first_name: "rahul",
            last_name: "lakshman",
          },
          {
            id: 2,
            first_name: "rahul",
            last_name: "lakshman",
          },
          {
            id: 3,
            first_name: "rahul",
            last_name: "lakshman",
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

let btn, component;
beforeEach(() => {
  component = render(<User />);
  btn = component.getByText("Fetch Users");
});

test("Check if fetch users button exists", () => {
  expect(btn).toBeTruthy();
});

test("Clicking on button fetches users", async () => {
  const ul = component.getByRole("list");
  expect(ul.children.length).toBe(0);
  fireEvent.click(btn);
  await waitFor(() => expect(ul.children.length).toBeTruthy());
  expect(ul.children.length).toBe(3);
});
