package com.example.iwaproject.restControllers;

import com.example.iwaproject.model.*;
import com.example.iwaproject.repositories.FestivalRepository;
import com.example.iwaproject.repositories.RoleRepository;
import com.example.iwaproject.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/festGoers")
public class FestGoerRESTController {

    private RoleRepository roleRepository;
    private UserRepository userRepository;
    private FestivalRepository festivalRepository;

    @Autowired
    public FestGoerRESTController(UserRepository userRepository, FestivalRepository festivalRepository,
                                  RoleRepository roleRepository){
        this.userRepository = userRepository;
        this.festivalRepository = festivalRepository;
        this.roleRepository = roleRepository;
    }

    @GetMapping
    public List<FestGoer> findAllFestGoers(){
        ArrayList<FestGoer> res = new ArrayList<>();
        ArrayList<User> tmp = (ArrayList<User>) userRepository.findAll();
        for (User user: tmp){
            if (user instanceof FestGoer){
                res.add((FestGoer) user);
            }
        }
        return res;
    }

    @GetMapping("/{id}")
    public FestGoer findFestGoer(@PathVariable("id") long id){
        return (FestGoer) userRepository.findById(id);
    }

    @GetMapping("/{username}/festivals")
    public List<Festival> findFestivalFromFestGoer(@PathVariable("username") String username){
        if (username != null) {
            FestGoer festGoer = (FestGoer) userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("Fail -> Cause: User not found."));
            return festGoer.getFestivals();
        }
        return null;
    }

    @PostMapping("/{username}/festivals/{festId}")
    public ResponseEntity<FestGoer> addFestivalFromFestGoer(@PathVariable("username") String username, @PathVariable("festId") long festId){
        if (username != null) {
            FestGoer festGoer = (FestGoer) userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("Fail -> Cause: User not found."));
            Festival fest = festivalRepository.findById(festId);

            festGoer.addFestival(fest);
            userRepository.save(festGoer);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/{id}/festivals/{festId}")
    public ResponseEntity<FestGoer> delFestivalFromFestGoer(@PathVariable("id") long id, @PathVariable("festId") long festId){
        FestGoer spec = (FestGoer) userRepository.findById(id);
        Festival fest = festivalRepository.findById(festId);

        spec.removeFestival(fest);
        userRepository.save(spec);
        //festivalRepository.save(fest);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<FestGoer> delFestGoer(@PathVariable("id") long id){
        FestGoer spec = (FestGoer) userRepository.findById(id);
        while(!spec.getFestivals().isEmpty()){
            Festival fest = spec.getFestivals().get(0);
            fest.removeSpectator(spec);
            festivalRepository.save(fest);
        }
        userRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity<FestGoer> delFestGoer(){
        List<FestGoer> specs = findAllFestGoers();
        while(!specs.isEmpty()){
            delFestGoer(specs.get(0).getId());
            specs.remove(0);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<FestGoer> updatePartOfFestGoer(@RequestBody Map<String, Object> updates, @PathVariable("id") long id){
        FestGoer spec = (FestGoer) userRepository.findById(id);
        if (spec == null){
            System.out.println("FestGoer Not Found !!!");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        partialUpdate(spec, updates);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private void partialUpdate(FestGoer spec, Map<String, Object> updates) {
        if(updates.containsKey("fistname")){
            spec.setFistname((String) updates.get("fistname"));
        }
        if(updates.containsKey("lastname")){
            spec.setLastname((String) updates.get("lastname"));
        }
        userRepository.save(spec);
    }
}
