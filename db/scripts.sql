CREATE DATABASE time-for-code;

CREATE TABLE users (
    user_id UUID PRIMARY KEY NOT NULL DEFAULT GEN_RANDOM_UUID(),
    name VARCHAR(255) NOT NULL,
    year_of_birth CHAR(4) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);