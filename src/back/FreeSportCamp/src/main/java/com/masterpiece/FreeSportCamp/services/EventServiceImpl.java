package com.masterpiece.FreeSportCamp.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.masterpiece.FreeSportCamp.dtos.CriteriaViewDto;
import com.masterpiece.FreeSportCamp.repositories.CityRepository;
import com.masterpiece.FreeSportCamp.repositories.EventRepository;
import com.masterpiece.FreeSportCamp.repositories.LevelRepository;
import com.masterpiece.FreeSportCamp.repositories.SportRepository;
import com.masterpiece.FreeSportCamp.repositories.TimeRepository;

@Service
public class EventServiceImpl implements EventService{
	
	private final CityRepository cityRepository;
	private final LevelRepository levelRepository;
	private final SportRepository sportRepository;
	private final TimeRepository timeRepository;
	
    protected EventServiceImpl(CityRepository cityRepository,
    		LevelRepository levelRepository,
    		SportRepository sportRepository, 
    		TimeRepository timeRepository ) {
    	this.cityRepository = cityRepository;
    	this.levelRepository = levelRepository;
    	this.sportRepository = sportRepository;
    	this.timeRepository = timeRepository;
        }
	

	public CriteriaViewDto get() {
		timeRepository.getAllProjectedBy();
		
		CriteriaViewDto criterias = new CriteriaViewDto();

		criterias.setCities(cityRepository.getAllProjectedBy());
		criterias.setLevels(levelRepository.getAllProjectedBy());
		criterias.setSports(sportRepository.getAllProjectedBy());
		criterias.setTimes(timeRepository.getAllProjectedBy());

		return criterias;
	
	}
}
