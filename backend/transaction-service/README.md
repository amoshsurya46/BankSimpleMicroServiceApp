# Transaction Service for Banking App
# Flask microservice for fund transfers and transaction history

## Overview
This service handles all transaction-related operations, including:
- Fund transfers between accounts
- Logging and retrieving transaction history

## Endpoints
- `POST /transfer` — Transfer funds between accounts
- `GET /transactions/<account_id>` — Get transaction history for an account

## Environment Variables
- `DATABASE_URL` — PostgreSQL connection string

## Running Locally
1. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
2. Set environment variables (see `.env.example`):
   ```sh
   $env:DATABASE_URL="postgresql://banking_user:banking_pass@localhost:5432/banking_db"
   ```
3. Start the service:
   ```sh
   python app.py
   ```

## Docker
Build and run with Docker:
```sh
# Build image
 docker build -t transaction-service .
# Run container
 docker run -p 5003:5003 --env DATABASE_URL=postgresql://banking_user:banking_pass@host.docker.internal:5432/banking_db transaction-service
```

## Database Schema
- **transactions**: id, from_account_id, to_account_id, amount, timestamp, description

## Security
- Input validation on all endpoints
- JWT authentication (to be integrated)
- CORS enabled

## Example Request
```json
POST /transfer
{
  "from_account_id": 1,
  "to_account_id": 2,
  "amount": 100.0,
  "description": "Payment for invoice #123"
}
```

## License
MIT
