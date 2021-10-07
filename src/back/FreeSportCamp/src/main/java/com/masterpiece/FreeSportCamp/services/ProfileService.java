package com.masterpiece.FreeSportCamp.services;

import org.springframework.data.domain.Page;

import com.masterpiece.FreeSportCamp.dtos.ProfileDto;
import com.masterpiece.FreeSportCamp.dtos.ProfileViewDto;
import com.masterpiece.FreeSportCamp.dtos.PublicProfileViewDto;
import com.masterpiece.FreeSportCamp.dtos.UserListViewDto;

public interface ProfileService {
	
	ProfileViewDto get();
	PublicProfileViewDto getPublic(Long userId);
	void update (ProfileDto dto);
	void delete();
	
	Page<UserListViewDto> getAllUsers(int page, int size);
	
}
