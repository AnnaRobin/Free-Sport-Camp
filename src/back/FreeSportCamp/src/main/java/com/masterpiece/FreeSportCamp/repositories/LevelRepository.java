package com.masterpiece.FreeSportCamp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.masterpiece.FreeSportCamp.dtos.LevelViewDto;
import com.masterpiece.FreeSportCamp.entities.Level;

/**
 * @author Anna Cuilhé
 * "@Repository" is optional, a JpaRepository is already a Repository
 *
 */
public interface LevelRepository extends JpaRepository<Level, Long> {
	
	 /**
	 * A projection of many/all {@code Level}s in a {@code List} of
     * {@code LevelViewDto}.
	 * @return a view of all levels
	 */
	List<LevelViewDto> getAllProjectedBy();

}
