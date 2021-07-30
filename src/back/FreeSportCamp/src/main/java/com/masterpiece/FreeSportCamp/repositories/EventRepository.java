package com.masterpiece.FreeSportCamp.repositories;

import java.time.LocalTime;
import java.time.LocalDate;
import java.util.List;
import java.util.concurrent.Flow.Subscriber;

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

/**
 * @author Anna Cuilhé "@Repository" is optional, a JpaRepository is already a
 *         Repository
 */
public interface EventRepository extends JpaRepository<Event, Long> {

	/**
	 * @param organizer
	 * @param appointment
	 * @param time
	 * @return a Boolean class (which wraps a value of the primitive type
	 *         {@code boolean} in an object) to verify if an Event (created by the
	 *         same organizer for the same time) is already exist (or not) in the DB
	 */
	// Un utilisateur ne peut pas organiser plusieurs evenemnts pour le meme moment
	Boolean existsByOrganizerAndAppointmentAndTime(User organizer, LocalDate appointment, LocalTime time);

	/**
	 * @param organizer
	 * @param appointment
	 * @param time
	 * @param id
	 * @return a Boolean to verify if an Event (created by the same organizer for
	 *         the same time with the same id) is already exist (or not) in the DB
	 *         To be able to modify of the other fields the event than "Date" and
	 *         "Time"
	 */
	// Si l'organisateur veut modifier un evenementn sans changer sa date et sa time
	Boolean existsByOrganizerAndAppointmentAndTimeAndIdNot(User organizer, LocalDate appointment, LocalTime time,
			Long id);

	/**
	 * @param organizer
	 * @param id
	 * @return a Boolean to verify if a user is the organizer of an event with given
	 *         id
	 */
	// Permet de savoir si l'utilisateur est bien l'organisateur à un evenement
	// donné
	Boolean existsByOrganizerAndId(User organizer, Long id);

	/**
	 * @param id
	 * @return a view of an {@code EventEditorDto} with a given id
	 */
	// An evenement ciblé par son id pour l'édition
	EventEditorViewDto findProjectedById(@Param("eventId") Long id);

	// @Query : annotation to declare finder queries directly on repository methods.
	// Select queries can be used to read objects from the database.
	/**
	 * @param minDate
	 * @param cityId
	 * @param sportId
	 * @param levelId
	 * @param minTime
	 * @param maxTime
	 * @param userId
	 * @param pageable
	 * @return {@code Page}s of {@code EventDto} (with given paging information) of a
	 *         user with given id ordered by ascendent appointment and time The
	 *         event is not in the past
	 */
	// trouvez vos partenaires
	@Query("SELECT new com.masterpiece.FreeSportCamp.dtos.EventDto(e.id,e.appointment,e.time,e.sport.name,e.level.name,e.city.name,e.organizer.phoneNumber,e.organizer.id, e.organizer.userName,e.description, me.id) "
			+ "FROM Event e "
			+ "LEFT JOIN e.subscribers me ON (me.id = :userId) "
			+ "WHERE (e.city.id = :cityId) and (e.sport.id = :sportId) and (e.level.id = :levelId) and (e.time <= :maxTime) and (e.time >= :minTime) AND (e.appointment >= :minDate) "
			+ "ORDER BY e.appointment ASC, e.time ASC")
	Page<EventDto> findProjectedBy(@Param("minDate") LocalDate minDate, @Param("cityId") Long cityId,
			@Param("sportId") Long sportId, @Param("levelId") Long levelId, @Param("minTime") LocalTime minTime,
			@Param("maxTime") LocalTime maxTime, @Param("userId") Long userId, Pageable pageable);

	/**
	 * @param userId
	 * @param pageable : paging information
	 * @return {@code Page}s of {@code EventDto} with given paging information
	 *         subscribed by user(s)with given id(s) by descendant time.
	 */
	// mes activités
	@Query("SELECT new com.masterpiece.FreeSportCamp.dtos.EventDto(e.id,e.appointment,e.time,e.sport.name,e.level.name,e.city.name,e.organizer.phoneNumber,e.organizer.id,e.organizer.userName,e.description,me.id) "
			+ "FROM Event e "
			+ "INNER JOIN e.subscribers me WHERE (me.id = :userId) "
			+ "ORDER BY e.appointment DESC")
	Page<EventDto> findSubscribedBy(@Param("userId") Long userId, Pageable pageable);

	/**
	 * @param userId
	 * @param pageable : paging information
	 * @return {@code Page}s of {@code EventDto} with given paging information
	 *         created (organized) by a user with a given id, ordered by descendant
	 *         date and time.
	 */
	// mes publications
	@Query("SELECT new com.masterpiece.FreeSportCamp.dtos.EventDto(e.id,e.appointment,e.time,e.sport.name,e.level.name,e.city.name,e.organizer.phoneNumber,e.organizer.id,e.organizer.userName,e.description,e.organizer.id) "
			+ "FROM Event e "
			+ "WHERE (e.organizer.id = :userId) "
			+ "ORDER BY e.appointment DESC, e.time DESC")
	Page<EventDto> findCreatedBy(@Param("userId") Long userId, Pageable pageable);

	/**
	 * @param EventId
	 * @return a view of all the subscribers of an event with given id. a projection
	 *         of many/all {@Code Subscriber}s in a {@code List} of
	 *         {@code SubscriberViewDto}
	 */
	// Les résultats de la recherche
	@Query("SELECT new com.masterpiece.FreeSportCamp.dtos.SubscriberViewDto(s.id,s.userName) "
			+ "FROM Event e JOIN e.subscribers s "
			+ "WHERE e.id = :eventId")
	List<SubscriberViewDto> findProjectedBy(@Param("eventId") Long EventId);
}
