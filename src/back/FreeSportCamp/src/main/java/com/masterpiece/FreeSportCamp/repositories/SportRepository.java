package com.masterpiece.FreeSportCamp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.masterpiece.FreeSportCamp.dtos.SportViewDto;
import com.masterpiece.FreeSportCamp.entities.Sport;

/**
 * @author Anna Cuilhé
 * "@Repository" is optional, a JpaRepository is already a Repository
 *
 */
public interface SportRepository extends JpaRepository<Sport, Long> {
	
	 /**
	 * A projection of many/all {@code Sport}s in a {@code List} of
     * {@code SportViewDto}.
	 * @return a view of all sports
	 */
	List<SportViewDto> getAllProjectedBy();

}
