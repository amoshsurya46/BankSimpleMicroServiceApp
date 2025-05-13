# Account Service for Banking App

A Flask microservice responsible for managing user bank accounts, including account creation, retrieval, updating, and deletion.

## Features
- CRUD operations for bank accounts
- Account balance management
- RESTful API endpoints
- Input validation and error handling
- CORS enabled

## Endpoints
- `POST /accounts` — Create a new account
- `GET /accounts/<account_id>` — Retrieve account details
- `PUT /accounts/<account_id>` — Update account information
- `DELETE /accounts/<account_id>` — Delete an account

## Environment Variables
- `DATABASE_URL` — PostgreSQL connection string

## Running Locally
1. Install dependencies:
   ```powershell
   pip install -r requirements.txt
   ```
2. Set environment variables (see `.env.example`):
   ```powershell
   $env:DATABASE_URL="postgresql://banking_user:banking_pass@localhost:5432/banking_db"
   ```
3. Start the service:
   ```powershell
   python app.py
   ```

## Docker
Build and run with Docker:
```powershell
# Build image
 docker build -t account-service .
# Run container
 docker run -p 5002:5002 --env DATABASE_URL=postgresql://banking_user:banking_pass@host.docker.internal:5432/banking_db account-service
```

## Database Schema
- **accounts**: id, user_id, account_number, balance, type, created_at

## Security
- Input validation on all endpoints
- JWT authentication (to be integrated)
- CORS enabled

## Example Request
```json
POST /accounts
{
  "user_id": 1,
  "account_number": "1234567890",
  "type": "savings"
}
```

## License
MIT
