package com.example.iwaproject.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Stage {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "stage")
	private List<Concert> concerts;

	@ManyToOne
	private Festival festival;

	public Stage(){}

	public Stage(String name) {
		this.name = name;
		this.concerts = new ArrayList<>();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<Concert> getConcerts() {
		return concerts;
	}

	public void setConcerts(List<Concert> concerts) {
		this.concerts = concerts;
	}
	
	public void addConcert(Concert concert) {
		this.concerts.add(concert);
	}
	
	public void removeConcert(Concert concert) {
		this.concerts.remove(concert);
	}

	public void setFestival(Festival festival){
		if (this.festival != null){
			this.festival.removeStage(this);
		}
		this.festival = festival;
		if (this.festival != null){
			this.festival.addStage(this);
		}
	}

	public Festival getFestival() {
		return festival;
	}
}
