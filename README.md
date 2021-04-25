----------------------------------------------------------------DDL------------------------------------------------------------------------------------
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `fsc` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;

USE `fsc` ;
-- -----------------------------------------------------
-- Table `fsc`.`cities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fsc`.`cities` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `zipcode` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;

-- -----------------------------------------------------
-- Table `fsc`.`levels`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fsc`.`levels` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;

-- -----------------------------------------------------
-- Table `fsc`.`sports`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fsc`.`sports` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `fsc`.`time_slots`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fsc`.`time_slots` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `max_time` TIME NOT NULL,
  `min_time` TIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;

-- -----------------------------------------------------
-- Table `fsc`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fsc`.`users` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(256) NOT NULL,
  `phone_number` VARCHAR(25) NULL,
  `birthdate` DATE NULL,
  `sex` ENUM('2') NULL,
  `city_id` INT(10) UNSIGNED NOT NULL,
  `presentation` VARCHAR(500) NULL,
  `enabled` VARCHAR(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `users_city_id_IDX` (`city_id` ASC),
  CONSTRAINT `users_city_id_FK`
    FOREIGN KEY (`city_id`)
    REFERENCES `fsc`.`cities` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 39
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;

-- -----------------------------------------------------
-- Table `fsc`.`events`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fsc`.`events` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `appointment` DATE NOT NULL,
  `description` VARCHAR(1000) NULL DEFAULT NULL,
  `city_id` INT(10) UNSIGNED NOT NULL,
  `time` TIME NOT NULL,
  `level_id` INT(10) UNSIGNED NOT NULL,
  `sport_id` INT(10) UNSIGNED NOT NULL,
  `organizer_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
UNIQUE KEY `events_organizer_id_appointment_time_UNIQUE`(`organizer_id`,`appointment`,`time`),
  INDEX `events_city_id_IDX` (`city_id` ASC),
  INDEX `events_level_id_IDX` (`level_id` ASC),
  INDEX `events_sport_id_IDX` (`sport_id` ASC),
  INDEX `events_user_id_IDX` (`organizer_id` ASC),
  INDEX `events_organizer_id_IDX` (`organizer_id`),
  CONSTRAINT `events_city_id_FK`
    FOREIGN KEY (`city_id`)
    REFERENCES `fsc`.`cities` (`id`),
  CONSTRAINT `events_level_id_FK`
    FOREIGN KEY (`level_id`)
    REFERENCES `fsc`.`levels` (`id`),
  CONSTRAINT `events_sport_id_FK`
    FOREIGN KEY (`sport_id`)
    REFERENCES `fsc`.`sports` (`id`),
  CONSTRAINT `events_user_id_FK`
    FOREIGN KEY (`organizer_id`)
    REFERENCES `fsc`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 104
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;

-- -----------------------------------------------------
-- Table `fsc`.`participations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fsc`.`participations` (
  `event_id` INT(10) UNSIGNED NOT NULL,
  `user_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`user_id`, `event_id`),
  INDEX `fk_participation_user_idx` (`user_id` ASC),
  INDEX `fk_participation_event_idx` (`event_id` ASC),
  CONSTRAINT `fk_participation_event`
    FOREIGN KEY (`event_id`)
    REFERENCES `fsc`.`events` (`id`),
  CONSTRAINT `fk_participation_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `fsc`.`users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


-- -----------------------------------------------------
-- Table `fsc`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fsc`.`roles` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(45) NOT NULL,
  `default_role` VARCHAR(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `code_UNIQUE` (`code` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;

-- -----------------------------------------------------
-- Table `fsc`.`users_roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fsc`.`users_roles` (
  `user_id` INT(10) UNSIGNED NOT NULL,
  `role_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`),
  INDEX `users_roles_role_id_IDX` (`role_id` ASC),
  INDEX `users_roles_user_id_IDX` (`user_id` ASC),
  CONSTRAINT `users_roles_user_id_FK`
    FOREIGN KEY (`user_id`)
    REFERENCES `fsc`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `users_roles_role_id_FK`
    FOREIGN KEY (`role_id`)
    REFERENCES `fsc`.`roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

---------------------------------------------------------------------------DML--------------------------------------------------------------------------




USE fsc;
--
-- Dumping data for table `cities`
--

INSERT INTO `cities` VALUES (1,'Fontenay','94120'),(2,'La Défense','92060'),(3,'Boulogne','92100');

--
-- Dumping data for table `levels`
--

INSERT INTO `levels` VALUES (1,'débutant'),(2,'intermédiaire'),(3,'expert');

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` VALUES (1,'user','T'),(2,'administrateur','F');

--
-- Dumping data for table `sports`
--

INSERT INTO `sports` VALUES (1,'course à pieds'),(2,'football'),(3,'ping-pong'),(4,'baby-foot');

--
-- Dumping data for table `time_slots`
--

INSERT INTO `time_slots` VALUES (1,'matin','00:00:00','12:00:00'),(2,'midi','12:00:00','14:00:00'),(3,'après-midi','14:00:00','20:00:00'),(4,'nocturne','20:00:00','23:59:59');

--
-- Dumping data for table `users`
--
INSERT INTO `users` VALUES
(1,'Deleted user','Utilisateur supprimé','fake.mail@gmail.com','fake','',NULL,NULL,'',NULL,NULL);


