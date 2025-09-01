# Expanders360 Platform

## Database Schema:

- base tables:
  - users table: (holds all users data for login logic)
    - id
    - email
    - password
    - role (admin, client)
  - vendors: (holds vendors basic data)
    - id
    - name
    - rate
    - response_sales_hours

- static value holder table: (holds values will be shared accorss all users )
  - services: (hold service names that can be prvided by any vendor)
    - id
    - name
  - countires:
    - id
    - name

- conjunction tables:
  - vendors_services:
    - vendor_id
    - service_id

  - vendors_countires:
    - vendor_id
    - country_id
