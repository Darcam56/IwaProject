package com.example.iwaproject.restControllers;

import com.example.iwaproject.model.*;
import com.example.iwaproject.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/festAdmins")
public class FestAdminRESTController {

    private UserRepository userRepository;
    private FestivalRepository festivalRepository;
    private FestivalRESTController festivalRESTController;

    @Autowired
    public FestAdminRESTController(UserRepository userRepository,  FestivalRepository festivalRepository,
                                   FestivalRESTController festivalRESTController, RoleRepository roleRepository){
        this.userRepository = userRepository;
        this.festivalRepository = festivalRepository;
        this.festivalRESTController = festivalRESTController;
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

    @GetMapping("/{username}/festivals")
    public List<Festival> findFestivalFromFestAdmin(@PathVariable("username") String username){
        if (username != null) {
            FestAdmin festAdmin = (FestAdmin) userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("Fail -> Cause: User not found."));
            return festAdmin.getFestivals();
        }
        return null;
    }

    @PostMapping("/{username}/festivals")
    public Festival addFestivalFromFestAdmin(@RequestBody Festival fest, @PathVariable("username") String username){
        if (username != null) {
            FestAdmin festAdmin = (FestAdmin) userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("Fail -> Cause: User not found."));
            fest.setFestAdmin(festAdmin);
            festivalRepository.save(fest);
            return fest;
        }
        return null;
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
}
