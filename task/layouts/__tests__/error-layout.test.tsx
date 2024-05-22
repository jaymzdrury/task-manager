import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ErrorLayout from "../error-layout";

function renderLayout({
  header = "Header",
  title = "Title",
  message = "Message",
}) {
  render(
    <ErrorLayout header={header} title={title} message={message}></ErrorLayout>
  );
  return { header, title, message };
}

test("Error Layout is wrapped in main", () => {
  renderLayout({});
  expect(screen.getByRole("main")).toBeInTheDocument();
});

test("Error Layout renders h2", () => {
  renderLayout({});
  expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
});

test("Error Layout header renders properly", () => {
  const { header } = renderLayout({});
  expect(screen.getByText(header)).toHaveAttribute(
    "class",
    "center absolute top-0 text-[300px] mt-[40px] text-muted font-bold"
  );
});
