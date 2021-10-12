package com.masterpiece.FreeSportCamp.controllers;


import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.masterpiece.FreeSportCamp.dtos.UserListViewDto;
import com.masterpiece.FreeSportCamp.services.AdminProfileService;

@RestController
@RequestMapping("/admin")
public class AdminController {
	
	
	
//	@GetMapping()
//	protected ResponseEntity<String> hello() {
//		return new ResponseEntity<>("Hello FSC", HttpStatus.OK);
//	
//	}
	
	private final AdminProfileService service;
	
	protected AdminController(AdminProfileService service) {
		this.service = service;
	};
	
	@GetMapping()
	protected Page<UserListViewDto> getAllUsers(@RequestParam("page") int page, @RequestParam("size") int size) {
	return service.getAllUsers(page, size);
	}
	
	@DeleteMapping()
	protected ResponseEntity delete(@RequestParam("id") Long id) {
	
	try {
		service.delete(id);
		return ResponseEntity.ok().build();
	} catch (Exception ex) {
		return ResponseEntity.badRequest().build();
	}
	}}
	



