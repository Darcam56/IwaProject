package com.example.iwaproject.repositories;

import com.example.iwaproject.model.FestAdmin;
import com.example.iwaproject.model.Festival;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FestivalRepository extends JpaRepository<Festival, Long> {
    Festival findById(long id);
    List<Festival> findFestivalByFestAdminContaining(FestAdmin festAdmin);
}
