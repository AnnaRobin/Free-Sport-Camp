package com.masterpiece.FreeSportCamp.services;

import com.masterpiece.FreeSportCamp.dtos.UserDto;

public interface MemberService {
	void create (UserDto dto);
	Boolean alreadyExistsUserName(String userName);
	Boolean alreadyExistsEmail(String email);
}
