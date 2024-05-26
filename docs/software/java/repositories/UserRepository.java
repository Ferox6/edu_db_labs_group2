package com.example.mcas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.mcas.model.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}