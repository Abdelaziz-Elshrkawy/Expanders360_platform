# Expanders360 Platform

## Database Schema:

- Provided in the [schema.sql](./schema.sql) file
- to import it run [create_db.sh](./create_db.sh) make sure to enable execution to this file by:

```bash
    sudo chmod +x ./create_db.sh
```

- then run it and make sure to be in the same directory as the file:

```bash
    ./create_db.sh
```

- on windows just run [create_db.bat](./create_db.bat):

```pwsh
    ./create_db.bat
```

## installation:

- make sure to fill the [.env.example](./.env.example) and rename it to .env

- run

```bash
pnpm i
pnpm i -g db-migrate
db-migrate up
pnpm start:dev
```

## routes:

- Get/ http://localhost:3500/analytics/top-vendors
- Post/ http://localhost:3500/projects/:id/matches/rebuild (replace :id with the project_id)

### about the email part i used the gmail API

- to create an app level password for my gmail.
