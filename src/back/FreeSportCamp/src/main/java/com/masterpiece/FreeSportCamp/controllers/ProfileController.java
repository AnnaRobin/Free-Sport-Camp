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

@Validated
@RestController
@RequestMapping("/profile")
public class ProfileController {

	private final ProfileService service;
	
	protected ProfileController(ProfileService service) {
		this.service = service;
    }
	
	
	
	@GetMapping()
	//get personal profile
	protected ResponseEntity<ProfileViewDto> get() {
		return new ResponseEntity<ProfileViewDto>(service.get(),HttpStatus.OK);
	}
	
	@GetMapping("/public")
	//get profile
	protected ResponseEntity<PublicProfileViewDto> get(@RequestParam("userId") @NotNull @Min(1) Long userId) {
		return new ResponseEntity<PublicProfileViewDto>(service.getPublic(userId),HttpStatus.OK);
	}
	
	@PostMapping("/update")
	protected ResponseEntity update(@Valid @RequestBody ProfileDto dto) {
		try {
			service.update(dto);
			return ResponseEntity.ok().build();
		}
		catch(Exception ex){
			return ResponseEntity.badRequest().build();
		}
	}
	
	@DeleteMapping("")
	protected ResponseEntity delete() {
		try {
			service.delete();
			return ResponseEntity.ok().build();
		}
		catch(Exception ex){
			return ResponseEntity.badRequest().build();
		}
	}
}
