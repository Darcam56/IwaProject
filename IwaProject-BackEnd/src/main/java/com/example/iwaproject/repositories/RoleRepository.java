package com.example.iwaproject.repositories;

import com.example.iwaproject.model.Role;
import com.example.iwaproject.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(RoleName name);
}
