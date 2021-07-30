package com.masterpiece.FreeSportCamp.services;

import java.util.List;

import org.springframework.data.domain.Page;

import com.masterpiece.FreeSportCamp.dtos.CriteriaViewDto;
import com.masterpiece.FreeSportCamp.dtos.EventCreatorDto;
import com.masterpiece.FreeSportCamp.dtos.EventDto;
import com.masterpiece.FreeSportCamp.dtos.EventEditorDto;
import com.masterpiece.FreeSportCamp.dtos.EventEditorViewDto;
import com.masterpiece.FreeSportCamp.dtos.IdentifierDto;
import com.masterpiece.FreeSportCamp.dtos.SearchDto;
import com.masterpiece.FreeSportCamp.dtos.SubscriberViewDto;


public interface EventService {

	CriteriaViewDto get();
	
	Boolean alreadyExistsEvent(EventCreatorDto dto);
	Boolean alreadyExistsEvent(EventEditorDto dto);
	Boolean isOwner(EventEditorDto dto);
	Page<EventDto> getAll(Long cityId, Long sportId, Long levelId, Long timeId, int page, int size);
	Page<EventDto> getSubscribed(int page, int size);
	Page<EventDto> getCreated(int page, int size);
	List<SubscriberViewDto> getSubscribers(Long eventId);
	IdentifierDto create( EventCreatorDto dto);
	IdentifierDto edit(EventEditorDto dto);
	Boolean remove(Long eventId);
	EventEditorViewDto getForEdition(Long eventId);
	Boolean subscribe(Long eventId);
	Boolean unsubscribe(Long eventId);
}
