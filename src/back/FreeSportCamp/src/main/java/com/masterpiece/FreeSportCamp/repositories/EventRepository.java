package com.masterpiece.FreeSportCamp.repositories;

import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.masterpiece.FreeSportCamp.dtos.EventDto;
import com.masterpiece.FreeSportCamp.dtos.EventViewDto;

//import com.masterpiece.FreeSportCamp.dtos.SearchDto;
import com.masterpiece.FreeSportCamp.entities.Event;


public interface EventRepository extends JpaRepository<Event, Long>{
	@Query("SELECT new com.masterpiece.FreeSportCamp.dtos.EventDto(e.id,e.appointment,e.time,e.sport.name,e.level.name,e.city.name,o.phoneNumber,o.id, o.userName,e.description,me) FROM Event e INNER JOIN e.organizer o LEFT JOIN e.subscribers me WHERE (e.city.id = :cityId) and (e.sport.id = :sportId) and (e.level.id = :levelId) and (e.time <= :maxTime) and (e.time >= :minTime) AND (me IS NULL OR me.id = :userId) ORDER BY e.appointment ASC")
	List<EventDto> findProjectedBy(@Param("cityId") Long cityId,@Param("sportId") Long sportId, @Param("levelId")Long levelId, @Param("minTime") LocalTime minTime, @Param("maxTime") LocalTime maxTime, @Param("userId") Long userId);
	
	@Query("SELECT new com.masterpiece.FreeSportCamp.dtos.EventDto(e.id,e.appointment,e.time,e.sport.name,e.level.name,e.city.name,o.phoneNumber,o.id,o.userName,e.description,me) FROM Event e INNER JOIN e.organizer o INNER JOIN e.subscribers me WHERE (me.id = :userId) ORDER BY e.appointment ASC")
	List<EventDto> findSubscribedBy(@Param("userId") Long userId);
	
	List<EventViewDto> findProjectedByCityIdAndSportIdAndLevelIdAndTimeBetween(Long cityId, Long sportId, Long levelId, LocalTime minTime,LocalTime maxTime);
	
	@Query("SELECT s.userName FROM Event e JOIN e.subscribers s WHERE e.id = :eventId")
    List<String> findProjectedBy(@Param("eventId") Long EventId);
}
