package com.masterpiece.FreeSportCamp.controllers;


import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.masterpiece.FreeSportCamp.dtos.UserListViewDto;
import com.masterpiece.FreeSportCamp.services.ProfileService;

@RestController
@RequestMapping("/admin")
public class AdminController {
	
	
	
//	@GetMapping()
//	protected ResponseEntity<String> hello() {
//		return new ResponseEntity<>("Hello FSC", HttpStatus.OK);
//	
//	}
	
	private final ProfileService service;
	
	protected AdminController(ProfileService service) {
		this.service = service;
	};
	
	@GetMapping()
	protected Page<UserListViewDto> getAllUsers(@RequestParam("page") int page, @RequestParam("size") int size) {
	return service.getAllUsers(page, size);
	}
	}
	



