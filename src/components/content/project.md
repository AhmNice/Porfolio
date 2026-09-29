# Building Servo: A Fuel Delivery Platform

> A backend-driven fuel delivery platform designed to simplify ordering, payment, station management, and fuel delivery.

## 1. What Is Servo?

Servo is a fuel delivery platform that allows customers to order fuel from nearby stations and have it delivered to their location.

The system provides different parts of the platform for customers, administrators, fuel stations, and delivery agents.

At a high level, the system handles:

* Fuel ordering
* Station management
* Fuel pricing
* Payment processing
* Order assignment
* Order status management
* Agent management
* Authentication and authorization

I worked primarily on the backend, where I designed and implemented the APIs, business logic, database interactions, authentication, payment integration, and order management workflows.

---

## 2. The Problem

Buying fuel can sometimes require physically visiting a filling station, waiting in queues, and dealing with unpredictable availability.

For users who need fuel but cannot easily visit a station, this creates an inconvenience.

There was also a need for a system that could coordinate the different parties involved:

```text
Customer
   ↓
Fuel Order
   ↓
Payment
   ↓
Station
   ↓
Delivery Agent
   ↓
Customer
```

The challenge was not simply creating an application where users could place orders.

The system also needed to keep track of the state of each order and make sure that operations such as payment, assignment, and completion happened correctly.

---

## 3. Why I Built It

I built Servo as an opportunity to work on a system that involved more complex backend problems than a typical CRUD application.

I wanted to understand how to design a backend around real business rules rather than simply creating endpoints that read and write data.

Some of the areas I wanted to explore included:

* Transactional database operations
* Order state management
* Authentication and authorization
* Payment processing
* Concurrency
* Repository and service architecture
* API design
* Error handling
* Real-world business rules

The project therefore became both a product idea and an opportunity to improve my backend engineering skills.

---

## 4. The Solution

Servo provides a centralized system for managing the complete fuel ordering process.

A simplified order flow looks like this:

```text
Customer
   │
   ▼
Create Order
   │
   ▼
Payment
   │
   ▼
Order Confirmation
   │
   ▼
Agent Assignment
   │
   ▼
Delivery
   │
   ▼
Order Completion
```

Each stage has its own rules.

For example, an order should not be assigned to an agent before it reaches the appropriate state, and an order that has already been assigned should not be assigned to another agent.

This meant that the backend had to enforce these rules rather than relying entirely on the frontend.

---

## 5. Key Features

### Authentication

Users can register and authenticate before accessing protected resources.

Authentication is handled using access and refresh tokens.

Protected API routes use authentication middleware to verify the user's session.

### Fuel Station Management

Administrators can manage fuel stations and their available fuel types.

Each station can have different prices for:

* Petrol
* Diesel
* Cooking gas

### Order Management

Customers can create and track their fuel orders.

Orders move through predefined states rather than being changed arbitrarily.

Example:

```text
PENDING_PAYMENT
       ↓
PENDING_CONFIRMATION
       ↓
PROCESSING
       ↓
ASSIGNED
       ↓
IN_TRANSIT
       ↓
ARRIVED
       ↓
COMPLETED
```

### Agent Assignment

Orders can be assigned to available delivery agents.

The backend ensures that an order cannot be incorrectly assigned to multiple agents.

### Payment Integration

The platform integrates with payment providers to process customer payments.

Payment events are verified on the backend before the order is treated as successfully paid.

### API Validation

Incoming request data is validated before reaching the business logic.

This prevents invalid data from entering the application.

---

## 6. Architecture

The backend follows a layered architecture.

```text
                    ┌──────────────┐
                    │    Client    │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │    Routes    │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  Controller  │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │   Service    │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │ Repository   │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  PostgreSQL  │
                    └──────────────┘
```

### Controller

Controllers are responsible for handling HTTP requests and responses.

They do not contain the main business logic.

For example:

```ts
const createOrder = async (req: Request, res: Response) => {
  const order = await orderService.createOrder(req.user.id, req.body);

  return res.status(201).json(
    new ApiResponse(201, order, "Order created successfully")
  );
};
```

### Service

The service layer contains the application's business logic.

For example, before creating an order, the service can verify:

* The station exists.
* The requested fuel type is available.
* The requested quantity is valid.
* The user is authorized to create the order.

### Repository

The repository layer handles database operations.

This keeps database-specific logic separate from the business logic.

---

## 7. Important Technical Decisions

### Why TypeScript?

I used TypeScript because the project contains several related entities and business operations.

Having explicit types makes it easier to reason about objects such as:

```ts
Order
Agent
Station
Transaction
User
```

It also helps catch many mistakes during development rather than at runtime.

### Why Prisma?

I used Prisma as the ORM for interacting with PostgreSQL.

One of the reasons I chose Prisma was its strong TypeScript integration and its support for transactions.

### Why PostgreSQL?

The application contains strongly related entities such as users, orders, stations, agents, and transactions.

A relational database was therefore a natural choice because the system benefits from:

* Relationships
* Foreign keys
* Transactions
* Constraints
* Consistent data

