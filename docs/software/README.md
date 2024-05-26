# Реалізація інформаційного та програмного забезпечення


## SQL-скрипт для створення на початкового наповнення бази даних

```sql
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mcas
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mcas` ;

-- -----------------------------------------------------
-- Schema mcas
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mcas` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `mcas` ;

-- -----------------------------------------------------
-- Table `mcas`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`role` ;

CREATE TABLE IF NOT EXISTS `mcas`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `nameIndex` (`name` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`user` ;

CREATE TABLE IF NOT EXISTS `mcas`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NULL DEFAULT NULL,
  `password` VARCHAR(255) NOT NULL,
  `roleId` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE,
  INDEX `roleId` (`roleId` ASC) VISIBLE,
  CONSTRAINT `user_ibfk_1`
    FOREIGN KEY (`roleId`)
    REFERENCES `mcas`.`role` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`action`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`action` ;

CREATE TABLE IF NOT EXISTS `mcas`.`action` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `userId` (`userId` ASC) VISIBLE,
  CONSTRAINT `action_ibfk_1`
    FOREIGN KEY (`userId`)
    REFERENCES `mcas`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`publicrequest`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`publicrequest` ;

CREATE TABLE IF NOT EXISTS `mcas`.`publicrequest` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `date` DATE NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `actionId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `actionId` (`actionId` ASC) VISIBLE,
  CONSTRAINT `publicrequest_ibfk_1`
    FOREIGN KEY (`actionId`)
    REFERENCES `mcas`.`action` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`mediadata`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`mediadata` ;

CREATE TABLE IF NOT EXISTS `mcas`.`mediadata` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `fileType` TEXT NOT NULL,
  `requestId` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `requestId` (`requestId` ASC) VISIBLE,
  CONSTRAINT `mediadata_ibfk_1`
    FOREIGN KEY (`requestId`)
    REFERENCES `mcas`.`publicrequest` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`permision`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`permision` ;

CREATE TABLE IF NOT EXISTS `mcas`.`permision` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mcas`.`permisionhasrole`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mcas`.`permisionhasrole` ;

CREATE TABLE IF NOT EXISTS `mcas`.`permisionhasrole` (
  `permisionId` INT NOT NULL,
  `roleName` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`permisionId`, `roleName`),
  INDEX `roleName` (`roleName` ASC) VISIBLE,
  CONSTRAINT `permisionhasrole_ibfk_1`
    FOREIGN KEY (`permisionId`)
    REFERENCES `mcas`.`permision` (`id`),
  CONSTRAINT `permisionhasrole_ibfk_2`
    FOREIGN KEY (`roleName`)
    REFERENCES `mcas`.`role` (`name`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
```

# RESTfull сервіс для управління даними 

## UserController
    package com.example.lab6.controllers;
    import com.example.lab6.models.User;
    import com.example.lab6.services.UserService;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.util.Optional;

    @RestController
    @RequestMapping("/users")
    public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        User registeredUser = userService.registerUser(user.getUsername(), user.getPassword(), user.getEmail());
        if (registeredUser != null) {
            return ResponseEntity.ok("User successfully registered");
        } else {
            return ResponseEntity.badRequest().body("Error in registration");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        Optional<User> foundUser = userService.findUserByUsernameAndPassword(user.getUsername(), user.getPassword());
        if (foundUser.isPresent()) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Integer id) {
        boolean isDeleted = userService.deleteUser(id);
        if (isDeleted) {
            return ResponseEntity.ok("User successfully deleted");
        } else {
            return ResponseEntity.badRequest().body("Error, user wasn't deleted");
        }
    }
    }


## UserModel
    package com.example.lab6.models;

    import jakarta.persistence.*;

    import java.util.Objects;


    @Entity
    @Table (name = "user")
    public class User{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id ;
    private String nickname;
    private String password;
    private String email;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public String getUsername() {
        return nickname;
    }

    public void setUsername(String login) {
        this.nickname = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) && Objects.equals(nickname, user.nickname) && Objects.equals(password, user.password) && Objects.equals(email, user.email);
    }


    @Override
    public int hashCode() {
        return Objects.hash(id, nickname, password, email);
    }

    @Override
    public String toString() {
        return "UserModel{" +
                "id=" + id +
                ", nickname='" + nickname + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                '}';
    }

    }

## RoleModel
    package com.example.lab6.models;

    public enum Role {
    ADMIN, USER;
    }

## UserService
    package com.example.lab6.services;

    import com.example.lab6.models.Role;
    import com.example.lab6.models.User;
    import com.example.lab6.repositories.UserRepository;
    import org.springframework.stereotype.Service;

    import jakarta.transaction.Transactional;
    import java.util.Optional;

    @Service
    public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public User registerUser(String nickname, String password, String email) {
        if (nickname == null || password == null) {
            return null;
        } else {
            User user = new User();
            user.setUsername(nickname);
            user.setPassword(password);
            user.setEmail(email);
            return userRepository.save(user);
        }
    }

    public Optional<User> findUserByUsernameAndPassword(String username, String password) {
        return userRepository.findByNicknameAndPassword(username, password);
    }

    @Transactional
    public boolean deleteUser(Integer id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return !userRepository.existsById(id);
        }
        return false;
    }
    }



## Repository
    package com.example.lab6.repositories;

    import com.example.lab6.models.User;
    import org.springframework.data.jpa.repository.JpaRepository;

    import java.util.Optional;

    public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByNicknameAndPassword(String nickname, String password);
    }




