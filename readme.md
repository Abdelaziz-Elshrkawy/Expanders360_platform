# Expanders360 Platform

## Database Setup

Schema is provided in [`schema.sql`](./schema.sql).  
To import it, run the shell script [`create_db.sh`](./create_db.sh):

```bash
sudo chmod +x ./create_db.sh
./create_db.sh
```

On Windows, just run the batch file:

```pwsh
./create_db.bat
```

## Installation

Copy and configure the environment file:

```bash
cp .env.example .env
```

Install dependencies:

```bash
pnpm i
```

Install the migration tool globally:

```bash
pnpm i -g db-migrate
```

Run database migrations:

```bash
db-migrate up
```

Start the development server:

```bash
pnpm start:dev
```

## Email Integration

Uses Gmail API for sending emails.  
Requires creating an App Password from your Gmail account.

## Testing the App

Request a CSRF token, then login (for demo purposes, password is plain text, though hashing is also implemented).

**Endpoint:**

```
POST http://localhost:3600/user/login
```

**Test Credentials:**
- Email: `client2@example.com`
- Password: `hashed_pass3`

## API Routes

Get Top Vendors:

```
GET http://localhost:3600/analytics/top-vendors
```

Rebuild Project Matches:

```
POST http://localhost:3600/projects/:id/matches/rebuild
```

Replace `:id` with the project ID.

## Postman Collection

A ready-to-use Postman collection is provided:  
[`expanders360.postman_collection.json`](./expanders360.postman_collection.json)

1. Login using the credentials.  
2. Use the prepared requests to interact with the API.
