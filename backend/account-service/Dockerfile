# Dockerfile for Account Service
FROM python:3.10-slim-bookworm
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*
COPY wait-for-postgres.sh ./
RUN chmod +x wait-for-postgres.sh
COPY . .
EXPOSE 5002
CMD ["./wait-for-postgres.sh", "postgres", "python", "app.py"]
