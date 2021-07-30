

USE `FSC`;
SET autocommit=0;
SET FOREIGN_KEY_CHECKS=0;

TRUNCATE TABLE participations;
truncate table events;
TRUNCATE TABLE cities;
truncate table levels;
TRUNCATE TABLE sports;
TRUNCATE TABLE time_slots;


-- Dumping data for table `cities`
INSERT INTO `cities` (`name`, `zipcode`) VALUES ('Fontenay','94120'),('La Défense','92060'),('Boulogne','92100');

-- Dumping data for table `levels`
INSERT INTO `levels` (`name`) VALUES ('débutant'),('intermédiaire'),('expert');

-- Dumping data for table `roles`
INSERT INTO `roles`(`code`, `default_role`) VALUES ('user','1'),('administrateur','0');

-- Dumping data for table `sports`
INSERT INTO `sports` (`name`) VALUES ('course à pieds'),('football'),('ping-pong'),('baby-foot');

-- Dumping data for table `time_slots`

INSERT INTO `time_slots` (`name`, `min_time`, `max_time`) VALUES ('matin','00:00:00','12:00:00'),('midi','12:00:00','14:00:00'),('après-midi','14:00:00','20:00:00'),('nocturne','20:00:00','23:59:59');

COMMIT;
SET autocommit=1;
SET FOREIGN_KEY_CHECKS=1;