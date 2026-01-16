import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing/react";
import LeadList from "../../app/components/LeadList";
import { GET_LEADS } from "../../app/lib/graphql/queries";

const mocks = [
  {
    request: { query: GET_LEADS },
    result: {
      data: {
        leads: [
          {
            id: "1",
            name: "John",
            email: "john@test.com",
            mobile: "123",
            postcode: "2000",
            delivery: true,
            pickup: false,
            payment: true,
          },
        ],
      },
    },
  },
];

test("renders leads from query", async () => {
  render(
    <MockedProvider mocks={mocks}>
      <LeadList />
    </MockedProvider>
  );

  expect(screen.getByText(/Loading/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText("John")).toBeInTheDocument();
  });
});
