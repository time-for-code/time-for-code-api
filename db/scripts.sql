CREATE DATABASE time_for_code;

CREATE TABLE users (
    user_id UUID PRIMARY KEY NOT NULL DEFAULT GEN_RANDOM_UUID(),
    name VARCHAR(255) NOT NULL,
    year_of_birth CHAR(4) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE statistic (
    statistic_id UUID PRIMARY KEY NOT NULL DEFAULT GEN_RANDOM_UUID(),
    total_attempts INT NOT NULL DEFAULT 0,
    time_of_conclusion DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    finished BOOLEAN NOT NULL DEFAULT FALSE,
    user_id UUID NOT NULL
);

CREATE TABLE exercise_statistic (
    exercise_statistic_id UUID PRIMARY KEY NOT NULL DEFAULT GEN_RANDOM_UUID(),
    statistic_id UUID NOT NULL,
    exercise_id UUID NOT NULL
);


CREATE TABLE exercise (
    exercise_id UUID PRIMARY KEY NOT NULL DEFAULT GEN_RANDOM_UUID(),
    name VARCHAR(255) NOT NULL,
    difficulty ENUM("Fácil", "Médio", "Difícil") NOT NULL
);
