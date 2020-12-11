package com.masterpiece.FreeSportCamp.controllers;

import java.util.HashMap;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.masterpiece.FreeSportCamp.dtos.UserDto;
import com.masterpiece.FreeSportCamp.services.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
	
	
	private final UserService userService;
	
	protected UserController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping
	public ResponseEntity create(@Valid @RequestBody UserDto userDto) {
	
		userService.create(userDto);
		HashMap<String, String> response = new HashMap<String, String>();
		response.put("message","success");
		return new ResponseEntity(response, HttpStatus.CREATED);
	}
	
}
