CREATE DATABASE apitypescript;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT
);

INSERT INTO users(name, email)
    VALUES ('Juan', 'juanArrevayo2001@gmail.com'),
            ('Marcos', 'MarcosPerez22@gmail.com');
            