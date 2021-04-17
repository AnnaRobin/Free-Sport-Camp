package com.masterpiece.FreeSportCamp.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.masterpiece.FreeSportCamp.dtos.CriteriaViewDto;
import com.masterpiece.FreeSportCamp.dtos.EventCreatorDto;
import com.masterpiece.FreeSportCamp.dtos.EventDto;
import com.masterpiece.FreeSportCamp.dtos.EventEditorDto;
import com.masterpiece.FreeSportCamp.dtos.EventEditorViewDto;
import com.masterpiece.FreeSportCamp.dtos.IdentifierDto;
import com.masterpiece.FreeSportCamp.dtos.SearchDto;
import com.masterpiece.FreeSportCamp.dtos.SubscriberViewDto;
import com.masterpiece.FreeSportCamp.entities.City;
import com.masterpiece.FreeSportCamp.entities.Event;
import com.masterpiece.FreeSportCamp.entities.Level;
import com.masterpiece.FreeSportCamp.entities.Sport;
import com.masterpiece.FreeSportCamp.entities.Time;
import com.masterpiece.FreeSportCamp.entities.User;
import com.masterpiece.FreeSportCamp.repositories.CityRepository;
import com.masterpiece.FreeSportCamp.repositories.EventRepository;
import com.masterpiece.FreeSportCamp.repositories.LevelRepository;
import com.masterpiece.FreeSportCamp.repositories.SportRepository;
import com.masterpiece.FreeSportCamp.repositories.TimeRepository;
import com.masterpiece.FreeSportCamp.repositories.UserRepository;
import com.masterpiece.FreeSportCamp.config.SecurityHelper;

import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

@Service
@Transactional
public class EventServiceImpl  extends AbstractService implements EventService{
	
	private final CityRepository cityRepository;
	private final LevelRepository levelRepository;
	private final SportRepository sportRepository;
	private final TimeRepository timeRepository;
	private final EventRepository eventRepository;
	private final UserRepository userRepository;
	
    protected EventServiceImpl(CityRepository cityRepository,
    		LevelRepository levelRepository,
    		SportRepository sportRepository, 
    		TimeRepository timeRepository, 
    		EventRepository eventRepository,
    		UserRepository userRepository) {
    	this.cityRepository = cityRepository;
    	this.levelRepository = levelRepository;
    	this.sportRepository = sportRepository;
    	this.timeRepository = timeRepository;
    	this.eventRepository = eventRepository;
    	this.userRepository = userRepository;
        }
	

	public CriteriaViewDto get() {
	
		
		CriteriaViewDto criterias = new CriteriaViewDto();

		criterias.setCities(cityRepository.getAllProjectedBy());
		criterias.setLevels(levelRepository.getAllProjectedBy());
		criterias.setSports(sportRepository.getAllProjectedBy());
		criterias.setTimes(timeRepository.getAllProjectedBy());

		return criterias;
	
	}
	
 public Boolean alreadyExistsEvent(EventCreatorDto dto) {
	 return eventRepository.existsByOrganizerAndAppointmentAndTime(new User(SecurityHelper.getUserId()), dto.getAppointment(), dto.getTime());
 }
 public Boolean alreadyExistsEvent(EventEditorDto dto) {
	 return eventRepository.existsByOrganizerAndAppointmentAndTimeAndIdNot(new User(SecurityHelper.getUserId()), dto.getAppointment(), dto.getTime(), dto.getId());
 }
 public Boolean isOwner(EventEditorDto dto) {
	 return eventRepository.existsByOrganizerAndId(new User(SecurityHelper.getUserId()), dto.getId());
 }
 
 public Page<EventDto> getSubscribed(int page, int size){
	 return eventRepository.findSubscribedBy(SecurityHelper.getUserId(),PageRequest.of(page, size));
 }
 
 public Page<EventDto> getCreated(int page, int size){
	 return eventRepository.findCreatedBy(SecurityHelper.getUserId(),PageRequest.of(page, size));
 }


 public Page<EventDto> getAll(Long cityId, Long sportId, Long levelId, Long timeId, int page, int size){
	Time time = timeRepository.getById(timeId);
	return eventRepository.findProjectedBy(LocalDate.now(), cityId, sportId, levelId, time.getMinTime(), time.getMaxTime(),SecurityHelper.getUserId(),PageRequest.of(page, size));
 }
 
 public List<SubscriberViewDto> getSubscribers(Long eventId){
	 return eventRepository.findProjectedBy(eventId);
 }
 
 public Boolean subscribe(Long eventId) {
	 Optional<Event> optional = eventRepository.findById(eventId);
	 if(!optional.isEmpty()) {
		 Event event = optional.get();
		 if(event.getAppointment().isBefore(LocalDate.now())) {
			 return false;
		 }
		 event.getSubscribers().add(new User(SecurityHelper.getUserId()));
		 eventRepository.save(event);
		 return true;
	 }
	 return false;
 }
 
 public Boolean unsubscribe(Long eventId) {
	 Optional<Event> optional = eventRepository.findById(eventId);
	 if(!optional.isEmpty()) {
		 Event event = optional.get();
		 if(event.getAppointment().isBefore(LocalDate.now())) {
			 return false;
		 }
		 Optional<User> optUser = userRepository.findById(SecurityHelper.getUserId());
		 User user = optUser.get();
		 if(event.getOrganizer() != user) {
			 event.getSubscribers().remove(user);
			 eventRepository.save(event);
			 return true;
		 }
	 }
	 return false;
 }
 
 public IdentifierDto create (EventCreatorDto dto) {
	 
	 Event event = new Event();
	 
	 event.setAppointment(dto.getAppointment());
	 if(dto.getDescription() == null) {
		 event.setDescription("");
	 } 
	 else {
		 event.setDescription(Jsoup.clean(dto.getDescription(),Whitelist.none()));
	 }
	 event.setTime(dto.getTime());
	 event.setOrganizer(new User(SecurityHelper.getUserId()));
	 event.setSport(new Sport(dto.getSportId()));
	 event.setLevel(new Level(dto.getLevelId()));
	 event.setCity(new City(dto.getCityId()));
	 Event savedEvent = eventRepository.save(event);
	 
	 return new IdentifierDto(savedEvent.getId());
		
 };

 public IdentifierDto edit(EventEditorDto dto) {
	 Event event = getMapper().map(dto, Event.class);
	 event.setOrganizer(new User(SecurityHelper.getUserId()));
	 if(dto.getDescription() == null) {
		 event.setDescription("");
	 } 
	 else {
		 event.setDescription(Jsoup.clean(dto.getDescription(),Whitelist.none()));
	 }
	 Event savedEvent = eventRepository.save(event);
	 return new IdentifierDto(savedEvent.getId());
 }
 public Boolean remove(Long eventId) {
	 Optional<Event> optional = eventRepository.findById(eventId);
	 if(!optional.isEmpty()) {
		 Event event = optional.get();
		 eventRepository.delete(event);
		 return true;
	 }
	 return false;
 }
 public EventEditorViewDto getForEdition(Long eventId) {
	 return eventRepository.findProjectedById(eventId);
 }
}
