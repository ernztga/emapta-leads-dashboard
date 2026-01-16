"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react";
import LeadCard from "./LeadCard";
import { ILead, ILeadsData } from "../lib/_interfaces/lead.interface";
import { GET_LEADS } from "../lib/graphql/queries";

type SortOption = "date-desc" | "date-asc" | "name-asc" | "name-desc";

export default function LeadList() {
  const [sortBy, setSortBy] = useState<SortOption>("date-desc");

  const { data, loading, error } = useQuery<ILeadsData>(GET_LEADS);

  const sortedLeads = useMemo<ILead[]>(() => {
    const leads = data?.leads ?? [];
    return [...leads].sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "date-asc":
          return (
            new Date(a.created_at!).getTime() -
            new Date(b.created_at!).getTime()
          );
        case "date-desc":
        default:
          return (
            new Date(b.created_at!).getTime() -
            new Date(a.created_at!).getTime()
          );
      }
    });
  }, [data, sortBy]);

  if (loading) return <p>Loading leads...</p>;
  if (error) return <p>Error loading leads</p>;

  const totalUsers = sortedLeads.length;
  const deliveryCount = sortedLeads.filter((l) => l.delivery).length;
  const pickupCount = sortedLeads.filter((l) => l.pickup).length;
  const paymentCount = sortedLeads.filter((l) => l.payment).length;

  return (
    <div className="space-y-6">
      {/* Summary */}
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

      {/* Sorting */}
      <div className="flex justify-end mb-4 items-center gap-2">
        <p className="font-semibold">Sort by:</p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="border p-2 rounded-md"
        >
          <option value="date-desc">Date added (Newest)</option>
          <option value="date-asc">Date added (Oldest)</option>
          <option value="name-asc">Name (A–Z)</option>
          <option value="name-desc">Name (Z–A)</option>
        </select>
      </div>

      {/* Lead cards */}
      {sortedLeads.length === 0 ? (
        <p className="text-center text-gray-500">No leads found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedLeads.map((lead) => (
            <LeadCard key={lead.id} {...lead} />
          ))}
        </div>
      )}
    </div>
  );
}
