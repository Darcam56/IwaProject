package com.example.iwaproject.repositories;

import com.example.iwaproject.model.Band;
import com.example.iwaproject.model.Concert;
import com.example.iwaproject.model.Stage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConcertRepository extends JpaRepository<Concert, Long> {
    Concert findById(long id);
    List<Concert> findByStageContaining(Stage stage);
    List<Concert> findByBandContaining(Band band);
}
