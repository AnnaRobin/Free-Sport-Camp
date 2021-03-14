package com.masterpiece.FreeSportCamp.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.validation.constraints.Future;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

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

	public Long getSportId() {
		return sportId;
	}

	public void setSportId(Long sportId) {
		this.sportId = sportId;
	}

	public Long getLevelId() {
		return levelId;
	}

	public void setLevelId(Long levelId) {
		this.levelId = levelId;
	}

	public Long getCityId() {
		return cityId;
	}

	public void setCityId(Long cityId) {
		this.cityId = cityId;
	}

	public LocalDate getAppointment() {
		return appointment;
	}

	public void setAppointment(LocalDate appointment) {
		this.appointment = appointment;
	}

	public LocalTime getTime() {
		return time;
	}

	public void setTime(LocalTime time) {
		this.time = time;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	
}
