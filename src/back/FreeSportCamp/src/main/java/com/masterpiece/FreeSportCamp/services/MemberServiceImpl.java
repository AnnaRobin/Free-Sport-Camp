package com.masterpiece.FreeSportCamp.services;

import org.springframework.stereotype.Service;

import com.masterpiece.FreeSportCamp.dtos.MemberDto;
import com.masterpiece.FreeSportCamp.entities.CustomUser;
import com.masterpiece.FreeSportCamp.repositories.MemberRepository;
	@Service

public class MemberServiceImpl implements MemberService {
	private final MemberRepository memberRepository;
	
	public MemberServiceImpl(MemberRepository memberRepository) {
		super();
		this.memberRepository = memberRepository;
	}

	@Override
	public void create(MemberDto dto) {
		CustomUser member = new CustomUser();
		populateAndSave(dto, member);
	}
	
	public Boolean alreadyExistsUserName(String userName) {
		return memberRepository.countByUserName(userName)>0;
	}
	public Boolean alreadyExistsEmail(String Email) {
		return memberRepository.countByEmail(Email)>0;
	}
	
	private void populateAndSave (MemberDto dto, CustomUser member) {
		member.setUserName(dto.getUserName());
		member.setPassword(dto.getPassword());
		member.setFullName(dto.getFullName());
		member.setEmail(dto.getEmail());
		memberRepository.save(member);
		
	}

}
