package com.masterpiece.FreeSportCamp.services;

import org.springframework.stereotype.Service;

import com.masterpiece.FreeSportCamp.dtos.UserDto;
import com.masterpiece.FreeSportCamp.entities.User;
import com.masterpiece.FreeSportCamp.repositories.MemberRepository;
	@Service

public class MemberServiceImpl implements MemberService {
	private final MemberRepository memberRepository;
	
	public MemberServiceImpl(MemberRepository memberRepository) {
		super();
		this.memberRepository = memberRepository;
	}

	@Override
	public void create(UserDto dto) {
		User member = new User();
		populateAndSave(dto, member);
	}
	
	public Boolean alreadyExistsUserName(String userName) {
		return memberRepository.countByUserName(userName)>0;
	}
	public Boolean alreadyExistsEmail(String Email) {
		return memberRepository.countByEmail(Email)>0;
	}
	
	private void populateAndSave (UserDto dto, User member) {
		member.setUserName(dto.getUserName());
		member.setPassword(dto.getPassword());
		member.setFullName(dto.getFullName());
		member.setEmail(dto.getEmail());
		memberRepository.save(member);
		
	}

}
