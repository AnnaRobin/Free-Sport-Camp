package com.masterpiece.FreeSportCamp.services;

import org.springframework.stereotype.Service;

import com.masterpiece.FreeSportCamp.dtos.MemberDto;
import com.masterpiece.FreeSportCamp.entities.Member;
import com.masterpiece.FreeSportCamp.repositoires.MemberRepository;
	@Service

public class MemberServiceImpl implements MemberService {
	private final MemberRepository memberRepository;
	
	public MemberServiceImpl(MemberRepository memberRepository) {
		super();
		this.memberRepository = memberRepository;
	}

	@Override
	public void create(MemberDto dto) {
		Member member = new Member();
		populateAndSave(dto, member);
		
	}
	private void populateAndSave (MemberDto dto, Member member) {
		member.setUserName(dto.getUserName());
		member.setPassword(dto.getPassword());
		memberRepository.save(member);
		
	}

}
