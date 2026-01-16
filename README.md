# Brighte Eats Leads Dashboard

A dashboard to manage leads for Brighte Eats, built with **Next.js**, **TypeScript**, **Apollo GraphQL**, and **Supabase** as the backend database. This project allows you to:

* View all customer leads
* Register new leads
* Get lead details by ID
* Sort leads by date or name

---

## Table of Contents

* [Technologies](#technologies)
* [Supabase Setup](#supabase-setup)
* [Environment Variables](#environment-variables)
* [Installation](#installation)
* [Running Locally](#running-locally)
* [API Endpoints](#api-endpoints)
* [Testing](#testing)

---

## Technologies Used

* Next.js
* TypeScript
* Apollo GraphQL
* Supabase (PostgreSQL)
* TailwindCSS
* Jest & React Testing Library for unit tests

---

## Supabase Setup

1. Create a [Supabase](https://supabase.com/) project.
2. Create a `leads` table with the following columns:

| Column     | Type      | Notes                 |
| ---------- | --------- | --------------------- |
| id         | UUID      | Primary Key, auto-gen |
| name       | Text      | Not null              |
| email      | Text      | Not null, unique      |
| mobile     | Text      | Not null              |
| postcode   | Text      | Not null              |
| delivery   | Boolean   | Default false         |
| pickup     | Boolean   | Default false         |
| payment    | Boolean   | Default false         |
| created_at | Timestamp | Default `now()`       |

Alternatively, you can create the table with the SQL editor using the following command:
```
create table leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  mobile text not null,
  postcode text not null,
  delivery boolean not null,
  pickup boolean not null,
  payment boolean not null,
  created_at timestamp with time zone default now()
);
```

3. Get your **API keys** from Supabase:

   * `SUPABASE_URL`
   * `SUPABASE_SERVICE_ROLE_KEY`

---

## Environment Variables

Create a `.env` file in the root of your project:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_SECRET_KEY=your_supabase_service_role_key
```

* You will use these environment variables so that supabase can connect to your local application
---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ernztga/emapta-leads-dashboard.git
cd emapta-leads-dashboard
```

2. Install dependencies:

```bash
npm install
```

---

## Running Locally

1. Start the development server:

```bash
npm run dev
```

2. Open your browser at [http://localhost:3000](http://localhost:3000)
3. Once on the website, you can add users using the registration form. Just add the required fields and click register lead. A dashboard of total users, data on service types, and sorting is also in the page.
4. Alternatively you can add, retrieve, find data by id using the graphql API endpoints section below.

---

## API Endpoints

All API operations are exposed via **GraphQL**. You can also use the apollo api playground at [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql)

### 1. Get All Leads

```graphql
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
```

### 2. Get Lead By ID

```graphql
query GetLead($id: String!) {
  lead(id: $id) {
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
```
In the variables tab on api testing platform, you can add the following

**Variables example:**

```json
{
  "id": "your-lead-id" // e.g.: "id": "d1d6ffc0-0a67-4f5e-925e-8bca703d2ec4"
}
```

### 3. Register New Customer

```graphql
mutation RegisterLead(
  $name: String!
  $email: String!
  $mobile: String!
  $postcode: String!
  $delivery: Boolean!
  $pickup: Boolean!
  $payment: Boolean!
) {
  register(
    name: $name
    email: $email
    mobile: $mobile
    postcode: $postcode
    delivery: $delivery
    pickup: $pickup
    payment: $payment
  ) {
    id
    name
  }
}
```

**Variables example:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "mobile": "123456789",
  "postcode": "2000",
  "delivery": true,
  "pickup": false,
  "payment": true
}
```
---

## Testing

Unit tests are implemented using **Jest** and **React Testing Library**.

* Run all tests:

```bash
npm run test
```

* Example: `LeadList` and `RegisterForm` components are fully tested with mock GraphQL responses.

---

## Notes

* Always ensure `.env` has the correct Supabase keys.
* GraphQL server is served from `app/api/graphql/route.ts`.
* Apollo Client handles caching and auto-refetch on mutations for up-to-date UI.
* Use `npm run dev` for development, `npm run build && npm run start` for production.
* TailwindCSS configuration is in `tailwind.config.js`.

---
