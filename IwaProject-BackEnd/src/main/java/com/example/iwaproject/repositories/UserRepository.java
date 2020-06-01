package com.example.iwaproject.repositories;

import com.example.iwaproject.model.User;
import com.example.iwaproject.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Transactional
public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByRolesContaining(Role role); //Admin
    List<User> findByRolesContainingAndRolesIsNotContaining(Role role1, Role role2); //not admin
    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);
    User findById(long id);
    void deleteById(long id);
}
