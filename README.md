# Express App

A TypeScript-based Express.js application with authentication, authorization, and rate limiting middleware.

## Features

-   ✅ TypeScript support
-   🔒 Role-based authentication & authorization
-   ⚡ Rate limiting (10 requests per minute per user)
-   🏗️ Clean architecture with controllers, services, and middlewares
-   🔍 Health check endpoint

## Project Structure

```
express-app/
├── app.ts                      # Main application entry point
├── src/
│   ├── controllers/
│   │   └── route.controller.ts # Route definitions
│   ├── middlewares/
│   │   ├── auth.ts             # Authentication & authorization
│   │   └── rate-limiter.ts     # Rate limiting middleware
│   └── services/
│       └── app.service.ts      # Business logic layer
```

## Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn

## Installation

```bash
npm install
```

## Running the App

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Public Endpoints

-   **GET /** - Welcome message
-   **GET /health** - Health check endpoint
-   **GET /publicPublic** - Public test route

### Protected Endpoints (require authentication)

All protected endpoints require the `x-user-role` header with value `user` or `admin`.

#### User Routes (accessible by user and admin)

-   **GET /user/dataAccessible** - Returns user data
    -   Headers: `x-user-role: user` or `x-user-role: admin`

#### Admin Routes (accessible by admin only)

-   **GET /admin/dataRestricted** - Returns admin data
    -   Headers: `x-user-role: admin`

## Middleware

### Rate Limiter

-   **In Memory** Opted for in memory storage as compared to the redis option for a faster and minimal implementation. In a real world application I would use redis for persistence
-   **Limit:** 10 requests per minute per user
-   **Identification:** Uses `x-user-id` header or IP address
-   **Response:** 429 Too Many Requests when limit exceeded

### Authentication

-   Uses `x-user-role` header for role identification
-   Supported roles: `user`, `admin`
-   Returns 401 for missing or invalid roles

### Authorization

-   Role-based access control
-   Returns 403 for insufficient permissions

## Example Requests

### Public endpoint

```bash
curl http://localhost:3000/health
```

### User endpoint

```bash
curl -H "x-user-role: user" -H "x-user-id: user123" http://localhost:3000/user/dataAccessible
```

### Admin endpoint

```bash
curl -H "x-user-role: admin" -H "x-user-id: admin456" http://localhost:3000/admin/dataRestricted
```

## Technologies Used

-   **Express.js 5.x** - Web framework
-   **TypeScript** - Type safety
-   **ts-node** - TypeScript execution
-   **nodemon** - Development auto-reload

## Future Enhancements

-   It's always ideal to factor in testing so that the application can continue to scale and maintain reliability. Consider adding unit tests for services, integration tests for routes, and middleware tests
-   Replace in-memory rate limiter with Redis for distributed systems and persistence
-   Implement proper authentication with JWT tokens instead of header-based role passing, this is because the headers maybe modified
-   Add database integration (PostgreSQL, MongoDB, etc.) for real data persistence
-   Add logging middleware (Winston, Pino) for better observability
-   Implement proper environment configuration (.env files)
-   Add API documentation with Swagger/OpenAPI
-   Set up CI/CD pipeline
-   Add input validation with libraries like Zod
