package com.example.iwaproject.restControllers;

import com.example.iwaproject.model.*;
import com.example.iwaproject.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
//@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/festAdmins")
public class FestAdminRESTController {

    private RoleRepository roleRepository;
    private UserRepository userRepository;
    private FestivalRepository festivalRepository;
    private FestivalRESTController festivalRESTController;

    @Autowired
    public FestAdminRESTController(UserRepository userRepository,  FestivalRepository festivalRepository,
                                   FestivalRESTController festivalRESTController, RoleRepository roleRepository){
        this.userRepository = userRepository;
        this.festivalRepository = festivalRepository;
        this.festivalRESTController = festivalRESTController;
        this.roleRepository = roleRepository;
    }

    @GetMapping
    public List<FestAdmin> findAllFestAdmins(){
        ArrayList<FestAdmin> res = new ArrayList<>();
        ArrayList<User> tmp = (ArrayList<User>) userRepository.findAll();
        for (User user: tmp){
            if (user instanceof FestAdmin){
                res.add((FestAdmin) user);
            }
        }
        return res;
    }

    @GetMapping("/{id}")
    public FestAdmin findFestAdmin(@PathVariable("id") long id){
        return (FestAdmin) userRepository.findById(id);
    }

    @GetMapping("/{id}/festivals")
    public List<Festival> findFestivalFromFestAdmin(@RequestBody Festival fest, @PathVariable("id") long id){
        FestAdmin festAdmin = (FestAdmin) userRepository.findById(id);
        return festivalRepository.findFestivalByFestAdminContaining(festAdmin);
    }

    @PostMapping
    public FestAdmin addFestAdmin(@RequestBody FestAdmin admin){
        /*TODO enlever le role */
        Role role = roleRepository.findByName(RoleName.ROLE_ORG)
                .orElseThrow(() -> new RuntimeException("ROLE_ORG " + RoleName.ROLE_ORG + " not found"));
        Set<Role> roles = new HashSet<>(); roles.add(role); admin.setRoles(roles);

        userRepository.save(admin);
        return admin;
    }

    @PostMapping("/{id}/festivals")
    public Festival addFestivalFromFestAdmin(@RequestBody Festival fest, @PathVariable("id") long id){
        FestAdmin festAdmin = (FestAdmin) userRepository.findById(id);
        fest.setFestAdmin(festAdmin);
        userRepository.save(festAdmin);
        festivalRepository.save(fest);
        return fest;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<FestAdmin> delFestAdmin(@PathVariable("id") long id){
        FestAdmin admin = (FestAdmin) userRepository.findById(id);
        if (admin == null){
            System.out.println("FestAdmin Not Found !!!");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        while (!admin.getFestivals().isEmpty()){
            festivalRESTController.delFestival(admin.getFestivals().get(0).getId());
        }
        userRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity<FestAdmin> delFestAdmin(){
        List<FestAdmin> admins = findAllFestAdmins();
        while(!admins.isEmpty()){
            delFestAdmin(admins.get(0).getId());
            admins.remove(0);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<FestAdmin> updatePartOfFestAdmin(@RequestBody Map<String, Object> updates, @PathVariable("id") long id){
        FestAdmin admin = (FestAdmin) userRepository.findById(id);
        if (admin == null){
            System.out.println("FestAdmin Not Found !!!");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        partialUpdate(admin, updates);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private void partialUpdate(FestAdmin admin, Map<String, Object> updates) {
        if(updates.containsKey("username")){
            admin.setUsername((String) updates.get("username"));
        }
        userRepository.save(admin);
    }
}