---

## 8. Tech Stack

| Technology | Purpose               |
| ---------- | --------------------- |
| TypeScript | Type-safe development |
| Node.js    | Backend runtime       |
| Express    | HTTP API framework    |
| PostgreSQL | Relational database   |
| Prisma     | ORM                   |
| Zod        | Request validation    |
| JWT        | Authentication        |
| Paystack   | Payment processing    |
| Cloudinary | File/image storage    |

---

## 9. Challenges I Encountered

### Challenge 1: Concurrent Agent Assignment

One of the more interesting problems was assigning orders to agents.

Imagine two agents trying to accept the same order at almost exactly the same time.

A naive implementation might do something like:

```ts
const order = await getOrder(orderId);

if (!order.agentId) {
  await assignAgent(orderId, agentId);
}
```

The problem is that both requests could read the order before either request updates it.

Both agents could therefore believe that the order is still available.

This is a concurrency problem.

---

### Challenge 2: Managing Order States

As the number of order operations increased, it became important to control which status transitions were actually allowed.

For example, an order should not move directly from:

```text
PENDING_PAYMENT → COMPLETED
```

without going through the required business process.

Allowing arbitrary status updates would make the system difficult to reason about.

---

### Challenge 3: Payment Verification

Another challenge was handling payment confirmation.

The application could not simply trust a request from the client saying:

```text
payment = successful
```

The backend needed to verify payment information with the payment provider and validate webhook requests.

---

## 10. How I Solved Them

### Solving Concurrent Agent Assignment

I moved the assignment operation into a database transaction.

The important part is that checking and updating the order should happen as one atomic operation.

Conceptually:

```ts
await prisma.$transaction(async (tx) => {
  const order = await getOrderForUpdate(orderId, tx);

  if (order.agentId) {
    throw new Error("Order has already been assigned");
  }

  await assignAgent(orderId, agentId, tx);
});
```

This prevents the application from treating the availability check and assignment as two unrelated operations.

The database becomes responsible for maintaining consistency.

---

### Solving Order State Management

Instead of allowing every part of the application to change an order to any status, I defined allowed transitions.

For example:

```ts
const allowedTransitions = {
  PENDING_PAYMENT: ["PENDING_CONFIRMATION"],
  PENDING_CONFIRMATION: ["PROCESSING"],
  PROCESSING: ["ASSIGNED"],
  ASSIGNED: ["IN_TRANSIT"],
  IN_TRANSIT: ["ARRIVED"],
  ARRIVED: ["COMPLETED"],
};
```

Before changing an order's status, the backend checks whether the transition is valid.

This keeps the business rules centralized.

---

### Solving Payment Verification

Payment requests are verified on the backend rather than trusting the client.

For webhook requests, the payment provider's signature is validated before processing the event.

This helps prevent unauthorized requests from pretending to be successful payment events.

---

## 11. Screenshots / Demo

### Customer Home Screen

![Customer Home Screen](./images/home-screen.png)

### Station Selection

![Station Selection](./images/stations.png)

### Order Details

![Order Details](./images/order-details.png)

### Admin Dashboard

![Admin Dashboard](./images/admin-dashboard.png)

---

## 12. Live Demo

The project can be accessed here:

[View Live Demo](https://example.com)

---

## 13. What I Learned

Building Servo helped me understand that backend development is not just about creating APIs.

The more important part is making sure that the system behaves correctly when real-world situations occur.

Some of the major things I learned include:

* Designing APIs around business requirements
* Structuring a backend using layers
* Working with database transactions
* Thinking about concurrent requests
* Designing controlled state transitions
* Handling payment webhooks
* Validating data at the API boundary
* Separating business logic from database operations

The concurrency problem was particularly valuable because it forced me to think beyond the normal request-response flow.

---

## 14. What I'd Improve Next

If I continued developing Servo, I would improve several areas.

### Automated Testing

I would add more unit, integration, and end-to-end tests around critical business operations.

Especially:

* Payment processing
* Order state transitions
* Agent assignment
* Authentication

### Real-Time Order Tracking

I would introduce real-time communication so customers can see order updates without repeatedly requesting the API.

For example:

```text
Agent Assigned
      ↓
Agent En Route
      ↓
Agent Arrived
      ↓
Order Completed
```

### Better Observability

I would add structured logging and monitoring to make it easier to diagnose production problems.

### Performance Improvements

As the number of users and orders increases, I would review database indexes and optimize frequently executed queries.

---

## 15. GitHub

The complete source code is available on GitHub:

[View the GitHub Repository](https://github.com/your-username/servo)

---

## Conclusion

Building Servo gave me the opportunity to work on backend problems that go beyond basic CRUD operations.

The most valuable part of the project was learning how to translate real business requirements into reliable backend logic.

In particular, dealing with order states, payment verification, and concurrent agent assignment helped me understand why backend systems need to be designed around consistency, validation, and well-defined business rules.

The project is still a work in progress, but it has provided a strong foundation for exploring more advanced backend engineering concepts.
