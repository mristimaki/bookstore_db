-- Quick reference SQL file for terminal copy-paste
-- Contains table schemas and test data
-- Note: This file is for development/testing only

CREATE TABLE IF NOT EXISTS suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

-- Test Data (suppliers)
INSERT INTO suppliers (name, contact_person, email, phone, country) VALUES
('Islamic Foundation UK', 'Yusuf Ahmed', 'contact@islamicfoundation.org.uk', '+44-116-262-5440', 'United Kingdom'),
('Editions Tawhid France', 'Fatima Dubois', 'info@editions-tawhid.fr', '+33-4-72-00-10-29', 'France'),
('Islamiska Förbundet Stockholm', 'Ibrahim Karlsson', 'forlag@islamiskaforbundet.se', '+46-8-658-6800', 'Sweden');

-- Test Data (products)
INSERT INTO products (title, author, quantity, price, category, supplier_id) VALUES
('Riyad as-Salihin (Gardens of the Righteous)', 'Imam an-Nawawi', 15, 149.00, 'Hadith', 1),
('Le Saint Coran (French Translation)', 'Muhammad Hamidullah', 20, 199.00, 'Quranic Studies', 2),
('Islam och Västerländsk Filosofi', 'Dr. Ahmed Rashid', 12, 249.00, 'Islamic Philosophy', 3);
