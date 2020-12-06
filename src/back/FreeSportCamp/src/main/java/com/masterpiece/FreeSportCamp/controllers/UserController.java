package com.masterpiece.FreeSportCamp.controllers;

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
		if(userService.alreadyExistsUserName(userDto.getUserName())) {
			return new ResponseEntity(HttpStatus.CONFLICT);
		}

		if(userService.alreadyExistsEmail(userDto.getEmail())) {
			return new ResponseEntity(HttpStatus.CONFLICT);
		}
		userService.create(userDto);
		return new ResponseEntity(HttpStatus.CREATED);
	}
	
}
