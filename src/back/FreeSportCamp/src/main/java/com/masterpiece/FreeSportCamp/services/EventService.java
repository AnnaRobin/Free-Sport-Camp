package com.masterpiece.FreeSportCamp.services;

import java.util.List;

import com.masterpiece.FreeSportCamp.dtos.CriteriaViewDto;
import com.masterpiece.FreeSportCamp.dtos.EventViewDto;
import com.masterpiece.FreeSportCamp.dtos.SearchDto;


public interface EventService {
	
	CriteriaViewDto get();
	
	 List<EventViewDto> getAll(SearchDto dto);
	 
	 List<EventViewDto> getAll(Long cityId, Long sportId, Long levelId, Long timeId);

}
