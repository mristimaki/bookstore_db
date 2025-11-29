# Bookstore - Inventory Management System

**Student:** Maryam Rutqvist Ristimäki

**Program:** EC Utbildning / Frontend Developer

**Course:** Backend Development 1

**Date:** November 2025

---

## Introduction - What I Built

An **Inventory Management System** for an Islamic bookstore. The system handles products (books) and their suppliers, allowing full CRUD operations on both resources.

**Key Features:**
- Complete product management
- Supplier management with relationships
- Database relations using foreign keys
- Input validation
- Error handling

---

## Planning - How I Planned the Project

### Planning Process
1. **Requirements Analysis:** Read through the assignment requirements (G and VG criteria)
2. **Database Design:** Sketched the table structure
   - Suppliers (main entity)
   - Products (dependent on suppliers via foreign key)
   - One-to-many relationship: one supplier can have many products
3. **API Planning:** Decided which endpoints were needed for full CRUD
4. **Prioritization:** Decided to build suppliers first, then products (correct dependency order)

### Technology Choices
- **Node.js + Express:** For the REST API
- **PostgreSQL:** Relational database for structured data
- **Docker:** For consistent database environment
- **Bruno:** For API testing

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

**Phase 1: Initial Setup**
- Installed Node.js, Express and Docker
- Created project structure (folders and files)
- Set up environment variables (.env and .gitignore)
- Created PostgreSQL database in Docker
- Created `suppliers` table

**Phase 2: Suppliers Module**
- Built CRUD operations in order: GET → POST → PUT → DELETE
- Added validation for supplier data
- Tested each endpoint in Bruno before moving to the next

**Phase 3: Products table**
- Created `products` table when the suppliers module was finished
- Ensured referential integrity (can't add product with non-existent supplier)

**Phase 4: Products Module**
- Built CRUD operations following the same pattern as suppliers
- Added JOIN queries to include supplier information in product responses
- Implemented validation including foreign key checks
- Tested all endpoints thoroughly

**Phase 5: VG Requirements**
- Added `GET /suppliers/:id/products` endpoint
- Implemented product count in `GET /suppliers/:id`

### Did It Go As Planned?

**No - Had to Restart Several Times:**

**First Attempt:** Started with products module
- Problem: Too complicated without suppliers in place
- Solution: Deleted and started over

**Second Attempt:** Built basic version, tried to upgrade to VG later
- Problem: Adding relationships afterwards was messy
- Solution: Deleted and started over

**Third Attempt:** Built suppliers first + planned for VG from the start
- Result: Everything fell into place!

### Key Lesson from Restarts
Building in the correct order (simple → complex) and planning for requirements from the start saves massive amounts of time.

### Changes Made During Development
- **Switched approach:** From products-first to suppliers-first
- **Improved naming:** Changed variable names for consistency (e.g., productRepo → productsRepo)
- **Better errors:** Added more detailed error messages (e.g., "must be a number (without quotes)")
- **Validation refinement:** Made validation messages clearer and more helpful

### What Went Well
- Once I started with suppliers first, everything made sense
- Testing each endpoint before moving on caught bugs early
- The repository pattern kept code organized and easy to navigate
- Bruno made testing visual and quick
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

### Example API Responses

**GET /api/products** (shows JOIN in action):
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

**GET /api/suppliers/1** (shows product count):
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

### Error Handling
- **200:** Success
- **201:** Created
- **400:** Bad request (validation errors)
- **404:** Not found
- **500:** Server error

---

## 💡 Lessons Learned & Challenges

### What Was Difficult?

**1. Understanding the Big Picture**
- Which files do what? How do routes, repositories, and database connect?
- How does `supplier_id` link tables together?
- Solution: Had to rebuild the project multiple times until it clicked

**2. SQL and Database Relationships**
- Had worked with SQL years ago but forgot most of it
- JOIN queries were completely new (LEFT JOIN, GROUP BY, COUNT)
- Understanding foreign keys and referential integrity
- Solution: Practiced small examples in psql terminal before implementing

**3. Knowing What to Build First**
- Started with products → too complex
- Started with basic version → hard to upgrade
- Solution: Build simple things first (suppliers), then complex (products)

**4. Error Handling at Different Levels**
- Validation errors (wrong data type)
- Database errors (foreign key violations)
- Learning to handle both and return helpful messages

### What Was Easy?

**1. Pattern Recognition**
- Once suppliers worked, products followed the same structure
- GET → POST → PUT → DELETE became a repeatable pattern
- Repository pattern made code predictable and organized

**2. Git Version Control**
- Regular commits helped track progress

**3. Testing with Bruno**
- Visual interface made testing intuitive
- Quick to test different scenarios
- Saved requests for repeated testing

### Key Learnings

**Technical Skills:**
- ✅ Building REST APIs with Express (routes, middleware, error handling)
- ✅ Database design with foreign keys and relationships
- ✅ SQL queries: JOINs, GROUP BY, COUNT aggregation
- ✅ Input validation and meaningful error messages
- ✅ Environment variables for security
- ✅ Repository pattern for clean code structure

**Work Methodology:**
- ✅ **Break down large problems:** One endpoint at a time, one feature at a time
- ✅ **Test incrementally:** Don't build everything before testing
- ✅ **Read error messages carefully:** They often tell you exactly what's wrong
- ✅ **Starting over is OK:** Better to rebuild with understanding than continue confused
- ✅ **Practice > Theory:** 100 videos helped less than actually writing code

**Problem-Solving:**
- ✅ Debug by following data flow (request → route → validation → repository → database)
- ✅ Compare working code with broken code to spot differences
- ✅ Ask for help when truly stuck (saves hours of frustration)

### If I Did This Again...

**What I Would Do Differently:**
- Write less notes, code more from the start
- Write README as I go, not at the end
- Set up better test data from the beginning

**What I Would Keep:**
- The repository pattern - clean and maintainable
- Building one complete module before starting the next
- Regular git commits with descriptive messages
- Testing every endpoint immediately after building it

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

This project taught me that **reading tutorials isn't enough - you need to practice**. 

I watched countless videos and read documentation, but still had to restart the entire project multiple times because I didn't understand how everything connected. Which files first? What order? It wasn't until I combined clear guidance WITH actual practice - writing code over and over - that things finally clicked.

**Most Important Lessons:**

1. **Breaking big problems into small pieces** - Building one endpoint at a time and testing before moving on prevented bugs and made everything less overwhelming.

2. **Build in the right order** - Starting with the simplest part (suppliers) before the complex part (products with foreign keys) made everything smoother.

3. **Structure matters** - The repository pattern felt like extra work at first, but it saved massive amounts of time by keeping code organized and predictable.

4. **Real practice beats theory** - Working with actual database relationships (foreign keys, JOINs) taught me more than any tutorial could.

5. **Good errors save time** - Clear, descriptive error messages helped me debug faster and made the API easier to use.

**Biggest Takeaway:**  
You can't learn backend just by reading or watching. You have to write code, make mistakes, start over, and keep practicing until it makes sense.

---

## Contact

*Maryam Rutqvist Ristimäki*

[GitHub](https://github.com/mristimaki)

[LinkedIn](https://www.linkedin.com/in/maryam-rutqvist-ristim%C3%A4ki-08b41438b?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bc7R1WAZ8S1S8%2FAaSWoQiLg%3D%3D)

---

**License:** This is a school project - not licensed for commercial use.
