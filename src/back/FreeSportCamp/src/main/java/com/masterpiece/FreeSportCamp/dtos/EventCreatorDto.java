package com.masterpiece.FreeSportCamp.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

/**
 * @author Anna Cuilhé
 * A class representing a DTO in order to create an event {@code EventCreator}. 
 * Exposes getter and setter methods which will be implemented by Spring.
 *
 */
public class EventCreatorDto {
	
	@NotNull
	private Long sportId;
	
	@NotNull
	private Long levelId;
	
	@NotNull
	private Long cityId;
	
	@NotNull
	@Future
	private LocalDate appointment; 
	
	@NotNull
	private  LocalTime time;
		
	private String description;

	/**
	 * @return an Id of a sport
	 */
	public Long getSportId() {
		return sportId;
	}

	/**
	 * Allows to request a change of status of the Id of sports
	 * @param sportId
	 */
	public void setSportId(Long sportId) {
		this.sportId = sportId;
	}

	/**
	 * @return an Id of a Level
	 */
	public Long getLevelId() {
		return levelId;
	}

	/**
	 * Allows to request a change of status of the Id of levels
	 * @param levelId
	 */
	public void setLevelId(Long levelId) {
		this.levelId = levelId;
	}

	/**
	 * @return an Id of a City
	 */
	public Long getCityId() {
		return cityId;
	}

	/**
	 * Allows to request a change of status of the Id of cities
	 * @param cityId
	 */
	public void setCityId(Long cityId) {
		this.cityId = cityId;
	}

	/**
	 * @return an apppointment
	 */
	public LocalDate getAppointment() {
		return appointment;
	}

	/**
	 * Allows to request a change of status of the appointment
	 * @param appointment
	 */
	public void setAppointment(LocalDate appointment) {
		this.appointment = appointment;
	}

	/**
	 * @return a time
	 */
	public LocalTime getTime() {
		return time;
	}

	/**
	 * Allows to request a change of status of the time
	 * @param time
	 */
	public void setTime(LocalTime time) {
		this.time = time;
	}

	/**
	 * @return a description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * Allows to request a change of status of the description
	 * @param description
	 */
	public void setDescription(String description) {
		this.description = description;
	}
	
	
}
