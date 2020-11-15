package com.masterpiece.FreeSportCamp.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.masterpiece.FreeSportCamp.dtos.CriteriaViewDto;
import com.masterpiece.FreeSportCamp.dtos.EventViewDto;
import com.masterpiece.FreeSportCamp.dtos.SearchDto;
import com.masterpiece.FreeSportCamp.services.EventService;

@CrossOrigin(origins="http://localhost:3000")
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

@GetMapping("/search")
protected List<EventViewDto> getAll(@Valid @RequestBody SearchDto dto ){
	
	return service.getAll(dto);
}
@GetMapping("/search/{cityId}/{sportId}/{levelId}/{timeId}")
protected List<EventViewDto> getAll(@Valid @PathVariable("cityId") Long cityId, @PathVariable("sportId") Long sportId, @PathVariable("levelId") Long levelId, @PathVariable("timeId") Long timeId){
	
	return service.getAll(cityId, sportId, levelId, timeId);
}
	
}


