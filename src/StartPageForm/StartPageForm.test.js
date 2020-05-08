import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StartPageForm from "./StartPageForm.js";

test("Test that component exists", () => {
  render(<StartPageForm></StartPageForm>);
  // screen.getByText("");
});

test("Test that component exists", () => {
  render(<StartPageForm></StartPageForm>);
  screen.getByLabelText("Enter your github username");
  screen.getByLabelText("Easy mode");
  screen.getByLabelText("Hard mode");
  screen.getByLabelText("Press button to start");
});
