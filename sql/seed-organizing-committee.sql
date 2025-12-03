-- Seed Organizing Committee Data
-- This script inserts all organizing committee members into the committee_members table

-- Clear existing organizing committee data (optional - remove if you want to keep existing data)
DELETE FROM committee_members WHERE committee_type = 'organizing';

-- Chief Patron
INSERT INTO committee_members (name, designation, affiliation, email, committee_type, display_order, is_active)
VALUES 
('Prof. Banani Chakrabarti', 'Chancellor', 'University of Engineering & Management, Kolkata', '', 'organizing', 1, true);

-- Patrons
INSERT INTO committee_members (name, designation, affiliation, email, committee_type, display_order, is_active)
VALUES 
('Prof. Dr. Sajal Dasgupta', 'Vice Chancellor', 'University of Engineering & Management, Kolkata', '', 'organizing', 2, true),
('Prof. Dr. Satyajit Chakrabarti', 'Pro Vice Chancellor', 'University of Engineering & Management, Kolkata', '', 'organizing', 3, true),
('Prof. Dr. Sukalyan Goswami', 'Registrar', 'University of Engineering & Management, Kolkata', '', 'organizing', 4, true),
('Prof. Dr. Rajashree Paul', 'Deputy-Dean (Research), Director(IQAC)', 'University of Engineering & Management, Kolkata', '', 'organizing', 5, true),
('Prof. Dr. Kamakhya Prasad Ghatak', 'Dean-Engineering', 'University of Engineering & Management, Kolkata', '', 'organizing', 6, true),
('Prof. Dr. Rajiv Ganguly', 'Dean-Science', 'University of Engineering & Management, Kolkata', '', 'organizing', 7, true),
('Prof. Dr. Abir Chatterjee', 'Dean-Research', 'University of Engineering and Management, Kolkata', '', 'organizing', 8, true);

-- General Chairs
INSERT INTO committee_members (name, designation, affiliation, email, committee_type, display_order, is_active)
VALUES 
('Prof. Dr. Weiping Ding', 'General Chair - Deputy Dean of School of Information Science and Technology', 'Nantong University, Nantong, Jiangsu, China', '', 'organizing', 9, true),
('Prof. Dr. Amlan Chakrabarti', 'General Chair', 'A.K.Choudhury School of Information Technology, University of Calcutta', '', 'organizing', 10, true),
('Prof. Dr. Shouvik Chakraborty', 'General Chair - Department of Computer Science & Technology', 'Government of West Bengal, Chandannagar, Hooghly, West Bengal, India', '', 'organizing', 12, true);

-- Convenor
INSERT INTO committee_members (name, designation, affiliation, email, committee_type, display_order, is_active)
VALUES 
('Prof. Dr. Maumita Chakraborty', 'Convenor', 'Department of Computer Science and Technology & Computer Science and Information Technology, University of Engineering and Management, Kolkata', '', 'organizing', 13, true);

-- Co-Convenors
INSERT INTO committee_members (name, designation, affiliation, email, committee_type, display_order, is_active)
VALUES 
('Prof. Dr. Subhalaxmi Chakraborty', 'Co-Convenor', 'University of Engineering and Management, Kolkata', '', 'organizing', 14, true),
('Prof. Dr. Sudipta Basu Pal', 'Co-Convenor', 'University of Engineering and Management, Kolkata', '', 'organizing', 15, true),
('Prof. Dr. Chiradeep Mukherjee', 'Co-Convenor', 'University of Engineering and Management, Kolkata', '', 'organizing', 16, true);

-- Technical Chairs
INSERT INTO committee_members (name, designation, affiliation, email, committee_type, display_order, is_active)
VALUES 
('Prof. Dr. Danilo Pelusi', 'Technical Chair', 'University of Teramo, Faculty of Communication Sciences, Teramo, Italy', '', 'organizing', 17, true),
('Prof. Dr. Asit Kumar Das', 'Technical Chair', 'Department of Computer Science and Technology, Indian Institute of Engineering Science and Technology, Shibpur', '', 'organizing', 18, true);

-- Industrial Chair
-- Note: The industrial chair entry was commented out in the source data, so not including it here
-- Uncomment if needed:
-- INSERT INTO committee_members (name, designation, affiliation, email, committee_type, display_order, is_active)
-- VALUES ('Dr. Tanushyam Chattopadhyay', 'Industrial Chair', 'Techno Functional Head, Computer Vision, Adani Enterprise Limited', '', 'organizing', 19, true);

-- Finance Chair
INSERT INTO committee_members (name, designation, affiliation, email, committee_type, display_order, is_active)
VALUES 
('Mr. Indranil Banerjee', 'Finance Chair', 'University of Engineering and Management Kolkata', '', 'organizing', 20, true);

-- Organizing Committee Members
INSERT INTO committee_members (name, designation, affiliation, email, committee_type, display_order, is_active)
VALUES 
('Prof. Dr. Srilekha Mukherjee', 'Organizing Member', 'University of Engineering and Management Kolkata', '', 'organizing', 21, true),
('Prof. Dr. Anirban Ganguly', 'Organizing Member', 'University of Engineering and Management Kolkata', '', 'organizing', 22, true),
('Prof. Dr. Subhrangshu Das', 'Organizing Member', 'University of Engineering and Management Kolkata', '', 'organizing', 23, true),
('Prof. Dr. Debanjana Datta Mitra', 'Organizing Member', 'University of Engineering and Management Kolkata', '', 'organizing', 24, true),
('Prof. Pradipta Sarkar', 'Organizing Member', 'University of Engineering and Management Kolkata', '', 'organizing', 25, true),
('Prof. Sanjukta Mishra', 'Organizing Member', 'University of Engineering and Management Kolkata', '', 'organizing', 26, true),
('Prof. Kamalika Bhowal', 'Organizing Member', 'University of Engineering and Management Kolkata', '', 'organizing', 27, true),
('Prof. Dr. Suvaditya Majumdar', 'Organizing Member', 'University of Engineering and Management Kolkata', '', 'organizing', 28, true),
('Prof. Ayan Das', 'Organizing Member', 'University of Engineering and Management Kolkata', '', 'organizing', 29, true),
('Prof. Arpita Saha Chowdhury', 'Organizing Member', 'University of Engineering and Management Kolkata', '', 'organizing', 30, true),
('Prof. Ritika Pramanick', 'Organizing Member', 'University of Engineering and Management Kolkata', '', 'organizing', 31, true);

-- Verify the data
SELECT 
    name, 
    designation, 
    affiliation, 
    display_order 
FROM committee_members 
WHERE committee_type = 'organizing' 
ORDER BY display_order;
