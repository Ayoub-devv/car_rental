# Car Rental MVP

Simple car rental MVP with:

- `frontend/`: React + Vite client
- `backend/`: Laravel REST API
- `MySQL`: main database target

Customers can browse cars and submit reservations without creating an account. Admins can log in, review reservations, and update their status.

## Folder Structure

```text
.
|-- backend/
|   |-- app/
|   |   |-- Http/
|   |   |-- Models/
|   |-- config/
|   |-- database/
|   |   |-- data/
|   |   |-- migrations/
|   |   |-- seeders/
|   |   `-- schema.sql
|   `-- routes/
|-- frontend/
|   |-- public/
|   |   |-- assets/
|   |   |   |-- cars/
|   |   |   `-- icons/
|   |   `-- data/
|   `-- src/
|       |-- api/
|       |-- components/
|       |-- pages/
|       `-- utils/
`-- README.md
```

## Backend

Main API routes:

- `GET /api/cars`
- `GET /api/cars/{id}`
- `POST /api/reservations`
- `POST /api/admin/login`
- `POST /api/admin/logout`
- `GET /api/admin/reservations`
- `PUT /api/admin/reservations/{id}/status`

Business logic included:

- Form Request validation
- overlapping reservation check
- inclusive day calculation for total price
- default reservation status set to `pending`
- Sanctum token auth for admin endpoints

Seed data:

- `backend/database/data/cars-source.json` is parsed by `CarSeeder`
- admin user is seeded by `AdminUserSeeder`

Default seeded admin credentials:

- email: `admin@carrental.test`
- password: `password`

## Frontend

Main React pages:

- `/`: hero + "Nos voitures" catalog with all provided car images
- `/cars/:carId`: car details + reservation form
- `/admin`: admin login + reservation dashboard

Reusable components:

- `CarList`
- `CarCard`
- `ReservationForm`

The catalog merges:

- live Laravel API data for ids, names, and prices
- local JSON/image assets from the files you provided

## Database Schema

MySQL schema file:

- `backend/database/schema.sql`

Main tables:

- `cars`
- `reservations`
- `users`
- `personal_access_tokens`

## Run Locally

### 1. Create the MySQL database

Create a database named:

```sql
CREATE DATABASE car_rental_mvp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Start the Laravel API

```bash
cd backend
composer install
php artisan migrate --seed
php artisan serve
```

Laravel env defaults are already set for MySQL in:

- `backend/.env`
- `backend/.env.example`

Update the database credentials there if your local MySQL user/password differ.

### 3. Start the React app

```bash
cd frontend
npm install
npm run dev
```

Frontend API base URL lives in:

- `frontend/.env.example`

Default expected backend URL:

- `http://127.0.0.1:8000/api`

## Notes

- All provided car images were copied into `frontend/public/assets/cars/`
- provided icons were copied into `frontend/public/assets/icons/`
- provided JSON/CSV source files were copied into both frontend and backend data folders
- the React production build was verified successfully with `npm run build`
- Laravel routing and PHP syntax were verified locally
