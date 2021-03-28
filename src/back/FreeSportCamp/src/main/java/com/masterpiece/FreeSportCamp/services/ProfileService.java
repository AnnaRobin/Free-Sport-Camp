package com.masterpiece.FreeSportCamp.services;

import com.masterpiece.FreeSportCamp.dtos.ProfileDto;
import com.masterpiece.FreeSportCamp.dtos.ProfileViewDto;
import com.masterpiece.FreeSportCamp.dtos.PublicProfileViewDto;

public interface ProfileService {
	
	ProfileViewDto get();
	PublicProfileViewDto getPublic(Long userId);
	void update (ProfileDto dto);
	void delete();
}
