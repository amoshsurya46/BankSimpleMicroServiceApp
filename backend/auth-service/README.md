# Auth Service for Banking App

A Flask microservice responsible for user authentication, registration, and JWT token management.

## Features
- User registration (signup)
- User login (JWT token generation)
- Token validation endpoint
- Secure password storage with bcrypt
- Input validation and error handling
- CORS enabled

## Endpoints
- `POST /signup` — Register a new user
- `POST /login` — Authenticate user and return JWT
- `POST /validate` — Validate JWT token

## Environment Variables
- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — Secret key for JWT token signing

## Running Locally
1. Install dependencies:
   ```powershell
   pip install -r requirements.txt
   ```
2. Set environment variables (see `.env.example`):
   ```powershell
   $env:DATABASE_URL="postgresql://banking_user:banking_pass@localhost:5432/banking_db"
   $env:JWT_SECRET="your_jwt_secret"
   ```
3. Start the service:
   ```powershell
   python app.py
   ```

## Docker
Build and run with Docker:
```powershell
# Build image
 docker build -t auth-service .
# Run container
 docker run -p 5001:5001 --env DATABASE_URL=postgresql://banking_user:banking_pass@host.docker.internal:5432/banking_db --env JWT_SECRET=your_jwt_secret auth-service
```

## Database Schema
- **users**: id, username, email, password_hash, created_at

## Security
- Passwords hashed with bcrypt
- JWT authentication for API access
- Input validation on all endpoints
- CORS enabled

## Example Request
```json
POST /signup
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

## License
MIT
