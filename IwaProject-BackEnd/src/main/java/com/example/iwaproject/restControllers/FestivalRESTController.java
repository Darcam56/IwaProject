package com.example.iwaproject.restControllers;

import com.example.iwaproject.model.*;
import com.example.iwaproject.repositories.FestivalRepository;
import com.example.iwaproject.repositories.StageRepository;
import com.example.iwaproject.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
//@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/festivals")
public class FestivalRESTController {

    private StageRESTController stageRESTController;
    private FestivalRepository festivalRepository;
    private StageRepository stageRepository;
    private UserRepository userRepository;


    @Autowired
    public FestivalRESTController(FestivalRepository festivalRepository, UserRepository userRepository,
                              StageRepository stageRepository, StageRESTController stageRESTController){
        this.stageRESTController = stageRESTController;
        this.festivalRepository = festivalRepository;
        this.userRepository = userRepository;
        this.stageRepository = stageRepository;
    }

    @GetMapping
    public List<Festival> findAllFestivals(){
        return festivalRepository.findAll();
    }

    @GetMapping("/{id}")
    public Festival findFestival(@PathVariable("id") long id){
        return festivalRepository.findById(id);
    }

    @GetMapping("/{id}/stages")
    public List<Stage> findStagesFromFestival(@PathVariable("id") long id){
        return festivalRepository.findById(id).getStages();
    }

    @PostMapping("/{id}/stages")
    public Stage addStageFromFestival(@RequestBody Stage stage, @PathVariable("id") long id){
        Festival festival = festivalRepository.findById(id);
        stage.setFestival(festival);
        stageRepository.save(stage);
        festivalRepository.save(festival);
        return stage;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Festival> delFestival(@PathVariable("id") long id){
        //TODO Doutes sur la fonction
        Festival festival = festivalRepository.findById(id);
        if (festival == null){
            System.out.println("Festival Not Found !!!");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        while (!festival.getStages().isEmpty()){
            stageRESTController.delStage(festival.getStages().get(0).getId());
        }
        festival.setFestAdmin(null);
        while (!festival.getSpectators().isEmpty()){
            FestGoer spec = festival.getSpectators().get(0);
            spec.removeFestival(festival);
            userRepository.save(spec);
        }
        festivalRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity<Festival> delFestival(){
        List<Festival> fests = festivalRepository.findAll();
        while(!fests.isEmpty()){
            delFestival(festivalRepository.findAll().get(0).getId());
            fests = festivalRepository.findAll();
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Festival> updateFestival(@RequestBody Festival festival, @PathVariable("id") long id){
        festival.setId(id); //Not working because of Hibernate
        festivalRepository.save(festival);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping
    public ResponseEntity<Festival> updateFestival(@RequestBody List<Festival> festivals){
        festivalRepository.deleteAll();
        for (Festival festival : festivals) {
            festivalRepository.save(festival);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Festival> updatePartOfFestival(@RequestBody Map<String, Object> updates, @PathVariable("id") long id){
        Festival festival = festivalRepository.findById(id);
        if (festival == null){
            System.out.println("Festival Not Found !!!");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        partialUpdate(festival, updates);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private void partialUpdate(Festival festival, Map<String, Object> updates) {
        //TODO
        if(updates.containsKey("festivalName")){
            festival.setFestivalName((String) updates.get("festivalName"));
        }
        festivalRepository.save(festival);
    }
}
