DROP SCHEMA IF EXISTS `FSC` ;
CREATE SCHEMA IF NOT EXISTS `FSC` DEFAULT CHARACTER SET utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
USE `FSC` ;

CREATE TABLE  `sports` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE  `cities` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `zipcode` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE  `levels` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE  `time_slots` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `min_time` TIME NOT NULL,
  `max_time` TIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE  `users` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(250) NOT NULL,
  `enabled` TINYINT(1) NOT NULL DEFAULT 1,
  `phone_number` VARCHAR(25) NULL,
  `birthdate` DATE NULL,
  `sex` ENUM("MALE", "FEMALE") NULL,
  `presentation` VARCHAR(500) NULL,
  `city_id` INT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UQ` (`username`),
  UNIQUE INDEX `email_UQ` (`email`),
  INDEX `users_city_id_IDX` (`city_id`),
  CONSTRAINT `users_city_id_FK` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`))
ENGINE = InnoDB;

CREATE TABLE  `events` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `appointment` DATE NOT NULL,
  `time` TIME NOT NULL,
  `description` VARCHAR(1000) NULL,
  `city_id` INT UNSIGNED NOT NULL,
  `level_id` INT UNSIGNED NOT NULL,
  `sport_id` INT UNSIGNED NOT NULL,
  `organizer_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `events_city_id_IDX` (`city_id`),
  INDEX `events_level_id_IDX` (`level_id`),
  INDEX `events_sport_id_IDX` (`sport_id`),
  INDEX `events_organizer_id_IDX` (`organizer_id`),
  UNIQUE INDEX `events_organizer_appointment_time_UQ` (`id`, `appointment`, `time`, `organizer_id`),
  CONSTRAINT `events_city_id_FK` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`),
  CONSTRAINT `events_level_id_FK` FOREIGN KEY (`level_id`) REFERENCES `levels` (`id`),
  CONSTRAINT `events_sport_id_FK` FOREIGN KEY (`sport_id`) REFERENCES `sports` (`id`),
  CONSTRAINT `events_organizer_id_FK` FOREIGN KEY (`organizer_id`) REFERENCES `users` (`id`))
ENGINE = InnoDB;

CREATE TABLE  `participations` (
  `event_id` INT(10) UNSIGNED NOT NULL,
  `user_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`user_id`, `event_id`),
  INDEX `participations_user_id_IDX` (`user_id`),
  INDEX `participations_event_id_IDX` (`event_id`),
  CONSTRAINT `participations_event_id_FK` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`),
  CONSTRAINT `participations_user_id_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`))
ENGINE = InnoDB;

CREATE TABLE  `roles` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(45) NOT NULL,
  `default_role` TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE INDEX `code_UQ` (`code`),
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE  `users_roles` (
  `role_id` INT(10) UNSIGNED NOT NULL,
  `user_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`role_id`, `user_id`),
  INDEX `users_roles_user_id_IDX` (`user_id`),
  INDEX `users_roles_role_id_IDX` (`role_id`),
  CONSTRAINT `users_roles_role_id_FK` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `users_roles_user_id_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`))
ENGINE = InnoDB;

