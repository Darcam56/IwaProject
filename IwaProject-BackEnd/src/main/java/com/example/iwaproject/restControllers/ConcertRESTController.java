package com.example.iwaproject.restControllers;

import com.example.iwaproject.model.Band;
import com.example.iwaproject.model.Concert;
import com.example.iwaproject.model.Stage;
import com.example.iwaproject.repositories.ConcertRepository;
import com.example.iwaproject.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
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
        if (bandIsFree(concert.getStart(), band)){
            concert.setBand(band);
            concertRepository.save(concert);
            userRepository.save(band);
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }else{
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Concert> delConcert(@PathVariable("id") long id){
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

    @PatchMapping("/{id}")
    public ResponseEntity<Concert> updatePartOfConcert(@RequestBody Map<String, Object> updates, @PathVariable("id") long id){
        Concert concert = concertRepository.findById(id);
        if (concert == null){
            System.out.println("Concert Not Found !!!");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if (partialUpdate(concert, updates)){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else{
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
    }

    private boolean partialUpdate(Concert concert, Map<String, Object> updates) {
        if(updates.containsKey("start")){
            LocalDateTime newDate = LocalDateTime.parse((String) updates.get("start"), DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm"));
            if (bandIsFree(newDate, concert.getBand())){
                concert.setStart(newDate);
            }else{
                return false;
            }
        }if(updates.containsKey("duration")){
            LocalTime newDuration = LocalTime.parse((String) updates.get("duration"), DateTimeFormatter.ofPattern("HH:mm"));
            concert.setDuration(newDuration);
        }
        concertRepository.save(concert);
        return true;
    }

    private boolean bandIsFree(LocalDateTime newDate, Band band) {
        if (band == null) { return true; }
        for (Concert con: band.getConcerts()){
            if(con.getStart().toLocalDate().equals(newDate.toLocalDate())){
                return false;
            }
        }
        return true;
    }
}
