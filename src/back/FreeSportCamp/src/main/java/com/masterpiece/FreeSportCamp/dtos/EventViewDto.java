package com.masterpiece.FreeSportCamp.dtos;

import java.time.LocalDateTime;

import com.masterpiece.FreeSportCamp.entities.City;
import com.masterpiece.FreeSportCamp.entities.Level;
import com.masterpiece.FreeSportCamp.entities.Sport;
import com.masterpiece.FreeSportCamp.entities.Time;
import com.masterpiece.FreeSportCamp.entities.User;



public interface EventViewDto {
	
	Long getId(); 
	
	LocalDateTime getAppointment();
	
	String getDescription(); 
	
	String getCityName();
	
	String getTimeName();
	
	String getLevelName();
	
	String getSportName();
	
	String getOrganizerUserName();
	
	String getOrganizerPhoneNumber();
	
	
	
}
