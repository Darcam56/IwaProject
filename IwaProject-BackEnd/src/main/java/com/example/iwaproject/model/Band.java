package com.example.iwaproject.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.CascadeType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@DiscriminatorValue("Band")
public class Band extends User{

	private String name;
	private String musicType;
	private String description;

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "band")
	private List<Concert> concerts;
	
	
	public Band() {
		super();
	}
	
	public Band(String username, String password, 
				String name, String musicType, String description) {
		super(username, password);
		this.name = name;
		this.musicType = musicType;
		this.description = description;
		this.concerts = new ArrayList<>();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMusicType() {
		return musicType;
	}

	public void setMusicType(String musicType) {
		this.musicType = musicType;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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
}
