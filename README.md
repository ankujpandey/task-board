# Task Board

A full-stack task management application built as part of the **Digitally Next Full Stack Developer Assignment**. The application allows users to securely manage their personal tasks using **Next.js App Router**, **Prisma ORM**, **PostgreSQL**, and **JWT authentication** with **HTTP-only cookies**.

---

## Features

* User registration
* Secure user login
* JWT authentication using HTTP-only cookies
* Protected dashboard routes
* Create new tasks
* View only the authenticated user's tasks
* Update task status (Todo, In Progress, Done)
* Server-side request validation with Zod
* Password hashing using bcryptjs
* Responsive UI built with Tailwind CSS and shadcn/ui
* Automatic logout when the session expires (401 Unauthorized)

---

## Tech Stack

### Frontend

* Next.js 16 (App Router)
* React 19
* TypeScript
* Tailwind CSS 4
* shadcn/ui
* Radix UI
* Axios

### Backend

* Next.js Route Handlers
* Prisma ORM
* PostgreSQL
* JWT Authentication
* bcryptjs
* Zod

---

## Authentication Flow

1. A new user registers from `/signup`.
2. The request is validated using **Zod**.
3. The password is hashed using **bcryptjs** before storing it in the database.
4. The user logs in using their email and password.
5. Credentials are verified and a JWT containing the user's ID is generated.
6. The JWT is stored in an **HTTP-only cookie**, preventing client-side JavaScript from accessing it.
7. Every protected API request reads the cookie on the server and verifies the JWT.
8. The decoded `userId` is used to ensure users can only access and update their own tasks.
9. Route protection is implemented using `proxy.ts`:

   * Unauthenticated users attempting to access `/dashboard` are redirected to `/login`.
   * Authenticated users attempting to access `/login` or `/signup` are redirected to `/dashboard`.
10. Logging out clears the authentication cookie.

---

## Database Schema

### User

| Field     | Type            |
| --------- | --------------- |
| id        | String (cuid)   |
| name      | String          |
| email     | String (Unique) |
| password  | String (Hashed) |
| createdAt | DateTime        |
| updatedAt | DateTime        |

---

### Task

| Field     | Type                      |
| --------- | ------------------------- |
| id        | String (cuid)             |
| title     | String                    |
| status    | TODO / IN_PROGRESS / DONE |
| userId    | String                    |
| createdAt | DateTime                  |
| updatedAt | DateTime                  |

Relationship:

```text
User (1)
   │
   └──────────< Task (Many)
```

Each task belongs to exactly one user.

Deleting a user automatically deletes all associated tasks.

---

## Project Structure

```text
app/
├── (auth)/
│   ├── login/
│   └── signup/
│
├── api/
│   ├── auth/
│   └── tasks/
│
├── dashboard/
│
components/
├── auth/
├── dashboard/
└── ui/

lib/
├── auth.ts
├── jwt.ts
├── prisma.ts
├── validations.ts

prisma/

services/

types/
```

---

## API Endpoints

| Method | Endpoint           | Description                    |
| ------ | ------------------ | ------------------------------ |
| POST   | `/api/auth/signup` | Register a new user            |
| POST   | `/api/auth/login`  | Authenticate user              |
| POST   | `/api/auth/logout` | Logout user                    |
| POST   | `/api/tasks`       | Create task                    |
| GET    | `/api/tasks`       | Get authenticated user's tasks |
| PATCH  | `/api/tasks/:id`   | Update task status             |

---

## Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
```

---

## Running the Project

### 1. Install dependencies

```bash
npm install
```

### 2. Run database migrations

```bash
npx prisma migrate dev
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open in browser

```text
http://localhost:3000
```

---

## Available Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Security

* Passwords are hashed using **bcryptjs**.
* Authentication uses **JWT** stored in **HTTP-only cookies**.
* Client-side JavaScript cannot access the authentication token.
* All task operations are scoped to the authenticated user.
* Protected routes require a valid authenticated session.

---

## Future Improvements

* Delete tasks
* Task search
* Filtering by status
* Pagination
* Drag-and-drop task board
* User profile page
* Refresh token authentication
* Email verification
* Forgot password flow

---

## Live Demo

The application is currently not deployed.

Run it locally by following the setup instructions above.
