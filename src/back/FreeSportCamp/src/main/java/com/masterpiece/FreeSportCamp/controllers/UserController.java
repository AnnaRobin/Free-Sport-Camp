package com.masterpiece.FreeSportCamp.controllers;

import java.util.HashMap;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.masterpiece.FreeSportCamp.dtos.UserDto;
import com.masterpiece.FreeSportCamp.dtos.PasswordDto;

import com.masterpiece.FreeSportCamp.services.UserService;

@Validated
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
	
	@PostMapping("/password")
	public ResponseEntity updatePassword(@Valid @RequestBody PasswordDto passwordDto) {
		try {
			userService.update(passwordDto);
			return ResponseEntity.ok().build();
		}
		catch(Exception err) {
			return ResponseEntity.badRequest().build();
		}
	}
}
