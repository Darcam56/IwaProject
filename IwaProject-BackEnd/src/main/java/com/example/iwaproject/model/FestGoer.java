package com.example.iwaproject.model;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import java.util.ArrayList;
import java.util.List;

/**
 * The Class festGoer extends @see User.
 * This class represent the festival-goer (spectators) who wants to get their tickets
 */
@Entity
@DiscriminatorValue("FestGoer")
public class FestGoer extends User{
	
	/** The fistname. */
	private String fistname;
	
	/** The lastname. */
	private String lastname;
	
	/** The festivals. */
	@ManyToMany(fetch = FetchType.LAZY, mappedBy = "spectators")
	private List<Festival> festivals;

	/**
	 * Instantiates a new fest goer.
	 */
	public FestGoer() {
		super();
	}

	/**
	 * Instantiates a new fest goer.
	 *
	 * @param username the username
	 * @param password the password
	 * @param fistname the fistname
	 * @param lastname the lastname
	 */
	public FestGoer(String username, String password, 
					String fistname, String lastname) {
		super(username, password);
		this.fistname = fistname;
		this.lastname = lastname;
		this.festivals = new ArrayList<>();
	}

	/**
	 * Gets the fistname.
	 *
	 * @return the fistname
	 */
	public String getFistname() {
		return fistname;
	}

	/**
	 * Sets the fistname.
	 *
	 * @param fistname the new fistname
	 */
	public void setFistname(String fistname) {
		this.fistname = fistname;
	}

	/**
	 * Gets the lastname.
	 *
	 * @return the lastname
	 */
	public String getLastname() {
		return lastname;
	}

	/**
	 * Sets the lastname.
	 *
	 * @param lastname the new lastname
	 */
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	/**
	 * Gets the festivals.
	 *
	 * @return the festivals
	 */
	public List<Festival> getFestivals() {
		return festivals;
	}

	/**
	 * Sets the festivals.
	 *
	 * @param festivals the new festivals
	 */
	public void setFestivals(List<Festival> festivals) {
		this.festivals = festivals;
	}

	/**
	 * Adds the festival.
	 *
	 * @param festival the festival
	 */
	public void addFestival(Festival festival) {
		if (!festivals.contains(festival)) {
			this.festivals.add(festival);
			festival.addSpectator(this);
		}
	}

	/**
	 *Remove festival.
	 *
	 * @param festival the festival
	 */
	public void removeFestival(Festival festival) {
		if (festivals.contains(festival)) {
			this.festivals.remove(festival);
			festival.removeSpectator(this);
		}
	}
}
