package com.example.iwaproject.restControllers;

import com.example.iwaproject.model.*;
import com.example.iwaproject.repositories.ConcertRepository;
import com.example.iwaproject.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/bands")
public class BandRESTController {

    private UserRepository userRepository;
    private ConcertRepository concertRepository;
    private ConcertRESTController concertRESTController;
    
    @Autowired
    public BandRESTController(UserRepository userRepository, ConcertRepository concertRepository,
                              ConcertRESTController concertRESTController){
        this.userRepository = userRepository;
        this.concertRepository = concertRepository;
        this.concertRESTController = concertRESTController;
    }

    @GetMapping
    public List<Band> findAllBands(){
        ArrayList<Band> res = new ArrayList<>();
        ArrayList<User> tmp = (ArrayList<User>) userRepository.findAll();
        for (User user: tmp){
            if (user instanceof Band){
                res.add((Band) user);
            }
        }
        return res;
    }

    @GetMapping("/free/{dateString}")
    public List<Band> findAllFreeBands(@PathVariable("dateString") String dateString){
        LocalDateTime date = LocalDateTime.of(LocalDate.parse(dateString, DateTimeFormatter.ofPattern("dd-MM-yyyy")),
                                              LocalTime.now());

        ArrayList<Band> res = new ArrayList<>();
        ArrayList<User> tmp = (ArrayList<User>) userRepository.findAll();
        for (User user: tmp){
            if (user instanceof Band && concertRESTController.bandIsFree(date, (Band) user)){
                res.add((Band) user);
            }
        }
        return res;
    }

    @GetMapping("/{id}")
    public Band findBand(@PathVariable("id") long id){
        return (Band) userRepository.findById(id);
    }

    @GetMapping("/{username}/concerts")
    public List<Concert> findConcertsFromStage(@PathVariable("username") String username){
        if (username != null) {
            Band band = (Band) userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("Fail -> Cause: User not found."));
            return band.getConcerts();
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Band> delBand(@PathVariable("id") long id){
        Band band = (Band) userRepository.findById(id);
        if (band == null){
            System.out.println("Band Not Found !!!");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<Concert> concerts = band.getConcerts();
        for(Concert concert : concerts){
            concert.setBand(null);
            concertRepository.save(concert);
        }
        userRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity<Band> delBand(){
        List<Band> bands = findAllBands();
        while(!bands.isEmpty()){
            delBand(bands.get(0).getId());
            bands.remove(0);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Band> updatePartOfBand(@RequestBody Map<String, Object> updates, @PathVariable("id") long id){
        Band band = (Band) userRepository.findById(id);
        if (band == null){
            System.out.println("Band Not Found !!!");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        partialUpdate(band, updates);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private void partialUpdate(Band band, Map<String, Object> updates) {
        if(updates.containsKey("name")){
            band.setName((String) updates.get("name"));
        }
        if(updates.containsKey("musicType")){
            band.setMusicType((String) updates.get("musicType"));
        }
        if(updates.containsKey("description")){
            band.setDescription((String) updates.get("description"));
        }
        userRepository.save(band);
    }
}
