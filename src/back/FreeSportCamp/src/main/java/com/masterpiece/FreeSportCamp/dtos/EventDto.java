package com.masterpiece.FreeSportCamp.dtos;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collection;
import java.util.Optional;

import com.masterpiece.FreeSportCamp.entities.Sport;
import com.masterpiece.FreeSportCamp.entities.User;
import com.masterpiece.FreeSportCamp.entities.Level;
import com.masterpiece.FreeSportCamp.config.SecurityHelper;
import com.masterpiece.FreeSportCamp.entities.City;


public class EventDto {
	
	public EventDto(Long id, LocalDate appointment, LocalTime time, String sportName, String levelName, String cityName, String phoneNumber, Long organizerId, String organizerName,String description,User me) {
		this(id,appointment,time,sportName,levelName,cityName,phoneNumber,organizerId,organizerName,description);
		this.isSubscribed = me!=null;
	}
	public EventDto(Long id, LocalDate appointment, LocalTime time, String sportName, String levelName, String cityName, String phoneNumber, Long organizerId, String organizerName,String description) {
		this.id =id;
		this.sportName = sportName;
		this.levelName = levelName;
		this.cityName = cityName;
		this.appointment = appointment;
		this.description = description;
		this.time = time;
		this.phoneNumber = phoneNumber;
		this.organizerId = organizerId;
		this.organizerName = organizerName;
		this.isOwner = SecurityHelper.getUserId() == organizerId;
	}
	
	private Long id;
	
	private String sportName;
	
	private String levelName;
	
	private String cityName;
	
	private LocalDate appointment; 
	
	private  LocalTime time;
	
	private String phoneNumber;
	
	private String description;
	
	private Long organizerId;
	
	private String organizerName;
	
	private Boolean isSubscribed;
	
	private Boolean isOwner;
	
	public Long getId() {
		return this.id;
	}
	public String getSportName() {
		return this.sportName;
	}

	public String getLevelName() {
		return this.levelName;
	}

	public String getCityName() {
		return this.cityName;
	}

	public LocalDate getAppointment() {
		return this.appointment;
	}

	public LocalTime getTime() {
		return this.time;
	}
	
	public String getOrganizerPhoneNumber() {
		return this.phoneNumber;
	}

	public String getDescription() {
		return this.description;
	}
	public Long getOrganizerId() {
		return this.organizerId;
	}
	
	public String getOrganizerUserName() {
		return this.organizerName;
	}
	public Boolean getisSubscribed(){
		return this.isSubscribed;
	}
	public void setIsSubscribed(Boolean isSubscribed) {
		this.isSubscribed = isSubscribed;
	}
	public Boolean getisOwner() {
		return this.isOwner;
	}
}
