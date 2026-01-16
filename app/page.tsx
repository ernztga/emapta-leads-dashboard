"use client";
import { ApolloProvider } from "@apollo/client/react";
import LeadList from "./components/LeadList";
import RegisterForm from "./components/RegisterForm";
import { client } from "./lib/graphql/apolloClient";

export default function HomePage() {
  return (
    <ApolloProvider client={client}>
      <main className="container mx-auto p-6 space-y-10">
        <h1 className="text-4xl font-bold text-center text-primary">
          Brighte Eats Dashboard
        </h1>
        <RegisterForm />
        <h2 className="text-2xl font-semibold flex justify-center">Current Leads</h2>
        <LeadList />
      </main>
    </ApolloProvider>
  );
}
