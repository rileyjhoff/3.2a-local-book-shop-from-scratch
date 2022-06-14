-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP table if exists books_authors;
DROP table if exists books;
DROP table if exists authors;

CREATE TABLE books (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR,
  released INT
);

INSERT INTO books (
  title,
  released
)
VALUES 
  ('The Corrections', 2001),
  ('Financial Planning Basics for Doctors', 2019),
  ('The Name of the Wind', 2007),
  ('Sapiens', 2015),
  ('Fear and Loathing in Las Vegas', 1971),
  ('The Tipping Point', 2000),
  ('Have a Little Faith', 2009),
  ('For Whom the Bell Tolls', 1940),
  ('A Farewell to Arms', 1929),
  ('The Sun Also Rises', 1926);

CREATE TABLE authors (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR,
  dob DATE,
  pob VARCHAR
);

INSERT INTO authors (
  name,
  dob,
  pob
)
VALUES 
  ('Ernest Hemingway', '1899-07-21', 'Oak Park, IL'),
  ('Mitch Albom', '1958-05-23', 'Passaic, NJ'),
  ('Malcom Gladwell', '1963-09-03', 'Fareham, UK'),
  ('Hunter S. Thompson', '1937-07-18', 'Louisville, KY'),
  ('Yuval Noah Harari', '1976-02-24', 'Kiryat Ata, Israel'),
  ('Patrick Rothfuss', '1973-06-06', 'Madison, WI'),
  ('Jonathan Franzen', '1959-08-17', 'Western Springs, IL'),
  ('Marshall Weintraub', '1990-03-21', 'Sacramento, CA'),
  ('Michael Merrill', '1985-08-29', 'Portland, OR'),
  ('Cole Kimball', '1980-10-03', 'Portland, OR');

CREATE TABLE books_authors (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  book_id INT,
  author_id INT,
  FOREIGN KEY (book_id) REFERENCES books(id),
  FOREIGN KEY (author_id) REFERENCES authors(id)
);

INSERT INTO books_authors (
  book_id,
  author_id
)
VALUES 
  (1, 7),
  (2, 8),
  (2, 9),
  (2, 10),
  (3, 6),
  (4, 5),
  (5, 4),
  (6, 3),
  (7, 2),
  (8, 1),
  (9, 1),
  (10, 1);
