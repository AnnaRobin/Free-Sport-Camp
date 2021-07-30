package com.masterpiece.FreeSportCamp.services;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.masterpiece.FreeSportCamp.dtos.UserDto;
import com.masterpiece.FreeSportCamp.dtos.PasswordDto;
import com.masterpiece.FreeSportCamp.dtos.UserInfoDto;

public interface UserService extends UserDetailsService {
	
	 UserInfoDto getCurrentUserInfo(Long id);
	
	 void create (UserDto dto);
	 void update(PasswordDto dto);
	 boolean uniqueName(String userName);
	 boolean uniqueMail(String email);
	 
}
