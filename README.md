# Islamic Bookstore - Inventory Management System

**Student:** Maryam Rutqvist Ristimäki

**Program:** EC Utbildning / Frontend Developer

**Course:** Backend Development 1

**Date:** November 2025

---

## Introduction - What I Built

An **Inventory Management System** for an Islamic bookstore. The system handles products (books) and their suppliers, allowing full CRUD operations on both resources.

**Key Features:**
- 
- 
- 

---

## Planning - How I Planned the Project

### **Initial Approach**
1. 
2.
3.
4.

### **Technology Choices**
- **Node.js + Express:** For the REST API
- **PostgreSQL:** Renational database for structured data
- **Docker:** For consistent database environment
- **Bruno:** For API testing

### **Development Order Planned**
1. Setup database and Docker
2. Build suppliers module first (simpler, no dependencies)
3. Build products module (more complex, depends on suppliers)
4. Test all endpoints
5. Refine and document

---

## 🛠️ Implementation - How I Built It

### **Project Structure**
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
├── queries.sql                   # For table schemas and test data (only for development/testing)
└── README.md
```

### **Development Process**

**Phase 1: Database Setup**

**Phase 2: Suppliers Module**

**Phase 3: Products Module**

**Phase 4: VG Requirements**

### **Did It Go As Planned?**

**What went smoothly:**
-
-
-

**Changes Made During Development:**
-
-
-

**Challenges Encountered:**
-
-
-

---

## Result - The Final Product

### **Database Schema**

**Suppliers Table:**
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

**Products Table:**
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

### **API Endpoints**

#### **Suppliers Endpoints**
| Method | Endpoint | Description | Features |
|--------|----------|-------------|----------|
| GET | `/api/suppliers` | Get all suppliers | Basic list |
| GET | `/api/suppliers/:id` | Get single supplier | **Includes product_count** (VG) |
| GET | `/api/suppliers/:id/products` | Get supplier's products | **All products from supplier** (VG) |
| POST | `/api/suppliers` | Create new supplier | Validation |
| PUT | `/api/suppliers/:id` | Update supplier | Validation |
| DELETE | `/api/suppliers/:id` | Delete supplier | Returns deleted supplier |

#### **Products Endpoints**
| Method | Endpoint | Description | Features |
|--------|----------|-------------|----------|
| GET | `/api/products` | Get all products | Includes supplier info via JOIN |
| GET | `/api/products/:id` | Get single product | Includes supplier info via JOIN |
| POST | `/api/products` | Create new product | Validation + foreign key check |
| PUT | `/api/products/:id` | Update product | Validation + foreign key check |
| DELETE | `/api/products/:id` | Delete product | Returns deleted product |

#### **Key Technical Features**

**1. JOIN Queries (VG Requirement)**

**2. Product Count (VG Requirement)**

**3. Validation**
- 
-
-

**4. Error Handling**
-
-
-

---

## 💡 Lessons Learned & Challenges

### **What Was Difficult?**

**1.**

**2.**

**3.**

### **What Was Easy?**

**1.**

**2.**

**3.**

### **What I Learned**

**Technical Skills:**
-
-
-

**Work Methods:**
-
-
-

**Problem-Solving:**
-
-
-

### **If I Did This Again...**

**What I Would Do Differently:**
- Understanding the flow of the project structure
- Write more code and test-projects beforehand (not reading documents as much)
- Plan the database schema on paper first before coding
- Write more detailed comments while coding

**What I Would Keep:**
- The repository pattern - very clean and organized
- Building one module completely before starting the next
- Regular commits with clear messages
- Incremental testing after each feature

---

## 🚀 How to Run This Project

### **Prereqisites**
- Node.js installed
- Docker installed
- PostgreSQL running (via Docker)

### **Setup Steps**

1. **Clone the repository**
```bash
git clone [repository-url]
cd islamisk-bokhandel
```

2. **Install dependencies**
```bash
npm install express pg dotenv
```

3. **Create .env file**
```env
# SERVER
SERVER_HOST="localhost"
SERVER_PORT="3000"

# DATABASE
DB_USER="postgres"
DB_PASSWORD="your_password"
DB_PORT="5432"
DB_NAME="your_db_name"
```

4. **Start PostgreSQL with Docker**
```bash
docker start your-postgres
docker exec -it your-postgres bash
psql -U postgres
```

5. **Start the server**
```bash
node src/main.mjs
```
### **Testing the API**

Use Bruno or any REST client to test endpoints:

**Base URL:** `http://localhost:3000/api`

---

## Example Data

### **Create a Supplier**
```json
POST /api/suppliers
{
    "name": "Ilm Publishers",
    "contact_person": "Maryam Ristimaki",
    "email": "contact@ilmpublishers.com",
    "phone": "+123-45-6789",
    "country": "Sweden"
}
```

### **Create a Product**
```json
POST /api/products
{
    "title": "Builders of a Nation",
    "author": "Dr Haifaa Younis",
    "quantity": 15,
    "price": 149.00,
    "category": "Personal Development",
    "supplier_id": 1
}
```
---

## 🎓 Reflection
This project taught me that **reading tutorials isn't enough - you need to practice**. I read documentation and watched countless videos, but I still restarted my entire project maybe 5 times because I didn't understand how everything connected. Which files first? What order for installations? It wasn't until I got clear guidance AND started actually writing code - practicing over and over - that things finally clicked.

The most important lesson was **breaking big problems into small pieces**. Building one endpoint at a time and testing before moving on prevented so many bugs and made everything less overwhelming.

Working with **real database relationships** (foreign keys and JOINs) gave me deeper understanding than just theory. Seeing how the database connects with an API made everything make sense.

I also learned that **structure matters**. Following the repository pattern (separating routes, repositories, and validation into different files) made my code organized and easy to work with. At first it felt like extra work, but it saved me so much time and energy.

Finally, **good error messages** helped me debug faster and made the API easier to use. Clear errors saved me countless hours.

**Biggest takeaway:** You can't learn backend just by reading or watching. You have to write code, make mistakes, start over, and keep practicing.

---

## Contact

*Maryam Rutqvist Ristimäki*

[GitHub](https://github.com/mristimaki)

[LinkedIn](https://www.linkedin.com/in/maryam-rutqvist-ristim%C3%A4ki-08b41438b?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bc7R1WAZ8S1S8%2FAaSWoQiLg%3D%3D)

---

**License:** This is a school project - not licensed for commercial use.
