# Web Sewa Kos - Dokumentasi API

## User API

**Base URL:** `/users`

| Method | Endpoint     | Auth     | Deskripsi                        | Request Body / Params                        |
|--------|--------------|----------|----------------------------------|----------------------------------------------|
| GET    | `/users`     | Required | Ambil semua user                 | -                                            |
| GET    | `/:id`       | Required | Ambil user berdasarkan ID        | URL param: id (User ID)                      |
| POST   | `/register`  | Tidak    | Registrasi user baru             | Body: `{ username, password, role }`         |
| POST   | `/login`     | Tidak    | Login user                       | Body: `{ username, password }`               |
| POST   | `/logout`    | Required | Logout user                      | -                                            |

---

## Kamar API

**Base URL:** `/kamar`

| Method | Endpoint             | Auth     | Role   | Deskripsi                              | Request Body / Params                                 |
|--------|----------------------|----------|--------|----------------------------------------|-------------------------------------------------------|
| GET    | `/kamar`             | Tidak    | Semua  | Ambil semua kamar                      | -                                                     |
| GET    | `/kamar/:id`         | Tidak    | Semua  | Ambil kamar berdasarkan ID             | URL param: id (Kamar ID)                              |
| POST   | `/add-kamar`         | Required | Admin  | Tambah kamar baru                      | Form-data: file gambar, data lain                     |
| PUT    | `/update-kamar/:id`  | Required | Admin  | Update kamar berdasarkan ID            | URL param: id, form-data: file gambar opsional, data lain |
| DELETE | `/delete-kamar/:id`  | Required | Admin  | Hapus kamar berdasarkan ID             | URL param: id                                         |

---

## Bayar API

**Base URL:** `/bayar`

| Method | Endpoint                | Auth     | Role   | Deskripsi                              | Request Body / Params                                 |
|--------|-------------------------|----------|--------|----------------------------------------|-------------------------------------------------------|
| GET    | `/bayar`                | Tidak    | Semua  | Ambil semua pembayaran                 | -                                                     |
| GET    | `/bayar/:id`            | Tidak    | Semua  | Ambil pembayaran berdasarkan ID        | URL param: id (Bayar ID)                              |
| POST   | `/add-bayar`            | Tidak    | Semua  | Tambah pembayaran baru                 | Form-data: file gambar2, data lain                    |
| PUT    | `/update-bayar/:id`     | Tidak    | Semua  | Update pembayaran berdasarkan ID       | URL param: id, form-data: file gambar2 opsional, data lain |
| DELETE | `/delete-bayar/:id`     | Tidak    | Semua  | Hapus pembayaran berdasarkan ID        | URL param: id                                         |

---

## Catatan Umum

- **Autentikasi:**  
  - Semua endpoint kecuali `/register` dan `/login` membutuhkan autentikasi JWT (token di header Authorization).
  - Endpoint POST, PUT, DELETE pada `/kamar` hanya bisa diakses oleh admin.
- **Upload Gambar:**  
  - Untuk kamar: gunakan key form-data `gambar`.
  - Untuk pembayaran: gunakan key form-data `gambar2`.
- **Response:**  
  - Semua endpoint mengembalikan data dalam format JSON.

---

**Contoh Header Auth:**
```
Authorization: Bearer <token>
```

---
