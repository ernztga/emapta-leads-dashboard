import LeadCard from "../../app/components/LeadCard";
import { render, screen } from "@testing-library/react";

test("renders lead info correctly", () => {
  render(
    <LeadCard
      id="1"
      name="John Doe"
      email="john@example.com"
      mobile="0412345678"
      postcode="2000"
      delivery={true}
      pickup={false}
      payment={true}
    />
  );

  expect(screen.getByText("John Doe")).toBeInTheDocument();
  expect(screen.getByText("john@example.com | 0412345678")).toBeInTheDocument();
  expect(screen.getByText("Delivery")).toBeInTheDocument();
  expect(screen.getByText("Payment")).toBeInTheDocument();
  expect(screen.queryByText("Pickup")).not.toBeInTheDocument();
});
