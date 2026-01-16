"use client";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { GET_LEADS, REGISTER_LEAD } from "../lib/graphql/queries";
import { ILead } from "../lib/_interfaces/lead.interface";

type FormErrors = Partial<ILead>;

const initialForm = {
  name: "",
  email: "",
  mobile: "",
  postcode: "",
  delivery: false,
  pickup: false,
  payment: false,
};
export default function RegisterForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});

  const [registerLead, { loading, error }] = useMutation(REGISTER_LEAD, {
    refetchQueries: [{ query: GET_LEADS }],
    awaitRefetchQueries: true, // ensures UI waits for refresh
    onCompleted: () => {
      setForm(initialForm);
      setErrors({});
    },
  });

  const validateForm = () => {
    const missingFields: string[] = [];

    if (!form.name.trim()) missingFields.push("name");
    if (!form.email.trim()) missingFields.push("email");
    if (!form.mobile.trim()) missingFields.push("mobile");
    if (!form.postcode.trim()) missingFields.push("postcode");

    if (!form.delivery && !form.pickup && !form.payment) {
      missingFields.push("delivery | pickup | payment");
    }

    if (missingFields.length > 0) {
      console.error(
        `Form validation failed. Missing/invalid fields: ${missingFields.join(
          ", "
        )}`
      );

      const fieldErrors: FormErrors = {};
      missingFields.forEach((field) => {
        fieldErrors[field as keyof typeof form] = `Field: ${field} is required`;
      });

      console.log(fieldErrors);

      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    await registerLead({
      variables: form,
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onSubmit={handleSubmit}
      className="bg-[#FEEABC] p-10 rounded-2xl shadow-md space-y-4 justify-center
flex-col"
    >
      <h2 className="text-xl font-semibold">Register New Customer</h2>
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

      <h4 className="font-bold">Services interested in:</h4>
      <div className="flex gap-4">
        <label>
          <input
            className="cursor-pointer"
            type="checkbox"
            checked={form.delivery}
            onChange={(e) => setForm({ ...form, delivery: e.target.checked })}
          />{" "}
          Delivery
        </label>
        <label>
          <input
            className="cursor-pointer"
            type="checkbox"
            checked={form.pickup}
            onChange={(e) => setForm({ ...form, pickup: e.target.checked })}
          />{" "}
          Pickup
        </label>
        <label>
          <input
            className="cursor-pointer"
            type="checkbox"
            checked={form.payment}
            onChange={(e) => setForm({ ...form, payment: e.target.checked })}
          />{" "}
          Payment
        </label>
      </div>
      <button
        type="submit"
        className="bg-[#C3D09A] text-white px-4 py-2 rounded-xl hover:bg-primary transition cursor-pointer"
      >
        Register Lead
      </button>
      {loading && <p>Submitting...</p>}
      {Object.keys(errors).length > 0 && (
        <p className="text-red-500 text-sm">
          Missing/invalid fields: {JSON.stringify(Object.keys(errors))}
        </p>
      )}
    </motion.form>
  );
}
