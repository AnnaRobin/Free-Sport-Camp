package com.masterpiece.FreeSportCamp.dtos;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

import com.masterpiece.FreeSportCamp.entities.User;


public interface EventViewDto {
	
	Long getId(); 
	
	LocalDate getAppointment();
	
	String getDescription(); 
	
	//String getCityName();
	
	LocalTime getTime();
	
	String getLevelName();
	
	String getSportName();
	
	String getOrganizerUserName();
	
	String getOrganizerPhoneNumber();
	
	
	
}
