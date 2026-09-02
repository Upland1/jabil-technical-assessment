USE MoviesDB;

--- populate directors ---
INSERT INTO Director (PKDirector, Name, Age, Active) VALUES
(1, 'Christopher Nolan', 54, TRUE),
(2, 'Greta Gerwig', 41, TRUE),
(3, 'Quentin Tarantino', 61, TRUE),
(4, 'Stanley Kubrick', 70, FALSE),
(5, 'Denis Villeneuve', 57, TRUE),
(6, 'Hayao Miyazaki', 83, TRUE);

--- populate movies ---
INSERT INTO Movies (PKMovies, Name, Gender, Duration, FKDirector) VALUES
-- Christopher Nolan
(101, 'The Odyssey', 'Fantasy', '02:57:00', 1),
(102, 'Interstellar', 'Sci-Fi', '02:49:00', 1),
(103, 'Oppenheimer', 'Biography', '03:00:00', 1),

-- Greta Gerwig
(104, 'Lady Bird', 'Drama', '01:34:00', 2),
(105, 'Little Women', 'Drama', '02:15:00', 2),
(106, 'Barbie', 'Comedy', '01:54:00', 2),

-- Quentin Tarantino
(107, 'Pulp Fiction', 'Crime', '02:34:00', 3),
(108, 'Inglourious Basterds', 'War', '02:33:00', 3),

-- Stanley Kubrick
(109, '2001: A Space Odyssey', 'Sci-Fi', '02:29:00', 4),
(110, 'The Shining', 'Horror', '02:26:00', 4),

-- Denis Villeneuve
(111, 'Blade Runner 2049', 'Sci-Fi', '02:44:00', 5),
(112, 'Dune: Part One', 'Sci-Fi', '02:35:00', 5),

-- Hayao Miyazaki
(113, 'Spirited Away', 'Animation', '02:05:00', 6),
(114, 'Princess Mononoke', 'Animation', '02:14:00', 6);