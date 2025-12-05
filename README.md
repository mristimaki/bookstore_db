# Bookstore - Inventory Management System

An **Inventory Management System** for an Islamic bookstore built with Node.js, Express, and PostgreSQL. The system provides full CRUD operations for managing products (books) and their suppliers with database relationships.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage Examples](#usage-examples)
- [Author](#author)

---

## ✨ Features

- Complete product management
- Supplier management with relationships
- Database relations using foreign keys
- Input validation
- Error handling

---

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **PostgreSQL** - Relational database
- **Docker** - Database containerization
- **Bruno** - API testing

---

## 🗄️ Database Schema

### Suppliers Table
```sql
CREATE TABLE IF NOT EXISTS suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    country VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    price NUMERIC(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    supplier_id INT NOT NULL REFERENCES suppliers(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Database Relationships
```
suppliers (1) ----< (many) products
     |                      |
     id  <---foreign key--- supplier_id
```

---

## 🔌 API Endpoints

### Suppliers

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/suppliers` | Get all suppliers |
| GET | `/api/suppliers/:id` | Get single supplier (includes product count) |
| GET | `/api/suppliers/:id/products` | Get all products from a supplier |
| POST | `/api/suppliers` | Create new supplier |
| PUT | `/api/suppliers/:id` | Update supplier |
| DELETE | `/api/suppliers/:id` | Delete supplier |

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products (includes supplier info) |
| GET | `/api/products/:id` | Get single product (includes supplier info) |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### Response Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Server Error

---

## 📁 Project Structure
```
bookstore_db/
├── src/
│   ├── config/
│   │   ├── database.mjs          # Database connection & setup
│   │   └── variables.mjs         # Environment variables
│   ├── repositories/
│   │   ├── suppliers.mjs         # Supplier database operations
│   │   └── products.mjs          # Product database operations
│   ├── routes/
│   │   ├── suppliers.mjs         # Supplier API endpoints
│   │   └── products.mjs          # Product API endpoints
│   ├── utilities/
│   │   └── validation.mjs        # Input validation
│   └── main.mjs                  # Server entry point
├── .env                          # Environment variables (not in git)
├── .gitignore
├── package.json
├── queries.sql                   # Reference SQL file (This file is for development/testing only)
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js
- Docker
- PostgreSQL

### Setup Steps

**1. Clone the repository**
```bash
git clone [repository-url]
cd bookstore_db
```

**2. Install dependencies**
```bash
npm install express pg dotenv
```

**3. Configure Environment Variables**

Create a `.env` file in the root directory:
```env
# SERVER
SERVER_HOST=localhost
SERVER_PORT=3000

# DATABASE
DB_USER=postgres
DB_PASSWORD=your_password
DB_PORT=5432
DB_NAME=bookstore_db
```

**4. Start PostgreSQL with Docker**
```bash
docker start your-postgres-container
docker exec -it your-postgres-container bash
psql -U postgres
```

**5. Create Database Tables**

Run the SQL commands from the [Database Schema](#database-schema) section.

**6. Start the Server**
```bash
node src/main.mjs
```

The server will start on `http://localhost:3000`

---

## 📖 Usage Examples

### Create a Supplier
```bash
POST http://localhost:3000/api/suppliers
Content-Type: application/json

{
    "name": "Ilm Publishers",
    "contact_person": "Maryam Ristimaki",
    "email": "contact@ilmpublishers.com",
    "phone": "+123-45-6789",
    "country": "Sweden"
}
```

### Create a Product
```bash
POST http://localhost:3000/api/products
Content-Type: application/json

{
    "title": "Builders of a Nation",
    "author": "Dr Haifaa Younis",
    "quantity": 15,
    "price": 149.00,
    "category": "Personal Development",
    "supplier_id": 1
}
```

### Get All Products (with Supplier Info)
```bash
GET http://localhost:3000/api/products
```

**Response:**
```json
[
    {
        "id": 1,
        "title": "Builders of a Nation",
        "author": "Dr Haifaa Younis",
        "quantity": 15,
        "price": "149.00",
        "category": "Personal Development",
        "supplier_id": 1,
        "supplier_name": "Ilm Publishers",
        "supplier_country": "Sweden"
    }
]
```

### Get Supplier with Product Count
```bash
GET http://localhost:3000/api/suppliers/1
```

**Response:**
```json
{
    "id": 1,
    "name": "Ilm Publishers",
    "contact_person": "Maryam Ristimaki",
    "email": "contact@ilmpublishers.com",
    "phone": "+123-45-6789",
    "country": "Sweden",
    "product_count": "15"
}
```

---

## 👤 Author

**Maryam Rutqvist Ristimäki**

- GitHub: [@mristimaki](https://github.com/mristimaki)
- LinkedIn: [Maryam Rutqvist Ristimäki](https://www.linkedin.com/in/maryam-rutqvist-ristim%C3%A4ki-08b41438b)

**Course:** Backend Development 1  
**Program:** EC Utbildning / Frontend Developer  
**Date:** November 2025

---

## 📄 License

This is a school project - not licensed for commercial use.

---