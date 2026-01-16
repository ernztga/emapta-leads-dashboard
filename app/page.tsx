"use client";
// import LeadList from "./components/LeadList";
import RegisterForm from "./components/RegisterForm";

export default function HomePage() {
  return (
    <main className="container mx-auto p-6 space-y-10">
      <h1 className="text-4xl font-bold text-center text-primary">
        Brighte Eats Dashboard
      </h1>
      <RegisterForm />
      <h2 className="text-2xl font-semibold">Leads</h2>
      {/* <LeadList /> */}
    </main>
  );
}
