"use client";
import { useQuery } from "@apollo/client/react";
import LeadCard from "./LeadCard";
import { gql } from "@apollo/client";
import { ILead, ILeadsData } from "../lib/_interfaces/lead.interface";


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
  const { data, loading, error } = useQuery<ILeadsData>(GET_LEADS);

  if (loading) return <p>Loading leads...</p>;
  if (error) return <p>Error loading leads</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data!.leads.map((lead: ILead) => (
        <LeadCard key={lead.id} {...lead} />
      ))}
    </div>
  );
}
