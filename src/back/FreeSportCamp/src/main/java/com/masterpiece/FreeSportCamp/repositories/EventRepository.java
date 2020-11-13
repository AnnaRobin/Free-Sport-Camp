package com.masterpiece.FreeSportCamp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.masterpiece.FreeSportCamp.dtos.EventViewDto;
import com.masterpiece.FreeSportCamp.entities.Event;



public interface EventRepository extends JpaRepository<Event, Long>{
	List<EventViewDto> findProjectedByCityIdAndSportIdAndLevelIdAndTimeId(Long cityId, Long sportId, Long levelId, Long timeId);
}
