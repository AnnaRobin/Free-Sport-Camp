package com.masterpiece.FreeSportCamp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.masterpiece.FreeSportCamp.dtos.TimeViewDto;
import com.masterpiece.FreeSportCamp.entities.Time;

/**
 * @author Anna Cuilhé
 * "@Repository" is optional, a JpaRepository is already a Repository
 *
 */
public interface TimeRepository extends JpaRepository<Time, Long>{
	
	 /**
	 * A projection of one {@code Time} in a {@code Time}. 
	 * @param id the id of the time slot to retrieve
	 * @return a time slot by a given id
	 */
	Time getById(Long id);
	
	 /**
	 * A projection of many/all {@code Time}s in a {@code List} of
     * {@code TimeViewDto}.
	 * @return a view of all time slots
	 */
	List<TimeViewDto> getAllProjectedBy();
	
}
