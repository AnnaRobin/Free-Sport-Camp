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

/**
 * @author Anna Cuilhé A collection of resources ({@code Event}s). Exposes
 *         endpoints in order to create, update, delete and retrieve resources.
 *
 */
@Validated // group validation
@RestController // defines this class as a Rest controller
@RequestMapping("/event") // root segment defining the collection
public class EventController {

	/**
	 * Service is injected by Spring during startup of the application
	 */
	private final EventService service;

	/**
	 * Creates a new {@code EventController} with given injected service.
	 * 
	 * @param service an injected {@code eventService}
	 */
	protected EventController(EventService service) {
		this.service = service;
	}

	/**
	 * Endpoint to retrieve a view of a resource (event for edition)
	 * <p>
	 * Accessible for the creator of the event
	 * 
	 * @param eventId
	 * 
	 */

	@GetMapping("/getForEdition")
	protected ResponseEntity<EventEditorViewDto> getForEdition(@RequestParam("id") @NotNull @Min(1) Long eventId) {
		if (!service.isOwner(new EventEditorDto(eventId))) {
			return new ResponseEntity<EventEditorViewDto>(HttpStatus.FORBIDDEN);
		} else {
			return new ResponseEntity<EventEditorViewDto>(service.getForEdition(eventId), HttpStatus.OK);
		}
	}

	/**
	 * Endpoint to retrieve a resource (4 dropdown listes)
	 */
	@GetMapping("/options")
	protected CriteriaViewDto getOptions() {

		return service.get();
	}

	/**
	 * Endpoint to searches and retrieves all the contacts as {@code EventDto} with
	 * paging.
	 * <p>
	 * 
	 * @param cityId
	 * @param sportId
	 * @param levelId
	 * @param timeId
	 * @param page
	 * @param size
	 */
	@GetMapping("/search")
	protected Page<EventDto> getAll(@RequestParam("cityId") @NotNull @Min(1) Long cityId,
			@RequestParam("sportId") @NotNull @Min(1) Long sportId,
			@RequestParam("levelId") @NotNull @Min(1) Long levelId,
			@RequestParam("timeId") @NotNull @Min(1) Long timeId, @RequestParam("page") @NotNull @Min(0) int page,
			@RequestParam("size") @NotNull @Min(1) @Max(50) int size) {
		return service.getAll(cityId, sportId, levelId, timeId, page, size);
	}

	/**
	 * Endpoint to searches and retrieves all the events as {@code EventDto} of a
	 * user with paging.
	 * <p>
	 * 
	 * @param page
	 * @param size
	 */
	@GetMapping("/getSubscribed")
	protected Page<EventDto> getSubscribed(@RequestParam("page") int page, @RequestParam("size") int size) {
		return service.getSubscribed(page, size);
	}

	/**
	 * Endpoint to searches and retrieves all the events as {@code EventDto},
	 * created by a user with paging.
	 * <p>
	 * 
	 * @param page
	 * @param size
	 */
	@GetMapping("/getCreated")
	protected Page<EventDto> getCreated(@RequestParam("page") int page, @RequestParam("size") int size) {
		return service.getCreated(page, size);
	}

	/**
	 * Endpoint to searches and retrieve all the subscribers of an event as
	 * {@code SubscriberViewDto}
	 * 
	 * @param eventId
	 */
	@GetMapping("/getSubscribers")
	protected List<SubscriberViewDto> getSubscribers(@RequestParam("eventId") Long eventId) {
		return service.getSubscribers(eventId);
	}

	/**
	 * Endpoint to create a resource (subscription) with given id.
	 * 
	 * @param eventId: the input of the Rest client
	 */
	@PostMapping("/subscribe")
	protected ResponseEntity subscribe(@RequestParam("eventId") Long eventId) {
		if (service.subscribe(eventId)) {
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.badRequest().build();
		}
	}

	/**
	 * Endpoint to delete a resource (subscription) with given id.
	 * 
	 * @param eventId
	 */
	@DeleteMapping("/unsubscribe")
	protected ResponseEntity unsubscribe(@RequestParam("eventId") Long eventId) {
		if (service.unsubscribe(eventId)) {
			return ResponseEntity.ok().build();
		} else {
			return ResponseEntity.badRequest().build();
		}
	}

	/**
	 * Endpoint to create a resource (event) with given inputs.
	 * <p>
	 * If the event already exists (same organizer at the same time) the recreation
	 * in not possible.
	 * <p>
	 * The organizer is automatically subscribed.
	 * 
	 * @param dto: the inputs of the Rest client
	 */
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

	/**
	 * Endpoint to update a resource (event) with given inputs
	 * <p>
	 * Only the organizer can update this resource
	 * <p>
	 * If the event already exists (same organizer at the same time) the recreation
	 * is not possible.
	 * 
	 * @param dto the inputs of the Rest client
	 */
	@PutMapping("/")
	protected ResponseEntity<IdentifierDto> editEvent(@Valid @RequestBody EventEditorDto dto) {
		if (!service.isOwner(dto)) {
			return new ResponseEntity<IdentifierDto>(HttpStatus.FORBIDDEN);
		}
		if (service.alreadyExistsEvent(dto)) {
			return new ResponseEntity<IdentifierDto>(HttpStatus.CONFLICT);
		} else {
			return new ResponseEntity<IdentifierDto>(service.edit(dto), HttpStatus.OK);
		}
	}

	/**
	 * Endpoint to delete the resource (event) with given id, if exist.
	 * 
	 * @param eventId
	 */
	@DeleteMapping("/")
	protected ResponseEntity<Boolean> remove(@RequestParam("id") Long eventId) {
		if (service.remove(eventId)) {
			return new ResponseEntity<Boolean>(true, HttpStatus.OK);
		} else {
			return new ResponseEntity<Boolean>(false, HttpStatus.NOT_FOUND);
		}
	}
}
