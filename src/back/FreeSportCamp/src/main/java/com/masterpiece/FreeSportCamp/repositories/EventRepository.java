package com.masterpiece.FreeSportCamp.repositories;

import java.time.LocalTime;
import java.time.LocalDate;
import java.util.List;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.masterpiece.FreeSportCamp.dtos.EventDto;
import com.masterpiece.FreeSportCamp.dtos.EventEditorViewDto;
import com.masterpiece.FreeSportCamp.dtos.SubscriberViewDto;
import com.masterpiece.FreeSportCamp.entities.Event;
import com.masterpiece.FreeSportCamp.entities.User;


public interface EventRepository extends JpaRepository<Event, Long>{
	
	Boolean existsByOrganizerAndAppointmentAndTime(User organizer, LocalDate appointment, LocalTime time);
	Boolean existsByOrganizerAndAppointmentAndTimeAndIdNot(User organizer, LocalDate appointment, LocalTime time, Long id);
	Boolean existsByOrganizerAndId(User organizer, Long id);
	
	EventEditorViewDto findProjectedById(@Param("eventId") Long id);
	@Query("SELECT new com.masterpiece.FreeSportCamp.dtos.EventDto(e.id,e.appointment,e.time,e.sport.name,e.level.name,e.city.name,e.organizer.phoneNumber,e.organizer.id, e.organizer.userName,e.description, me.id) FROM Event e LEFT JOIN e.subscribers me ON (me.id = :userId) WHERE (e.city.id = :cityId) and (e.sport.id = :sportId) and (e.level.id = :levelId) and (e.time <= :maxTime) and (e.time >= :minTime) AND (e.appointment >= :minDate) ORDER BY e.appointment ASC, e.time ASC")
	Page<EventDto> findProjectedBy(@Param("minDate") LocalDate minDate, @Param("cityId") Long cityId,@Param("sportId") Long sportId, @Param("levelId")Long levelId, @Param("minTime") LocalTime minTime, @Param("maxTime") LocalTime maxTime,@Param("userId") Long userId, Pageable pageable);
	
	@Query("SELECT new com.masterpiece.FreeSportCamp.dtos.EventDto(e.id,e.appointment,e.time,e.sport.name,e.level.name,e.city.name,e.organizer.phoneNumber,e.organizer.id,e.organizer.userName,e.description,me.id) FROM Event e INNER JOIN e.subscribers me WHERE (me.id = :userId) ORDER BY e.appointment DESC")
	Page<EventDto> findSubscribedBy(@Param("userId") Long userId, Pageable pageable);
	
	@Query("SELECT new com.masterpiece.FreeSportCamp.dtos.EventDto(e.id,e.appointment,e.time,e.sport.name,e.level.name,e.city.name,e.organizer.phoneNumber,e.organizer.id,e.organizer.userName,e.description,e.organizer.id) FROM Event e WHERE (e.organizer.id = :userId) ORDER BY e.appointment DESC, e.time DESC")
	Page<EventDto> findCreatedBy(@Param("userId") Long userId, Pageable pageable);
	
	@Query("SELECT new com.masterpiece.FreeSportCamp.dtos.SubscriberViewDto(s.id,s.userName) FROM Event e JOIN e.subscribers s WHERE e.id = :eventId")
    List<SubscriberViewDto> findProjectedBy(@Param("eventId") Long EventId);
}
