"use client";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { gql } from "@apollo/client";

const REGISTER_LEAD = gql`
  mutation RegisterLead($input: RegisterInput!) {
    register(input: $input) { # Send the whole object at once
      id
      name
    }
  }
`;

export default function RegisterForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    postcode: "",
    delivery: false,
    pickup: false,
    payment: false,
  });

  const [registerLead, { loading, error }] = useMutation(REGISTER_LEAD, {
    variables: { input: form },
    onCompleted: () => alert("Lead registered!"),
  });

  return (
    <motion.form
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onSubmit={(e) => {
        e.preventDefault();
        registerLead();
      }}
      className="bg-white p-6 rounded-2xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold">Register New Lead</h2>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full p-2 border rounded-md"
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full p-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Mobile"
        value={form.mobile}
        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
        className="w-full p-2 border rounded-md"
      />
      <input
        type="text"
        placeholder="Postcode"
        value={form.postcode}
        onChange={(e) => setForm({ ...form, postcode: e.target.value })}
        className="w-full p-2 border rounded-md"
      />
      <div className="flex gap-4">
        <label>
          <input
            type="checkbox"
            checked={form.delivery}
            onChange={(e) => setForm({ ...form, delivery: e.target.checked })}
          />{" "}
          Delivery
        </label>
        <label>
          <input
            type="checkbox"
            checked={form.pickup}
            onChange={(e) => setForm({ ...form, pickup: e.target.checked })}
          />{" "}
          Pickup
        </label>
        <label>
          <input
            type="checkbox"
            checked={form.payment}
            onChange={(e) => setForm({ ...form, payment: e.target.checked })}
          />{" "}
          Payment
        </label>
      </div>
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-red-500 transition"
      >
        Register Lead
      </button>
      {loading && <p>Submitting...</p>}
      {error && <p className="text-red-500">Error submitting lead</p>}
    </motion.form>
  );
}
