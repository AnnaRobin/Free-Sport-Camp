package com.masterpiece.FreeSportCamp.dtos;

import com.masterpiece.FreeSportCamp.config.SecurityHelper;

public interface PublicProfileViewDto {
	public Long getId();
	
	public String getUserName();
		
	public String getPresentation();
	
	public Long getCityId();
	public String getCityName();
	
	default public Boolean getIsOwner() {
		return getId() == SecurityHelper.getUserId();
	}
}
