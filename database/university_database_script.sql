-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema university_system_db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `university_system_db` ;

-- -----------------------------------------------------
-- Schema university_system_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `university_system_db` DEFAULT CHARACTER SET utf8 ;
USE `university_system_db` ;

-- -----------------------------------------------------
-- Table `university_system_db`.`university`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `university_system_db`.`university` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `address` VARCHAR(100) NOT NULL,
  `date_of_foundation` DATE NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `university_system_db`.`college`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `university_system_db`.`college` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `address` VARCHAR(100) NOT NULL,
  `date_of_foundation` DATE NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` TINYINT(4) NOT NULL DEFAULT '1',
  `university_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_college_university_idx` (`university_id` ASC) VISIBLE,
  CONSTRAINT `fk_college_university`
    FOREIGN KEY (`university_id`)
    REFERENCES `university_system_db`.`university` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `university_system_db`.`study_program`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `university_system_db`.`study_program` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `num_of_years` INT(11) NOT NULL,
  `ects` INT(11) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` TINYINT(4) NOT NULL DEFAULT '1',
  `college_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_study_program_college1_idx` (`college_id` ASC) VISIBLE,
  CONSTRAINT `fk_study_program_college1`
    FOREIGN KEY (`college_id`)
    REFERENCES `university_system_db`.`college` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `university_system_db`.`school_subject`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `university_system_db`.`school_subject` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` TINYINT(4) NOT NULL DEFAULT '1',
  `study_program_id` INT(11) NOT NULL,
  `ects` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_school_subject_study_program1_idx` (`study_program_id` ASC) VISIBLE,
  CONSTRAINT `fk_school_subject_study_program1`
    FOREIGN KEY (`study_program_id`)
    REFERENCES `university_system_db`.`study_program` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 13
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `university_system_db`.`student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `university_system_db`.`student` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `address` VARCHAR(100) NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` TINYINT(4) NOT NULL DEFAULT '1',
  `study_program_id` INT(11) NOT NULL,
  `university_id` INT(11) NOT NULL,
  `num_registration` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_student_study_program1_idx` (`study_program_id` ASC) VISIBLE,
  INDEX `fk_student_university1_idx` (`university_id` ASC) VISIBLE,
  CONSTRAINT `fk_student_study_program1`
    FOREIGN KEY (`study_program_id`)
    REFERENCES `university_system_db`.`study_program` (`id`),
  CONSTRAINT `fk_student_university1`
    FOREIGN KEY (`university_id`)
    REFERENCES `university_system_db`.`university` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `university_system_db`.`title`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `university_system_db`.`title` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `university_system_db`.`teacher`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `university_system_db`.`teacher` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `date_of_birth` DATE NOT NULL,
  `address` VARCHAR(100) NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` TINYINT(4) NOT NULL DEFAULT '1',
  `title_id` INT(11) NOT NULL,
  `university_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_teacher_title1_idx` (`title_id` ASC) VISIBLE,
  INDEX `fk_teacher_university1_idx` (`university_id` ASC) VISIBLE,
  CONSTRAINT `fk_teacher_title1`
    FOREIGN KEY (`title_id`)
    REFERENCES `university_system_db`.`title` (`id`),
  CONSTRAINT `fk_teacher_university1`
    FOREIGN KEY (`university_id`)
    REFERENCES `university_system_db`.`university` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `university_system_db`.`mark`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `university_system_db`.`mark` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `value` INT(11) NOT NULL,
  `student_id` INT(11) NOT NULL,
  `school_subject_id` INT(11) NOT NULL,
  `teacher_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_mark_student1_idx` (`student_id` ASC) VISIBLE,
  INDEX `fk_mark_school_subject1_idx` (`school_subject_id` ASC) VISIBLE,
  INDEX `fk_mark_teacher1_idx` (`teacher_id` ASC) VISIBLE,
  CONSTRAINT `fk_mark_school_subject1`
    FOREIGN KEY (`school_subject_id`)
    REFERENCES `university_system_db`.`school_subject` (`id`),
  CONSTRAINT `fk_mark_student1`
    FOREIGN KEY (`student_id`)
    REFERENCES `university_system_db`.`student` (`id`),
  CONSTRAINT `fk_mark_teacher1`
    FOREIGN KEY (`teacher_id`)
    REFERENCES `university_system_db`.`teacher` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `university_system_db`.`teacher_school_subject`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `university_system_db`.`teacher_school_subject` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `teacher_id` INT(11) NOT NULL,
  `school_subject_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_teacher_has_school_subject_school_subject1_idx` (`school_subject_id` ASC) VISIBLE,
  INDEX `fk_teacher_has_school_subject_teacher1_idx` (`teacher_id` ASC) VISIBLE,
  CONSTRAINT `fk_teacher_has_school_subject_school_subject1`
    FOREIGN KEY (`school_subject_id`)
    REFERENCES `university_system_db`.`school_subject` (`id`),
  CONSTRAINT `fk_teacher_has_school_subject_teacher1`
    FOREIGN KEY (`teacher_id`)
    REFERENCES `university_system_db`.`teacher` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `university_system_db`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `university_system_db`.`user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(512) NOT NULL,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
