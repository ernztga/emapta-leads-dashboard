"use client";
import { motion } from "framer-motion";
import { ILead } from "../lib/_interfaces/lead.interface";

export default function LeadCard({
  name,
  email,
  mobile,
  postcode,
  delivery,
  pickup,
  payment,
}: ILead) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow"
    >
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-gray-500">
        {email} | {mobile}
      </p>
      <p className="text-gray-500">{postcode}</p>
      <div className="mt-2 flex gap-2">
        {delivery && (
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
            Delivery
          </span>
        )}
        {pickup && (
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
            Pickup
          </span>
        )}
        {payment && (
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
            Payment
          </span>
        )}
      </div>
    </motion.div>
  );
}
