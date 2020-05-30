package com.example.iwaproject.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Concert {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm")
	@Column(columnDefinition = "TIMESTAMP")
	private LocalDateTime start;

	private double duration;

	@ManyToOne
	private Band band;

	@ManyToOne
	private Stage stage;

	public Concert(){}
	
	public Concert(LocalDateTime start, double duration, Band band) {
		this.start = start;
		this.duration = duration;
		this.band = band;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDateTime getStart() {
		return start;
	}

	public void setStart(LocalDateTime start) {
		this.start = start;
	}

	public double getDuration() {
		return duration;
	}

	public void setDuration(double duration) {
		this.duration = duration;
	}

	public Band getBand() {
		return band;
	}

	public void setBand(Band band) {
		if (this.band != null){
			this.band.removeConcert(this);
		}
		this.band = band;
		if (this.band != null){
			this.band.addConcert(this);
		}
	}

	public Stage getStage() {
		return this.stage;
	}

	public void setStage(Stage stage) {
		if (this.stage != null){
			this.stage.removeConcert(this);
		}
		this.stage = stage;
		if (this.stage != null){
			this.stage.addConcert(this);
		}
	}
	
}
