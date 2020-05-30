package com.example.iwaproject.repositories;

import com.example.iwaproject.model.Festival;
import com.example.iwaproject.model.Stage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StageRepository extends JpaRepository<Stage, Long> {
    Stage findById(long id);
    List<Stage> findByFestivalContaining(Festival festival);
}
