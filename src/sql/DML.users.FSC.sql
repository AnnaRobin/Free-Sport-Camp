use FSC;
SET autocommit=0;
SET NAMES utf8mb4 COLLATE utf8mb4_0900_ai_ci;
insert into `users` (`full_name`, `username`, `email`, `password`, `phone_number` ,`birthdate`, `sex`, `presentation`, `city_id`) VALUES
('Simon Perez', 'Simon', 'simon.p@gmail.com', '$2a$10$v9uQIdAPUPs3VTUoqGAGM.c5sj3LzwYYBzfm6ejgA51o0ZIUQ5o0y', '33666652444', '2005-09-04', 'MALE', 'Hello, my name is Simon!', (SELECT c.id FROM `cities` c WHERE c.zipcode=92060)),
('Maolo Barbier', 'Maolo', 'maolo.b@gmail.com', '$2a$10$v9uQIdAPUPs3VTUoqGAGM.c5sj3LzwYYBzfm6ejgA51o0ZIUQ5o0y', '30005555444', '2012-07-02', 'MALE', 'Hello, my name is Maolo!', (SELECT c.id FROM `cities` c WHERE c.zipcode=92100)),
('Enzo Lopez', 'Enzo', 'enzo.l@gmail.com', '$2a$10$v9uQIdAPUPs3VTUoqGAGM.c5sj3LzwYYBzfm6ejgA51o0ZIUQ5o0y', '33657854344', '1982-08-02', 'MALE', 'Hello, my name is Enzo!', (SELECT c.id FROM `cities` c WHERE c.zipcode=94120)),
('Felix Blanc', 'Felix', 'felix.b@gmail.com', '$2a$10$v9uQIdAPUPs3VTUoqGAGM.c5sj3LzwYYBzfm6ejgA51o0ZIUQ5o0y', '39995555444', '2000-05-02', 'MALE', 'Hello, my name is Felix!', (SELECT c.id FROM `cities` c WHERE c.zipcode=92100)),
('Lina Marin', 'Lina', 'lina.m@gmail.com', '$2a$10$v9uQIdAPUPs3VTUoqGAGM.c5sj3LzwYYBzfm6ejgA51o0ZIUQ5o0y', '33687543644', '2011-03-02', 'FEMALE', 'Hello, my name is Lina!', (SELECT c.id FROM `cities` c WHERE c.zipcode=92060)),
('Eva Brun', 'Eva', 'eva.b@gmail.com', '$2a$10$v9uQIdAPUPs3VTUoqGAGM.c5sj3LzwYYBzfm6ejgA51o0ZIUQ5o0y', '33658754344', '1985-08-02', 'FEMALE', 'Hello, my name is Eva!', (SELECT c.id FROM `cities` c WHERE c.zipcode=92100)),
('Jordan Masson', 'Jordan', 'jordan.m@gmail.com', '$2a$10$v9uQIdAPUPs3VTUoqGAGM.c5sj3LzwYYBzfm6ejgA51o0ZIUQ5o0y', '33655555444', '2001-08-23', 'MALE', 'Hello, my name is Jordan!', (SELECT c.id FROM `cities` c WHERE c.zipcode=94120)),
('Anais Lamy', 'Anais', 'anais.l@gmail.com', '$2a$10$v9uQIdAPUPs3VTUoqGAGM.c5sj3LzwYYBzfm6ejgA51o0ZIUQ5o0y', '33687654444', '1986-08-02', 'FEMALE', 'Hello, my name is Anais!', (SELECT c.id FROM `cities` c WHERE c.zipcode=94120)),
('Adam Millet', 'Adam', 'adam.m@gmail.com', '$2a$10$v9uQIdAPUPs3VTUoqGAGM.c5sj3LzwYYBzfm6ejgA51o0ZIUQ5o0y', '33698543244', '2002-06-02', 'MALE', 'Hello, my name is Adam!', (SELECT c.id FROM `cities` c WHERE c.zipcode=92100)),
('Timeo Brun', 'Timeo', 'timeo.b@gmail.com', '$2a$10$v9uQIdAPUPs3VTUoqGAGM.c5sj3LzwYYBzfm6ejgA51o0ZIUQ5o0y', '33987654444', '2003-12-02', 'MALE', 'Hello, my name is Timeo!', (SELECT c.id FROM `cities` c WHERE c.zipcode=92060)),
('Charles Callin', 'Chalres', 'charles.c@gmail.com', '$2a$10$v9uQIdAPUPs3VTUoqGAGM.c5sj3LzwYYBzfm6ejgA51o0ZIUQ5o0y', '33986542444', '1983-08-02', 'MALE', 'Hello, my name is Charles!', (SELECT c.id FROM `cities` c WHERE c.zipcode=92100)),
('Flora Rose', 'Flora', 'flora.r@gmail.com', '$2a$10$v9uQIdAPUPs3VTUoqGAGM.c5sj3LzwYYBzfm6ejgA51o0ZIUQ5o0y', '33659843244', '1999-08-02', 'FEMALE', 'Hello, my name is Frora!', (SELECT c.id FROM `cities` c WHERE c.zipcode=94120)),
('Zoé Lamy', 'Zoé', 'zoe.l@gmail.com', '$2a$10$v9uQIdAPUPs3VTUoqGAGM.c5sj3LzwYYBzfm6ejgA51o0ZIUQ5o0y', '33655555444', '2005-08-02', 'FEMALE', 'Hello, my name is Zoé!', (SELECT c.id FROM `cities` c WHERE c.zipcode=92060)),
('Dina Joly', 'Dina', 'dina.j@gmail.com', '$2a$10$v9uQIdAPUPs3VTUoqGAGM.c5sj3LzwYYBzfm6ejgA51o0ZIUQ5o0y', '33698765444', '1999-08-02', 'FEMALE', 'Hello, my name is Dina!', (SELECT c.id FROM `cities` c WHERE c.zipcode=92100)),
('Leon Smith', 'Leon', 'leon.s@gmail.com', '$2a$10$v9uQIdAPUPs3VTUoqGAGM.c5sj3LzwYYBzfm6ejgA51o0ZIUQ5o0y', '99995555444', '2003-09-02', 'MALE', 'Hello, my name is Leon!', (SELECT c.id FROM `cities` c WHERE c.zipcode=92060)),
('Jules Millet', 'Jules', 'jules.m@gmail.com', '$2a$10$v9uQIdAPUPs3VTUoqGAGM.c5sj3LzwYYBzfm6ejgA51o0ZIUQ5o0y', '33689654444', '1998-08-02', 'MALE', 'Hello, my name is Jules!', (SELECT c.id FROM `cities` c WHERE c.zipcode=92100)),
('Maya Marty', 'Maya', 'maya.m@gmail.com', '$2a$10$v9uQIdAPUPs3VTUoqGAGM.c5sj3LzwYYBzfm6ejgA51o0ZIUQ5o0y', '33876545444', '1989-08-02', 'FEMALE', 'Hello, my name is Maya!', (SELECT c.id FROM `cities` c WHERE c.zipcode=92060)),
('Sarah Picard', 'Sarah', 'sarah.p@gmail.com', '$2a$10$v9uQIdAPUPs3VTUoqGAGM.c5sj3LzwYYBzfm6ejgA51o0ZIUQ5o0y', '33655098764', '2006-08-02', 'FEMALE', 'Hello, my name is Sarah!', (SELECT c.id FROM `cities` c WHERE c.zipcode=92060)),
('Léo Duply', 'Léa', 'lea.d@gmail.com', '$2a$10$v9uQIdAPUPs3VTUoqGAGM.c5sj3LzwYYBzfm6ejgA51o0ZIUQ5o0y', '33655567543', '1987-10-02', 'FEMALE', 'Hello, my name is Léa!', (SELECT c.id FROM `cities` c WHERE c.zipcode=92100)),
('Lisa Roche', 'Lisa', 'lisa.r@gmail.com', '$2a$10$v9uQIdAPUPs3VTUoqGAGM.c5sj3LzwYYBzfm6ejgA51o0ZIUQ5o0y', '33786545444', '1996-06-02', 'FEMALE', 'Hello, my name is Lisa!', (SELECT c.id FROM `cities` c WHERE c.zipcode=92100));

insert into `users_roles` VALUES ((select id from `roles` r where r.code='administrateur'), 1);
insert into `users_roles` select 1, u.id from `users` u left join users_roles ur on
ur.user_id = u.id and ur.role_id =1 where ur.role_id is null;

COMMIT;
SET autocommit=1;




