package com.masterpiece.FreeSportCamp.services;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.masterpiece.FreeSportCamp.dtos.CustomUserInfoDto;

public interface CustomUserDetailsService extends UserDetailsService {
	 
	 CustomUserInfoDto getCurrentUserInfo(Long id);

}
