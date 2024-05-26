
package com.example.mcas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.mcas.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);
}
