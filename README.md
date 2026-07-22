# Employee Task Management System

A production-ready RESTful backend API built with **Node.js**, **Express.js**, **TypeScript**, and **MongoDB** for managing employees and tasks.

The system allows managers to create and assign tasks to employees, while employees can update the status of tasks assigned to them. It also supports searching, filtering, pagination, and centralized error handling following clean backend architecture principles.

---

# 🌐 Live API

## Base URL

```text
https://employee-task-management-system-9ldf.onrender.com/api/v1
```

## Health Check

```text
https://employee-task-management-system-9ldf.onrender.com/health
```

> **Note:** The Health endpoint is available outside the `/api/v1` route.

---

## API Endpoints

### Users

| Method | Endpoint     | Description                  |
| ------ | ------------ | ---------------------------- |
| POST   | `/users`     | Create a Manager or Employee |
| GET    | `/users`     | Get all users                |
| GET    | `/users/:id` | Get a user by ID             |
| PATCH  | `/users/:id` | Update a user                |
| DELETE | `/users/:id` | Delete a user                |

---

### Tasks

| Method | Endpoint            | Description                                 |
| ------ | ------------------- | ------------------------------------------- |
| POST   | `/tasks`            | Create a task                               |
| GET    | `/tasks`            | Get all tasks                               |
| GET    | `/tasks/:id`        | Get a task by ID                            |
| PATCH  | `/tasks/:id`        | Update task details (Manager only)          |
| DELETE | `/tasks/:id`        | Delete a task                               |
| PATCH  | `/tasks/:id/status` | Update task status (Assigned Employee only) |

---

### Example

```http
GET /tasks?search=backend&status=todo&priority=high&page=1&limit=10
```

---

### Example Requests

#### Create User

```http
POST /users
```

#### Create Task

```http
POST /tasks
```

#### Update Task

```http
PATCH /tasks/:id
```

#### Update Task Status

```http
PATCH /tasks/:id/status
```

---

> **Note**
>
> This API is deployed on **Render's Free Tier**. The first request after a period of inactivity may take **30–60 seconds** while the server wakes up.

# Features

## User Management

- Create Managers
- Create Employees
- Role-based user management

---

## Task Management

- Create Tasks
- Update Tasks
- Delete Tasks
- Get Task by ID
- Get All Tasks

---

## Business Rules

- Only Managers can create tasks
- Only Managers can update task details
- Only Managers can delete tasks
- Tasks can only be assigned to Employees
- Employees can update only the status of their assigned tasks

---

## Search & Filtering

Filter tasks by:

- Status
- Priority
- Assigned Employee
- Created By

Search tasks by:

- Title
- Description

---

## Backend Architecture

- Feature-based Folder Structure
- Controller → Service → Model Architecture
- Global Error Handling
- Custom AppError Class
- Environment Variable Management

---

## Developer Experience

- TypeScript
- ESLint
- Prettier
- Husky
- lint-staged
- pnpm
- Express 5

---

# Tech Stack

| Category        | Technology          |
| --------------- | ------------------- |
| Runtime         | Node.js             |
| Framework       | Express.js          |
| Language        | TypeScript          |
| Database        | MongoDB Atlas       |
| ODM             | Mongoose            |
| Package Manager | pnpm                |
| Linting         | ESLint              |
| Formatting      | Prettier            |
| Git Hooks       | Husky + lint-staged |

---

# Request Flow

The following diagram illustrates how every request travels through the application.

```text
                           CLIENT
                    (Browser / Postman)
                              │
                       HTTP Request
                              │
                    Express Server
                     (server.ts)
                              │
                    Express App
                      (app.ts)
                              │
                   Global Middleware
         (JSON Parser, Error Handling, etc.)
                              │
                       Root Router
                        (/api/v1)
                              │
              ┌───────────────┴───────────────┐
              │                               │
          /users                         /tasks
              │                               │
         Route File                     Route File
              │                               │
         Controller                    Controller
              │                               │
            Service                       Service
              │                               │
              └──────────────┬────────────────┘
                             │
                     Mongoose Models
                             │
                        MongoDB Atlas
                             │
                             │
                        JSON Response
                             │
                           CLIENT
```

