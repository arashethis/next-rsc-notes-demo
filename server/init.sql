-- Active: 1742798085939@@localhost@3306@learning
CREATE TABLE IF NOT EXISTS notes (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  body TEXT,
  updated_at BIGINT NOT NULL
);

-- Insert sample data
INSERT INTO notes (id, title, body, updated_at) VALUES
('1', 'Development Plan', '1. Complete user authentication module\n2. Implement data synchronization\n3. Optimize performance', 1742798085939),
('2', 'Meeting Minutes', 'Team Weekly Meeting Points:\n- Project progress review\n- Technical challenges discussion\n- Next week planning', 1742798085940),
('3', 'Learning Notes', 'React Server Components Features:\n1. Reduced client-side JavaScript bundle\n2. Direct backend resource access\n3. Automatic code splitting', 1742798085941);