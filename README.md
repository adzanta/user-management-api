# 👤 User Management API

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![Express.js](https://img.shields.io/badge/Express.js-4.x-lightgrey)
![Prisma](https://img.shields.io/badge/Prisma-ORM-blueviolet)
![MySQL](https://img.shields.io/badge/MySQL-8.x-blue)
![Zod](https://img.shields.io/badge/Zod-Validation-orange)
![Docker](https://img.shields.io/badge/Docker-ready-blue)

API sederhana untuk **manajemen pengguna** dengan fitur Create, Read, Update, Delete (CRUD).  
Dilengkapi dengan **validasi input** menggunakan Zod dan **ORM Prisma** untuk akses database MySQL.

---

## 🚀 Fitur Utama
- **CRUD User**: Create, Read, Update, Delete.
- **Validasi Input**:  
  - Email harus format valid.
  - Nomor HP hanya angka, minimal 10 digit.
  - Department dan nama wajib diisi.
- **Error Handling**: Pesan error informatif.
- **Database**: MySQL (Docker).
- **ORM**: Prisma.
- **Documentation**:

---

## 📡 API Endpoint

| Method | Endpoint         | Deskripsi                      |
|--------|------------------|---------------------------------|
| POST   | `/users`         | Membuat user baru               |
| GET    | `/users`         | Mengambil semua user            |
| PUT    | `/users/:id`     | Update data user berdasarkan ID |
| DELETE | `/users/:id`     | Hapus user berdasarkan ID       |

---

## 🏗️ Struktur Project
```
user-management-api/
│
├── prisma/
│ ├── schema.prisma # Schema Prisma
│
├── src/
│ ├── controllers/ # Controller logic CRUD
│ ├── Routes/ # Controller logic CRUD
│ ├── validators/ # Validasi Zod
│ ├── prismaClient.ts # Prisma Client instance
│ ├── server.ts # Entry point
│
├── .env # Environment variables
├── docker-compose.yml # Setup MySQL
├── package.json
└── README.md
```

---

## ⚙️ Cara Menjalankan

### 1. Clone Repository
```
git clone https://github.com/adzanta/user-management-api.git
cd user-management-api
```
### 2. Setup Environment
Buat file .env:
```
DATABASE_URL="mysql://root:password@localhost:3308/user_management"
PORT=3000
```
### 3. Jalankan MySQL via Docker
```
docker-compose up -d
```
### 4. Install Dependencies
```
npm install
```
### 5. Migrate Database
```
npx prisma migrate dev --name create_user_table
npx prisma generate
```
6. Jalankan Development Server
```
npm run dev
Server akan berjalan di http://localhost:3000
```

---
### 🧪 Testing API
- Request Body POST /users
```
{
  "nama": "Alhafidz",
  "email": "william@example.com",
  "no_hp": "085794622066",
  "statusAktif": true,
  "department": "IT"
}
```
Response
```
{
    "message": "User created successfully",
    "data": {
        "id": 3,
        "nama": "Alhafidz",
        "email": "william@example.com",
        "no_hp": "085794622066",
        "statusAktif": true,
        "department": "IT",
        "createdAt": "2025-08-11T16:20:39.436Z",
        "updatedAt": "2025-08-11T16:20:39.436Z"
    }
}
```
- Request body PUT /users/:id
```
{
  "nama": "Alhafidz update",
  "email": "williamupdate@example.com",
  "no_hp": "081298765123",
  "statusAktif": false,
  "department": "HR"
}
```
Response
```
{
    "message": "User updated successfully",
    "data": {
        "id": 3,
        "nama": "Alhafidz update",
        "email": "williamupdate@example.com",
        "no_hp": "081298765123",
        "statusAktif": false,
        "department": "HR",
        "createdAt": "2025-08-11T16:20:39.436Z",
        "updatedAt": "2025-08-11T16:35:21.801Z"
    }
}
```
- GET /users
```
{
    "data": [
        {
            "id": 2,
            "nama": "Budi Update",
            "email": "budiupdate@example.com",
            "no_hp": "081298765432",
            "statusAktif": false,
            "department": "HR",
            "createdAt": "2025-08-10T19:52:47.392Z",
            "updatedAt": "2025-08-10T19:53:15.645Z"
        },
        {
            "id": 3,
            "nama": "Alhafidz update",
            "email": "williamupdate@example.com",
            "no_hp": "081298765123",
            "statusAktif": false,
            "department": "HR",
            "createdAt": "2025-08-11T16:20:39.436Z",
            "updatedAt": "2025-08-11T16:35:21.801Z"
        }
    ]
}
```
- DELETE /users/:id
```
{
    "message": "User deleted successfully"
}
```
### 🧪 Testing API Eror
- Request Body POST /users atau PUT /users/:id
```
{
  "nama": "",
  "email": "email-gak-valid",
  "no_hp": "123",
  "statusAktif": true,
  "department": ""
}
```
Response
```
{
    "errors": [
        "Nama wajib diisi",
        "Format email tidak valid",
        "Nomor HP minimal 10 digit",
        "Department wajib diisi"
    ]
}
```