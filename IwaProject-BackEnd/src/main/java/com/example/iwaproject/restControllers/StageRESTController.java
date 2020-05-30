package com.example.iwaproject.restControllers;

import com.example.iwaproject.model.*;
import com.example.iwaproject.model.Stage;
import com.example.iwaproject.repositories.ConcertRepository;
import com.example.iwaproject.repositories.StageRepository;
import com.example.iwaproject.repositories.StageRepository;
import com.example.iwaproject.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.TimeZone;

@RestController
//@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/stages")
public class StageRESTController {

    private ConcertRESTController concertRESTController;
    private StageRepository stageRepository;
    private ConcertRepository concertRepository;


    @Autowired
    public StageRESTController(StageRepository stageRepository, ConcertRepository concertRepository,
                               ConcertRESTController concertRESTController){
        this.concertRESTController = concertRESTController;
        this.stageRepository = stageRepository;
        this.concertRepository = concertRepository;
    }

    @GetMapping
    public List<Stage> findAllStages(){
        return stageRepository.findAll();
    }

    @GetMapping("/{id}")
    public Stage findStage(@PathVariable("id") long id){
        return stageRepository.findById(id);
    }

    @GetMapping("/{id}/concerts")
    public List<Concert> findConcertsFromStage(@PathVariable("id") long id){
        return stageRepository.findById(id).getConcerts();
    }

    @PostMapping
    public Stage addStage(@RequestBody Stage stage){
        stageRepository.save(stage);
        return stage;
    }

    @PostMapping("/{id}/concerts")
    public Concert addConcertFromStage(@RequestBody Concert concert, @PathVariable("id") long id){
        Stage stage = stageRepository.findById(id);
        concert.setStage(stage);
        concertRepository.save(concert);
        return concert;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Stage> delStage(@PathVariable("id") long id){
        //TODO Doutes sur la fonction
        Stage stage = stageRepository.findById(id);
        if (stage == null){
            System.out.println("Stage Not Found !!!");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        while (!stage.getConcerts().isEmpty()){
            concertRESTController.delConcert(stage.getConcerts().get(0).getId());
        }
        stage.setFestival(null);
        stageRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity<Stage> delStage(){
        List<Stage> stages = stageRepository.findAll();
        while(!stages.isEmpty()){
            delStage(stageRepository.findAll().get(0).getId());
            stages = stageRepository.findAll();
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Stage> updateStage(@RequestBody Stage stage, @PathVariable("id") long id){
        stage.setId(id); //Not working because of Hibernate
        stageRepository.save(stage);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping
    public ResponseEntity<Stage> updateStage(@RequestBody List<Stage> stages){
        stageRepository.deleteAll();
        for (Stage stage : stages) {
            stageRepository.save(stage);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Stage> updatePartOfStage(@RequestBody Map<String, Object> updates, @PathVariable("id") long id){
        Stage stage = stageRepository.findById(id);
        if (stage == null){
            System.out.println("Stage Not Found !!!");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        partialUpdate(stage, updates);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private void partialUpdate(Stage stage, Map<String, Object> updates) {
        //TODO
        if(updates.containsKey("name")){
            stage.setName((String) updates.get("name"));
        }
        stageRepository.save(stage);
    }
}
