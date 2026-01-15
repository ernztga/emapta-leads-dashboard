import { gql } from "apollo-server-core";

export const typeDefs = gql`
  type Lead {
    id: ID!
    name: String!
    email: String!
    mobile: String!
    postcode: String!
    delivery: Boolean!
    pickup: Boolean!
    payment: Boolean!
    created_at: String!
  }

  type Query {
    leads: [Lead!]!
    lead(id: ID!): Lead
  }

  type Mutation {
    register(
      name: String!
      email: String!
      mobile: String!
      postcode: String!
      delivery: Boolean!
      pickup: Boolean!
      payment: Boolean!
    ): Lead!
  }
`;
