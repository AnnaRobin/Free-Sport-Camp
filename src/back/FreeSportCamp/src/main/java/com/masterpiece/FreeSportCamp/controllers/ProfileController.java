package com.masterpiece.FreeSportCamp.controllers;

import javax.validation.Valid;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.masterpiece.FreeSportCamp.dtos.ProfileDto;
import com.masterpiece.FreeSportCamp.dtos.ProfileViewDto;
import com.masterpiece.FreeSportCamp.dtos.PublicProfileViewDto;
import com.masterpiece.FreeSportCamp.services.ProfileService;

/**
 * @author Anna Cuilhé A collection of resources ({@code Profile}). Exposes
 *         endpoints in order to create, update, delete and retrieve resources.
 */
@Validated // group validation
@RestController // defines this class as a Rest controller
@RequestMapping("/profile") // root segment defining the collection
public class ProfileController {

	/**
	 * Service is injected by Spring during startup of the application
	 */
	private final ProfileService service;

	/**
	 * Creates a new {@code ProfileController} with given injected service.
	 * 
	 * @param service is an injected {@code ProfileService}
	 */
	protected ProfileController(ProfileService service) {
		this.service = service;
	}

	// {@code ReponseEntity}: extension of {@link HttpEntity} that adds a {@link
	// HttpStatus} status code.
	// Used in {@code RestTemplate} as well {@code @Controller} methods.
	/**
	 * Endpoint to retrieve a view of a resource (personal profile).
	 * @return a view of profile
	 */

	@GetMapping()
	protected ResponseEntity<ProfileViewDto> get() {
		return new ResponseEntity<ProfileViewDto>(service.get(), HttpStatus.OK);
	}

	/**
	 * Endpoint to retrieve a view of a resource (public profile).
	 * @param userId: the id of the resource to retrieve
	 * @return a view of public profile
	 */
	
	@GetMapping("/public")
	protected ResponseEntity<PublicProfileViewDto> get(@RequestParam("userId") @NotNull @Min(1) Long userId) {
		return new ResponseEntity<PublicProfileViewDto>(service.getPublic(userId), HttpStatus.OK);
	}

	/**
	 * Endpoint to update a resource (profile) with given inputs
	 * 
	 * @param dto: the inputs of the Rest client
	 */
	@PostMapping("/update")
	protected ResponseEntity update(@Valid @RequestBody ProfileDto dto) {
		try {
			service.update(dto);
			return ResponseEntity.ok().build();
		} catch (Exception ex) {
			return ResponseEntity.badRequest().build();
		}
	}

	/**
	 * Endpoint to delete the resource (profile) with given id.
	 */
	@DeleteMapping("")
	protected ResponseEntity delete() {
		try {
			service.delete();
			return ResponseEntity.ok().build();
		} catch (Exception ex) {
			return ResponseEntity.badRequest().build();
		}
	}
}
