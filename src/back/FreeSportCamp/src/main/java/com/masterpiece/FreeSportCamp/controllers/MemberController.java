package com.masterpiece.FreeSportCamp.controllers;

import javax.validation.Valid;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.masterpiece.FreeSportCamp.dtos.MemberDto;
import com.masterpiece.FreeSportCamp.services.MemberService;

import ch.qos.logback.core.net.server.Client;

@RestController
@RequestMapping("/members")
public class MemberController {
	
	private final MemberService service;
	
	protected MemberController(MemberService service) {
		this.service = service;
	}
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping
	protected void create(@Valid @RequestBody MemberDto dto) {
		
		service.create(dto);
		
	}
	

}
