package com.masterpiece.FreeSportCamp.dtos;

import java.time.LocalDate;
import java.time.LocalTime;


public interface EventEditorViewDto {
	
	public Long getId();
	public Long getSportId();
	public Long getLevelId();
	public Long getCityId();
	public LocalDate getAppointment();
	public LocalTime getTime();
	public String getOrganizerPhoneNumber();
	public String getDescription();
}
