"use client";
import { useQuery } from "@apollo/client/react";
import LeadCard from "./LeadCard";
import { ILead, ILeadsData } from "../lib/_interfaces/lead.interface";
import { GET_LEADS } from "../lib/graphql/queries";

export default function LeadList() {
  const { data, loading, error } = useQuery<ILeadsData>(GET_LEADS);

  if (loading) return <p>Loading leads...</p>;
  if (error) return <p>Error loading leads</p>;

  const leads = data!.leads;

  const totalUsers = leads.length;
  const deliveryCount = leads.filter((l) => l.delivery).length;
  const pickupCount = leads.filter((l) => l.pickup).length;
  const paymentCount = leads.filter((l) => l.payment).length;

  return (
    <div className="space-y-6">
      {/* Summary stats */}
      <div className="bg-gray-100 p-4 rounded-md shadow-sm">
        <h3 className="font-semibold text-lg mb-2">Leads Summary</h3>
        <div className="flex justify-evenly text-center">
          <p>
            Total Users: <b>{totalUsers}</b>
          </p>
          <p>
            Delivery: <b>{deliveryCount}</b>
          </p>
          <p>
            Pickup: <b>{pickupCount}</b>
          </p>
          <p>
            Payment: <b>{paymentCount}</b>
          </p>
        </div>
      </div>

      {/* Lead cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leads.map((lead: ILead) => (
          <LeadCard key={lead.id} {...lead} />
        ))}
      </div>
    </div>
  );
}
