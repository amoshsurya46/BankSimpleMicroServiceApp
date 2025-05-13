# Shared Backend Code for Banking App Microservices

This folder contains shared modules (models, utilities, etc.) used by all backend microservices (auth, account, transaction).

## Purpose
- Promote code reuse and consistency across services
- Centralize database models and common logic

## Contents
- `models.py` — SQLAlchemy models for Users, Accounts, and Transactions
- (Add more shared utilities as needed)

## Usage Example
To use shared models in a Flask service:
```python
from backend.shared.models import db, User, Account, Transaction
```

## Adding New Shared Code
- Place new modules or utilities in this folder
- Update imports in each microservice as needed

## Best Practices
- Keep shared code generic and stateless
- Document any utility functions or helpers

## License
MIT
