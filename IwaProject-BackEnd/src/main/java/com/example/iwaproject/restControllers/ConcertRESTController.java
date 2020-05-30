package com.example.iwaproject.restControllers;

import com.example.iwaproject.model.Band;
import com.example.iwaproject.model.Concert;
import com.example.iwaproject.model.FestAdmin;
import com.example.iwaproject.model.Stage;
import com.example.iwaproject.repositories.ConcertRepository;
import com.example.iwaproject.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
//@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/concerts")
public class ConcertRESTController {

    private ConcertRepository concertRepository;
    private UserRepository userRepository;


    @Autowired
    public ConcertRESTController(ConcertRepository concertRepository, UserRepository userRepository){
        this.concertRepository = concertRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Concert> findAllConcerts(){
        return concertRepository.findAll();
    }

    @GetMapping("/{id}")
    public Concert findConcert(@PathVariable("id") long id){
        return concertRepository.findById(id);
    }

    @GetMapping("/{id}/band")
    public Band findBandFromConcert(@PathVariable("id") long id){
        return concertRepository.findById(id).getBand();
    }

    @GetMapping("/{id}/stage")
    public Stage findStageFromConcert(@PathVariable("id") long id){
        return concertRepository.findById(id).getStage();
    }

    @PostMapping("/{id}/band/{bandId}")
    public ResponseEntity<Concert> addBandToConcert(@PathVariable("id") long id, @PathVariable("bandId") long bandId){
        Concert concert = concertRepository.findById(id);
        Band band = (Band) userRepository.findById(bandId);
        for (Concert con: band.getConcerts()){
            if(con.getStart().toLocalDate().equals(concert.getStart().toLocalDate())){
                return new ResponseEntity<>(HttpStatus.CONFLICT);
            }
        }
        concert.setBand(band);
        concertRepository.save(concert);
        userRepository.save(band);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Concert> delConcert(@PathVariable("id") long id){
        //TODO Doutes sur la fonction
        Concert concert = concertRepository.findById(id);
        if (concert == null){
            System.out.println("Concert Not Found !!!");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        concert.setBand(null);
        concert.setStage(null);
        concertRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity<Concert> delConcert(){
        List<Concert> concerts = concertRepository.findAll();
        while(!concerts.isEmpty()){
            delConcert(concertRepository.findAll().get(0).getId());
            concerts = concertRepository.findAll();
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Concert> updateConcert(@RequestBody Concert concert, @PathVariable("id") long id){
        concert.setId(id); //Not working because of Hibernate
        concertRepository.save(concert);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping
    public ResponseEntity<Concert> updateConcert(@RequestBody List<Concert> concerts){
        concertRepository.deleteAll();
        for (Concert concert : concerts) {
            concertRepository.save(concert);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Concert> updatePartOfConcert(@RequestBody Map<String, Object> updates, @PathVariable("id") long id){
        Concert concert = concertRepository.findById(id);
        if (concert == null){
            System.out.println("Concert Not Found !!!");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        partialUpdate(concert, updates);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private void partialUpdate(Concert concert, Map<String, Object> updates) {
        //TODO
        concertRepository.save(concert);
    }
}
