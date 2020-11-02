package com.masterpiece.FreeSportCamp.controllers;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {
	
	private final MemberService service;
	
	protected MemberController(MemberService service) {
		this.service = service;
	}
	
	@PostMapping
	protected ResponseEntity create(@Valid @RequestBody MemberDto dto) {
		if(service.alreadyExistsUserName(dto.getUserName())) {
			return new ResponseEntity(HttpStatus.CONFLICT);
		}

		if(service.alreadyExistsEmail(dto.getEmail())) {
			return new ResponseEntity(HttpStatus.CONFLICT);
		}
		service.create(dto);
		return new ResponseEntity(HttpStatus.CREATED);
		
	}



}
