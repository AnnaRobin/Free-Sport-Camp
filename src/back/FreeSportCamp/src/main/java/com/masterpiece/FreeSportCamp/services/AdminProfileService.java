package com.masterpiece.FreeSportCamp.services;

import org.springframework.data.domain.Page;

import com.masterpiece.FreeSportCamp.dtos.UserListViewDto;

public interface AdminProfileService {
	
	Page<UserListViewDto> getAllUsers(int page, int size);
	void delete(Long id);


}
