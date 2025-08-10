# Authentication API Documentation

## 1. Login
### POST /api/auth/login

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1...",
    "refreshToken": "eyJhbGciOiJIUzI1...",
    "user": {
      "id": "uuid-123",
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
}
```

## 2. Register
### POST /api/auth/register

**Request:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "securePassword123",
  "confirmPassword": "securePassword123"
}
```

**Response Success (201):**
```json
{
  "success": true,
  "data": {
    "id": "uuid-123",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2025-08-10T10:30:00Z"
  }
}
```

## 3. Refresh Token
### POST /api/auth/refresh-token

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1..."
}
```

**Response Success (200):**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1...",
    "refreshToken": "eyJhbGciOiJIUzI1..."
  }
}
```

## 4. Logout
### POST /api/auth/logout

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1..."
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Successfully logged out"
}
```

## Error Response Format
All endpoints may return the following error format:

```json
{
  "success": false,
  "error": {
    "code": "AUTH_ERROR",
    "message": "Invalid credentials",
    "details": {
      "field": ["error message"]
    }
  }
}
```

### Common Error Status Codes:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 422: Validation Error
- 500: Server Error


### Assessment
    GET /api/assessments - Get list of assessments
    GET /api/assessments/:id - Get specific assessment
    POST /api/assessments/submit - Submit completed assessment
    GET /api/assessments/results/:id - Get assessment results

### Exercise
    GET /api/exercises - Get list of exercises
    GET /api/exercises/:id - Get specific exercise details
    POST /api/exercises/:id/submit - Submit exercise solution
    GET /api/exercises/progress - Get user's exercise progress

### User
    GET /api/user/profile
    PUT /api/user/profile
    GET /api/user/progress - Get overall learning progress
    GET /api/user/statistics - Get user statistics

### Progress
    GET /api/progress/overview
    GET /api/progress/assessments
    GET /api/progress/exercises
    POST /api/progress/track - Track user progress