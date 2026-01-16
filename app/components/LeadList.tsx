"use client";
import { useQuery } from "@apollo/client/react";
import LeadCard from "./LeadCard";
import { ILead, ILeadsData } from "../lib/_interfaces/lead.interface";
import { GET_LEADS } from "../lib/graphql/queries";

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
