"use client";
import { gql, useQuery } from "@apollo/client";
import LeadCard from "./LeadCard";

const GET_LEADS = gql`
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

export default function LeadList() {
  const { data, loading, error } = useQuery(GET_LEADS);

  if (loading) return <p>Loading leads...</p>;
  if (error) return <p>Error loading leads</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.leads.map((lead: any) => (
        <LeadCard key={lead.id} {...lead} />
      ))}
    </div>
  );
}
