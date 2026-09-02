CREATE DATABASE MoviesDB;
USE MoviesDB;

CREATE TABLE Director (
    PKDirector INT NOT NULL PRIMARY KEY,
    Name VARCHAR(100),
    Age INT,
    Active BOOLEAN
);

CREATE TABLE Movies (
    PKMovies INT NOT NULL PRIMARY KEY,
    Name VARCHAR(100),
    Gender VARCHAR(50),
    Duration TIME,
    FKDirector INT,
    FOREIGN KEY (FKDirector) REFERENCES Director(PKDirector)
);
