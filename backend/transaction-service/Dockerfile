# Dockerfile for Transaction Service
FROM python:3.10-slim
WORKDIR /app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*
COPY wait-for-postgres.sh ./
RUN chmod +x wait-for-postgres.sh
COPY . .
EXPOSE 5003
CMD ["./wait-for-postgres.sh", "postgres", "python", "app.py"]