This architecture separates routing, business logic, and database operations, making the application easy to maintain and extend.

---

# Request Processing Steps

1. Client sends an HTTP request.
2. Express receives the request.
3. Global middleware executes.
4. Request reaches the root router.
5. Feature router handles the request.
6. Controller extracts request data.
7. Service executes business logic.
8. Business rules are validated.
9. Mongoose performs database operations.
10. MongoDB returns the result.
11. Service prepares the response.
12. Controller returns an HTTP response.
13. Client receives JSON data.

---

# Project Structure

```text
src
│
├── config/
│   └── db.ts
│
├── errors/
│   └── AppError.ts
│
├── middlewares/
│   ├── errorHandler.ts
│   └── notFound.ts
│
├── models/
│   ├── user.model.ts
│   └── task.model.ts
│
├── modules/
│   ├── users/
│   │   ├── user.routes.ts
│   │   ├── user.controller.ts
│   │   └── user.service.ts
│   │
│   └── tasks/
│       ├── task.routes.ts
│       ├── task.controller.ts
│       └── task.service.ts
│
├── routes/
│   └── root.routes.ts
│
├── app.ts
└── server.ts
```

---

## Folder Responsibilities

| Folder      | Responsibility            |
| ----------- | ------------------------- |
| config      | Database configuration    |
| errors      | Custom application errors |
| middlewares | Global middleware         |
| models      | Database schemas          |
| modules     | Feature modules           |
| routes      | Root routing              |
| app.ts      | Express configuration     |
| server.ts   | Application entry point   |

---

# Installation

## Prerequisites

- Node.js (v20+)
- pnpm
- MongoDB Atlas (or Local MongoDB)
- Git

---

## Clone Repository

```bash

git clone https://github.com/ARYAN0-work/employee-task-management-system.git

cd employee-task-management-system

```

---

## Install Dependencies

```bash
pnpm install
```

---

## Configure Environment Variables

Create a `.env` file.

```env
MONGO_URI=
PORT=
```

---

## Run Development Server

```bash
pnpm dev
```

---

## Production Build

```bash
pnpm build
pnpm start
```

---

## Available Scripts

| Command       | Description              |
| ------------- | ------------------------ |
| pnpm dev      | Start development server |
| pnpm build    | Build project            |
| pnpm start    | Run production build     |
| pnpm lint     | Run ESLint               |
| pnpm lint:fix | Fix lint issues          |
| pnpm format   | Format code              |

---

Example:

```http
GET /api/v1/tasks?status=completed&priority=high&page=1&limit=10
```

---

# HTTP Status Codes

| Status | Meaning               |
| ------ | --------------------- |
| 200    | Success               |
| 201    | Resource Created      |
| 400    | Bad Request           |
| 403    | Forbidden             |
| 404    | Not Found             |
| 500    | Internal Server Error |

---

# Business Rules

### Managers

- Create tasks
- Update task details
- Delete tasks
- Assign employees

### Employees

- View assigned tasks
- Update only task status

### Assignment Validation

A task can only be assigned to users with the **Employee** role.

---

# Error Handling

The project uses a centralized error handling middleware together with a custom **AppError** class.

Benefits:

- Consistent API responses
- Proper HTTP status codes
- Easier debugging
- Cleaner service layer

---

# Architecture Decisions

## Feature-Based Architecture

Each feature owns its own:

- Routes
- Controller
- Service

This keeps modules independent and scalable.

---

## Controller → Service → Model Pattern

### Controller

- Handles HTTP requests
- Returns responses

### Service

- Contains business logic
- Performs validation

### Model

- Handles MongoDB operations

---

## Code Quality

The project uses:

- ESLint
- Prettier
- Husky
- lint-staged

to maintain a clean and consistent codebase.

# Author

**Aryan Mishra**

Computer Science Student | Backend Developer

- GitHub: https://github.com/ARYAN0-work
- LinkedIn: https://www.linkedin.com/in/aryan-mishra-501428367

---

# Acknowledgements

Special thanks to the open-source community and the creators of:

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- ESLint
- Prettier
- Husky
- pnpm
