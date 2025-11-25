CREATE TABLE IF NOT EXISTS suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO suppliers (name, contact_person, email, phone, country) VALUES
('Kube Publishing Nordic', 'Amina Svensson', 'amina@kubepublishing.se', '+46812345678', 'Sweden'),
('Iqra Förlag AB', 'Fatima Andersson', 'kontakt@iqraforlag.se', '+46851234567', 'Sverige');