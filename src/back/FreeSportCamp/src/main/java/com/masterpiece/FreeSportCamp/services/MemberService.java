package com.masterpiece.FreeSportCamp.services;

import com.masterpiece.FreeSportCamp.dtos.MemberDto;

public interface MemberService {
	void create (MemberDto dto);
	Boolean alreadyExistsUserName(String userName);
}
