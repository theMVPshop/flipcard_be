-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
--user_id mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema heroku_9ed20083dd1d7c7
-- -----------------------------------------------------

-- ------------user_id----------------------------------
-- Schema heroku_9ed20083dd1d7c7
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `heroku_9ed20083dd1d7c7` DEFAULT CHARACTER SET utf8 ;
USE `heroku_9ed20083dd1d7c7` ;

-- -----------------------------------------------------
-- Table `heroku_9ed20083dd1d7c7`.`flashcards`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_9ed20083dd1d7c7`.`flashcards` (
  `card_id` INT(11) NOT NULL,
  `course` VARCHAR(25) NOT NULL,
  `title` VARCHAR(25) NOT NULL,
  `description` VARCHAR(125) NOT NULL,
  `term` VARCHAR(200) NOT NULL,
  `definition` VARCHAR(200) NOT NULL,
  `front_img` VARCHAR(2048) NULL DEFAULT NULL,
  `back_img` VARCHAR(2048) NULL DEFAULT NULL,
  PRIMARY KEY (`card_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `heroku_9ed20083dd1d7c7`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `heroku_9ed20083dd1d7c7`.`users` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(50) NOT NULL,
  `password` VARCHAR(100) NULL DEFAULT NULL,
  `first_name` VARCHAR(25) NOT NULL,
  `last_name` VARCHAR(25) NOT NULL,
  `program` VARCHAR(25) NOT NULL,
  `approved` VARCHAR(10) NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 194
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
