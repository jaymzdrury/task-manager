import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NavBar from "../navbar";

test("Navbar style classes render", () => {
  render(<NavBar></NavBar>);
  expect(screen.getByRole("navigation")).toHaveAttribute(
    "class",
    "between p-6 sticky top-0 z-10 bg-background"
  );
});
