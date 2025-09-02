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

- make sure to file the [.env.example](./.env.example) and rename it to .env

- run 
```bash
pnpm i
pnpm i -g db-migrate
db-migrate up
pnpm start:dev
```

## routes:
- http://localhost:3500/analytics/top-vendors
- http://localhost:3500/projects/:id/matches/rebuild
