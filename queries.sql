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
('Islamic Foundation', 'Yusuf Ahmed', 'contact@islamicfoundation.org.uk', '+44-116-262-5440', 'United Kingdom'),
('Dar Al-Maarifah Publishing', 'Hassan Khalil', 'orders@darmaarifah.com', '+966-12-345-6789', 'Lebanon'),
('Kube Publishing Nordic', 'Amina Svensson', 'amina@kubepublishing.se', '+46812345678', 'Sweden'),
('Islamisk Bokforlag Oslo', 'Ibrahim Johansen', 'contact@islamskbok.no', '+4721234567', 'Norway'),
('Islamilainen Kirjakauppa', 'Aisha Virtanen', 'aisha@islamilainen.fi', '+358912345678', 'Finland');

INSERT INTO products (title, author, quantity, price, category, supplier_id) VALUES
('Riyad as-Salihin', 'Imam an-Nawawi', 15, 149.00, 'Hadith', 1),
('Sahih al-Bukhari', 'Imam al-Bukhari', 8, 399.00, 'Hadith', 4),
('Tafsir Ibn Kathir (Vol 1-10)', 'Ibn Kathir', 5, 899.00, 'Quranic Studies', 1),
('Muhammad: His Life Based on the Earliest Sources', 'Martin Lings', 12, 249.00, 'Biography', 2),
('In the Footsteps of the Prophet', 'Tariq Ramadan', 10, 269.00, 'Biography', 4),
('Reclaim Your Heart', 'Yasmin Mogahed', 25, 179.00, 'Personal Development', 2),
('Healing the Emptiness', 'Yasmin Mogahed', 18, 189.00, 'Personal Development', 2),
('Love & Happiness', 'Yasmin Mogahed', 22, 169.00, 'Personal Development', 2),
('Ihya Ulum al-Din (Revival of Religious Sciences)', 'Imam al-Ghazali', 6, 499.00, 'Theology', 5),
('The Alchemy of Happiness', 'Imam al-Ghazali', 14, 159.00, 'Philosophy', 5),
('Purification of the Heart', 'Hamza Yusuf', 20, 199.00, 'Spirituality', 3),
('The Prayer of the Oppressed', 'Hamza Yusuf', 15, 129.00, 'Spirituality', 3),
('Agenda to Change Our Condition', 'Hamza Yusuf', 12, 149.00, 'Personal Development', 3),
('Destiny Disrupted: A History of the World Through Islamic Eyes', 'Tamim Ansary', 10, 229.00, 'History', 2),
('Lost Islamic History', 'Firas Alkhateeb', 8, 189.00, 'History', 2),
('Fiqh us-Sunnah', 'Sayyid Sabiq', 7, 349.00, 'Islamic Law', 1),
('Reliance of the Traveller', 'Ahmad ibn Naqib al-Misri', 4, 459.00, 'Islamic Law', 1),
('My First Book of Prayers', 'Various Authors', 30, 89.00, 'Children', 4),
('Stories of the Prophets for Children', 'Saniyasnain Khan', 25, 119.00, 'Children', 1),
('The Sealed Nectar', 'Safiur Rahman al-Mubarakpuri', 18, 219.00, 'Biography', 1);

-- Check total products
SELECT COUNT(*) FROM products;
-- Should return: 23

-- Check products per supplier
SELECT 
    suppliers.name, 
    COUNT(products.id) as product_count
FROM suppliers
LEFT JOIN products ON suppliers.id = products.supplier_id
GROUP BY suppliers.name;

-- See all Yasmin Mogahed books
SELECT * FROM products WHERE author = 'Yasmin Mogahed';

-- See all books with supplier info
SELECT 
    products.*, 
    suppliers.name as supplier_name,
    suppliers.country as supplier_country
FROM products
JOIN suppliers ON products.supplier_id = suppliers.id;