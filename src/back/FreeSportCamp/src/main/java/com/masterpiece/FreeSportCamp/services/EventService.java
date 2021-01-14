package com.masterpiece.FreeSportCamp.services;

import java.util.List;

import com.masterpiece.FreeSportCamp.dtos.CriteriaViewDto;
import com.masterpiece.FreeSportCamp.dtos.EventCreatorDto;
import com.masterpiece.FreeSportCamp.dtos.EventDto;
import com.masterpiece.FreeSportCamp.dtos.IdentifierDto;
import com.masterpiece.FreeSportCamp.dtos.SearchDto;


public interface EventService {

	CriteriaViewDto get();

	List<EventDto> getAll(SearchDto dto);

	List<EventDto> getAll(Long cityId, Long sportId, Long levelId, Long timeId);
	List<EventDto> getSubscribed();
	List<String> getSubscribers(Long eventId);
	IdentifierDto create( EventCreatorDto dto);

	void subscribe(Long eventId);
	void unsubscribe(Long eventId);

}
