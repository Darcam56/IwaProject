package com.example.iwaproject.restControllers;

import com.example.iwaproject.model.Role;
import com.example.iwaproject.model.RoleName;
import com.example.iwaproject.model.User;
import com.example.iwaproject.repositories.RoleRepository;
import com.example.iwaproject.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
//@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/admins")
public class AdminRESTController {

    private UserRepository userRepository;
    private RoleRepository roleRepository;

    @Autowired
    public AdminRESTController(UserRepository userRepository, RoleRepository roleRepository){
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @GetMapping
    public List<User> findAllAdmins(){
        Role admin = roleRepository.findByName(RoleName.ROLE_ADMIN)
                .orElseThrow(() -> new RuntimeException("ROLE_ADMIN " + RoleName.ROLE_ADMIN + " not found"));
        return userRepository
                .findByRolesContaining(admin);
    }

    @GetMapping("/{id}")
    public User findAdmin(@PathVariable("id") long id){
        return userRepository.findById(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<User> delAdmin(@PathVariable("id") long id){
        User admin = userRepository.findById(id);
        if (admin == null){
            System.out.println("Admin Not Found !!!");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        userRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity<User> delAdmin(){
        userRepository.deleteAll();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<User> updatePartOfAdmin(@RequestBody Map<String, Object> updates, @PathVariable("id") long id){
        User admin = userRepository.findById(id);
        if (admin == null){
            System.out.println("Admin Not Found !!!");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        partialUpdate(admin, updates);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private void partialUpdate(User admin, Map<String, Object> updates) {
        if(updates.containsKey("username")){
            admin.setUsername((String) updates.get("username"));
        }
        userRepository.save(admin);
    }
}
