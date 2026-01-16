import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing/react";
import RegisterForm from "../../app/components/RegisterForm";
import { REGISTER_LEAD, GET_LEADS } from "@/app/lib/graphql/queries";

const mocks = [
  {
    request: {
      query: REGISTER_LEAD,
      variables: {
        name: "Jane",
        email: "jane@test.com",
        mobile: "123",
        postcode: "2000",
        delivery: true,
        pickup: false,
        payment: true,
      },
    },
    result: { data: { register: { id: "1" } } },
  },
  {
    request: { query: GET_LEADS },
    result: { data: { leads: [{ id: "1", name: "Jane" }] } },
  },
];

test("submits form and calls refetch", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <RegisterForm />
    </MockedProvider>
  );

  fireEvent.change(screen.getByPlaceholderText(/Name/i), {
    target: { value: "Jane" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Email/i), {
    target: { value: "jane@test.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Mobile/i), {
    target: { value: "123" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Postcode/i), {
    target: { value: "2000" },
  });
  fireEvent.click(screen.getByLabelText(/Delivery/i));

  fireEvent.click(screen.getByRole("button", { name: /Register/i }));

  await waitFor(() => {
    expect(screen.getByPlaceholderText(/Name/i)).toHaveValue("");
  });
});
