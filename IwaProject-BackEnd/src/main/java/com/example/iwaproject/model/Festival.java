package com.example.iwaproject.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Festival {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String festivalName;
	private String description;

	@ManyToOne
	private FestAdmin festAdmin;

	@JsonIgnore
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name="Fest_FestGoer",
			joinColumns={@JoinColumn(name="Festival_id", referencedColumnName="id")},
			inverseJoinColumns={@JoinColumn(name="FestGoer_id", referencedColumnName="id")})
	private List<FestGoer> spectators;

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "festival")
	private List<Stage> stages;

	public Festival(){}

	public Festival(String festivalName, String desc, List<FestGoer> spectators,
					FestAdmin festAdmin, List<Stage> stages) {
		super();
		this.festivalName = festivalName;
		this.description = desc;
		this.spectators = spectators;
		this.festAdmin = festAdmin;
		this.stages = stages;
	}
	
	public Festival(String festivalName, String desc, FestAdmin festAdmin, List<Stage> stages) {
		super();
		this.festivalName = festivalName;
		this.description = desc;
		this.spectators = new ArrayList<>();
		this.festAdmin = festAdmin;
		this.stages = stages;
	}
	
	public Festival(String festivalName, String desc, FestAdmin festAdmin) {
		super();
		this.festivalName = festivalName;
		this.description = desc;
		this.spectators = new ArrayList<>();
		this.stages = new ArrayList<>();
		this.festAdmin = festAdmin;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFestivalName() {
		return festivalName;
	}

	public void setFestivalName(String festivalName) {
		this.festivalName = festivalName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public FestAdmin getFestAdmin() {
		return festAdmin;
	}

	public void setFestAdmin(FestAdmin festAdmin) {
		if (this.festAdmin != null){
			this.festAdmin.removeFestival(this);
		}
		this.festAdmin = festAdmin;
		if (this.festAdmin != null){
			this.festAdmin.addFestival(this);
		}
	}
	
	public List<FestGoer> getSpectators() {
		return spectators;
	}

	public void setSpectators(List<FestGoer> spectators) {
		this.spectators = spectators;
	}
	
	public void addSpectator(FestGoer spectator) {
		if (!spectators.contains(spectator)) {
			this.spectators.add(spectator);
			spectator.addFestival(this);
		}
	}
	
	public void removeSpectator(FestGoer spectator) {
		if (spectators.contains(spectator)) {
			this.spectators.remove(spectator);
			spectator.removeFestival(this);
		}
	}

	public List<Stage> getStages() {
		return stages;
	}

	public void setStages(List<Stage> stages) {
		this.stages = stages;
	}
	
	public void addStage(Stage stage) {
		this.stages.add(stage);
	}
	
	public void removeStage(Stage stage) {
		this.stages.remove(stage);
	}
}
