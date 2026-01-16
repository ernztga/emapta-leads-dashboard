import { ILead } from "@/app/lib/_interfaces/lead.interface";
import { supabase } from "../db/supabase";

export const resolvers = {
  Query: {
    leads: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);
      return data;
    },

    lead: async (_: unknown, { id }: { id: string }) => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
  },

  Mutation: {
    register: async (_: unknown, args: ILead) => {
      const { data, error } = await supabase
        .from("leads")
        .insert([args])
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data;
    },
  },
};
