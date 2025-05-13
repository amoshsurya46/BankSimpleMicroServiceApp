# React frontend for Banking App

A modern, responsive React application for users to manage their bank accounts, view transactions, and transfer funds securely.

## Features
- JWT authentication (login/signup)
- Dashboard with account summary and analytics
- Transaction history with sorting and filtering
- Fund transfer form with validation
- Responsive Material UI design
- Snackbar notifications for user feedback
- React Router navigation

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation
1. Install dependencies:
   ```powershell
   npm install
   ```
2. Start the development server:
   ```powershell
   npm start
   ```
   The app will run at http://localhost:3000

### Environment Variables
- `REACT_APP_API_URL` — Base URL for backend API (set in Docker or `.env`)

## Project Structure
- `src/pages/` — Main pages (Login, Signup, Dashboard, Transactions, Transfer)
- `src/components/` — Shared UI components (Navbar, SnackbarProvider)
- `src/App.js` — Main app with routing and theming

## Docker
To build and run the frontend with Docker:
```powershell
# Build image
 docker build -t banking-frontend .
# Run container
 docker run -p 3000:3000 --env REACT_APP_API_URL=http://localhost banking-frontend
```

## API Endpoints Used
- `/login` — Authenticate user
- `/signup` — Register new user
- `/accounts` — Get user accounts
- `/transactions/:account_id` — Get transaction history
- `/transfer` — Transfer funds

## Security
- JWT stored in localStorage
- All API requests include Authorization header
- Input validation on all forms

## Example Usage
### Login
```json
POST /login
{
  "username": "johndoe",
  "password": "yourpassword"
}
```
### Signup
```json
POST /signup
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```
### Fund Transfer
```json
POST /transfer
{
  "from_account_id": 1,
  "to_account_id": 2,
  "amount": 100.0,
  "description": "Payment for invoice #123"
}
```

## Contribution
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
MIT
