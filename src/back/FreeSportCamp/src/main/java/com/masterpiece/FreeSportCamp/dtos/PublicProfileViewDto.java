package com.masterpiece.FreeSportCamp.dtos;

import java.time.LocalDate;

import com.masterpiece.FreeSportCamp.config.SecurityHelper;
import com.masterpiece.FreeSportCamp.entities.Sex;

public interface PublicProfileViewDto {
	public Long getId();
	
	public String getUserName();
		
	public String getPresentation();
	
	public Long getCityId();
	public String getCityName();
	public Sex getSex();
	public LocalDate getBirthDate();
	default public Boolean getIsOwner() {
		return getId() == SecurityHelper.getUserId();
	}
}
