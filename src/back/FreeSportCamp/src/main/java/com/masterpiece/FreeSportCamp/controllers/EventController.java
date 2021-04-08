package com.masterpiece.FreeSportCamp.controllers;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.masterpiece.FreeSportCamp.dtos.CriteriaViewDto;
import com.masterpiece.FreeSportCamp.dtos.EventCreatorDto;
import com.masterpiece.FreeSportCamp.dtos.EventDto;
import com.masterpiece.FreeSportCamp.dtos.EventEditorDto;
import com.masterpiece.FreeSportCamp.dtos.EventEditorViewDto;
import com.masterpiece.FreeSportCamp.dtos.IdentifierDto;
import com.masterpiece.FreeSportCamp.dtos.SubscriberViewDto;
import com.masterpiece.FreeSportCamp.services.EventService;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;

@Validated
@RestController
@RequestMapping("/event")
public class EventController {

	private final EventService service;

	protected EventController(EventService service) {
		this.service = service;
	}
		
	@GetMapping("/getForEdition")
	protected ResponseEntity<EventEditorViewDto> getForEdition(@RequestParam("id") @NotNull @Min(1) Long eventId){
		if(!service.isOwner(new EventEditorDto(eventId))) {
			return new ResponseEntity<EventEditorViewDto>(HttpStatus.FORBIDDEN);
		}
		else {
			return new ResponseEntity<EventEditorViewDto>(service.getForEdition(eventId),HttpStatus.OK);
		}		
	}	
	@GetMapping("/options")
	protected CriteriaViewDto getOptions() {

		return service.get();
	}	
	@GetMapping("/search")
	protected Page<EventDto> getAll(@RequestParam("cityId") @NotNull @Min(1) Long cityId,
			@RequestParam("sportId") @NotNull @Min(1) Long sportId,
			@RequestParam("levelId") @NotNull @Min(1) Long levelId,
			@RequestParam("timeId") @NotNull @Min(1) Long timeId, @RequestParam("page") @NotNull @Min(0) int page,
			@RequestParam("size") @NotNull @Min(1) @Max(50) int size) {
		return service.getAll(cityId, sportId, levelId, timeId, page, size);
	}
	@GetMapping("/getSubscribed")
	protected Page<EventDto> getSubscribed(@RequestParam("page") int page, @RequestParam("size") int size) {
		return service.getSubscribed(page, size);
	}
	@GetMapping("/getCreated")
	protected Page<EventDto> getCreated(@RequestParam("page") int page, @RequestParam("size") int size) {
		return service.getCreated(page, size);
	}
	@GetMapping("/getSubscribers")
	protected List<SubscriberViewDto> getSubscribers(@RequestParam("eventId") Long eventId) {
		return service.getSubscribers(eventId);
	}
	@PostMapping("/subscribe")
	protected ResponseEntity subscribe(@RequestParam("eventId") Long eventId) {
		if(service.subscribe(eventId)) {
			return ResponseEntity.ok().build();
		}
		else {
			return ResponseEntity.badRequest().build();
		}
	}
	@DeleteMapping("/unsubscribe")
	protected ResponseEntity unsubscribe(@RequestParam("eventId") Long eventId) {
		if(service.unsubscribe(eventId)) {
			return ResponseEntity.ok().build();
		}
		else {
			return ResponseEntity.badRequest().build();
		}
	}
	@PostMapping("/")
	protected ResponseEntity<IdentifierDto> createEvent(@Valid @RequestBody EventCreatorDto dto) {
		if (service.alreadyExistsEvent(dto)) {
			return new ResponseEntity<IdentifierDto>(HttpStatus.CONFLICT);
		} else {
			IdentifierDto viewDto = service.create(dto);
			service.subscribe(viewDto.getId());
			return new ResponseEntity<IdentifierDto>(viewDto, HttpStatus.CREATED);
		}
	}	
	@PutMapping("/")
	protected ResponseEntity<IdentifierDto> editEvent(@Valid @RequestBody EventEditorDto dto) {
		if(!service.isOwner(dto)) {
			return new ResponseEntity<IdentifierDto>(HttpStatus.FORBIDDEN);
		}
		if (service.alreadyExistsEvent(dto)) {
			return new ResponseEntity<IdentifierDto>(HttpStatus.CONFLICT);
		} else {
			return new ResponseEntity<IdentifierDto>(service.edit(dto), HttpStatus.OK);
		}
	}
	@DeleteMapping("/")
	protected ResponseEntity<Boolean> remove(@RequestParam("id") Long eventId) {
		if(service.remove(eventId)) {
			return new ResponseEntity<Boolean>(true, HttpStatus.OK);
		}
		else {
			return new ResponseEntity<Boolean>(false, HttpStatus.NOT_FOUND);
		}		
	}
}
