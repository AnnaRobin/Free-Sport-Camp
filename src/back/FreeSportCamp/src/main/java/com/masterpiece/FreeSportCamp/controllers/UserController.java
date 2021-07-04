package com.masterpiece.FreeSportCamp.controllers;

import java.util.HashMap;

import javax.validation.Valid;

import org.springframework.http.HttpEntity;
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

/**
 * @author Anna Cuilhé A collection of resources ({@code User}s). Exposes
 *         endpoints in order to create and update resources.
 */
@Validated // group validation
@RestController // defines this class as a Rest controller
@RequestMapping("/user") // root segment defining the collection
public class UserController {

	/**
	 * Service is injected by Spring during startup of the application
	 */
	private final UserService userService;

	/**
	 * Creates a new {@code UserController} with given injected service.
	 * 
	 * @param userService is an injected {@code UserService}
	 *
	 */
	protected UserController(UserService userService) {
		this.userService = userService;
	}

	/**
	 * Endpoint to create a resource (user) with given inputs.
	 * 
	 * @param userDto : the inputs of the Rest client
	 */
	// {@code ReponseEntity}: extension of {@link HttpEntity} that adds a {@link HttpStatus} status code.
	// Used in {@code RestTemplate} as well {@code @Controller} methods.
	@PostMapping
	public ResponseEntity create(@Valid @RequestBody UserDto userDto) {

		userService.create(userDto);
		HashMap<String, String> response = new HashMap<String, String>();
		response.put("message", "success");
		return new ResponseEntity(response, HttpStatus.CREATED);
	}

	/**
	 * Endpoint to update a resource (password) with given inputs.
	 * 
	 * @param passwordDto : the inputs of the Rest client
	 */
	@PostMapping("/password")
	public ResponseEntity updatePassword(@Valid @RequestBody PasswordDto passwordDto) {
		try {
			userService.update(passwordDto);
			return ResponseEntity.ok().build(); // == new ResponseEntity("", HttpStatus.OK)
		} catch (Exception err) {
			return ResponseEntity.badRequest().build(); // == new ResponseEntity("", HttpStatus.BAD_REQUEST)
		}
	}
}
