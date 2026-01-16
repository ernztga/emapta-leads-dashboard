import { gql } from "@apollo/client";

export const GET_LEADS = gql`
  query {
    leads {
      id
      name
      email
      mobile
      postcode
      delivery
      pickup
      payment
      created_at
    }
  }
`;

export const GET_LEAD = gql`
  query GetLead($id: ID!) {
    lead(id: $id) {
      id
      name
      email
      mobile
      postcode
      delivery
      pickup
      payment
      created_at
    }
  }
`;

export const REGISTER_LEAD = gql`
  mutation RegisterLead(
    $name: String!
    $email: String!
    $mobile: String!
    $postcode: String!
    $delivery: Boolean!
    $pickup: Boolean!
    $payment: Boolean!
  ) {
    register(
      name: $name
      email: $email
      mobile: $mobile
      postcode: $postcode
      delivery: $delivery
      pickup: $pickup
      payment: $payment
    ) {
      id
      name
    }
  }
`;
