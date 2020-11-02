package com.masterpiece.FreeSportCamp.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.masterpiece.FreeSportCamp.dtos.CriteriaViewDto;
import com.masterpiece.FreeSportCamp.services.EventService;

@RestController
@RequestMapping("/event")
public class EventController {
	
	private final EventService service;
	  
	  protected EventController(EventService service) {
			this.service = service;
		    }
	
@GetMapping("/options")
protected CriteriaViewDto getOptions() {
	
	
	return service.get();
	  
}
	
}


