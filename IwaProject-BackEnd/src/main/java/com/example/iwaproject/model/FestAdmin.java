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
@DiscriminatorValue("FestAdmin")
public class FestAdmin extends User{

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "festAdmin")
	private List<Festival> festivals;

	public FestAdmin() {
		super();
	}

	public FestAdmin(String username, String password) {
		super(username, password);
		this.festivals = new ArrayList<>();
	}

	public List<Festival> getFestivals() {
		return festivals;
	}

	public void setFestivals(List<Festival> festivals) {
		this.festivals = festivals;
	}
	
	public void addFestival(Festival festival) {
		this.festivals.add(festival);
	}
	
	public void removeFestival(Festival festival) {
		this.festivals.remove(festival);
	}
}
