import { render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";
import CarList from "./components/CarList.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

test("App renders header", () => {
  render(<App />);
  expect(screen.getByText(/Car List/i)).toBeInTheDocument();
});

test("Shows loading initially", () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <CarList />
    </QueryClientProvider>,
  );

  expect(screen.getByText(/Loading/i)).toBeInTheDocument();
});
