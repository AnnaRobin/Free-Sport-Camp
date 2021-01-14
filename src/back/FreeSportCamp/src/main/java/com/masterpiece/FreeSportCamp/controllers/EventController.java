package com.masterpiece.FreeSportCamp.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.masterpiece.FreeSportCamp.dtos.CriteriaViewDto;
import com.masterpiece.FreeSportCamp.dtos.EventCreatorDto;
import com.masterpiece.FreeSportCamp.dtos.EventDto;
import com.masterpiece.FreeSportCamp.dtos.IdentifierDto;
import com.masterpiece.FreeSportCamp.services.EventService;

import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import com.masterpiece.FreeSportCamp.config.ResourceServerConfig;
import org.springframework.security.access.prepost.PreAuthorize;

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
protected List<EventDto> getAll(@Valid @RequestParam("cityId") Long cityId, @RequestParam("sportId") Long sportId, @RequestParam("levelId") Long levelId, @RequestParam("timeId") Long timeId){
	return service.getAll(cityId, sportId, levelId, timeId);
}

@GetMapping("/getSubscribed")
protected List<EventDto> getSubscribed(){
	return service.getSubscribed();
}



@GetMapping("/getSubscribers")
protected List<String> getSubscribers(@Valid @RequestParam("eventId") Long eventId){
	return service.getSubscribers(eventId);
}
@PostMapping("/subscribe")
protected void subscribe(@Valid @RequestParam("eventId") Long eventId) {
	service.subscribe(eventId);
}
@PostMapping("/unsubscribe")
protected void unsubscribe(@Valid @RequestParam("eventId") Long eventId) {
	service.unsubscribe(eventId);
}

@PostMapping("/create")
protected IdentifierDto createEvent (@Valid @RequestBody EventCreatorDto dto) {
//	if(service.alreadyExistsEvent(dto.getEvent()){
//	 return new (HttpStatus.CONFLICT);
 	
		return service.create(dto);
	
}
}



