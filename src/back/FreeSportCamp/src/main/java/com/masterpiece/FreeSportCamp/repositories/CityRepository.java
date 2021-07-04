package com.masterpiece.FreeSportCamp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.masterpiece.FreeSportCamp.dtos.CityViewDto;
import com.masterpiece.FreeSportCamp.entities.City;

/**
 * @author Anna Cuilhé
 * "@Repository" is optional, a JpaRepository is already a Repository
 *
 */
public interface CityRepository extends JpaRepository<City, Long>{
	
	 /**
	 * A projection of many/all {@code City}es in a {@code List} of
     * {@code CityViewDto}.
	 * @return a view of all cities
	 */
	List<CityViewDto> getAllProjectedBy();

}
