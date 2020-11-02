package com.masterpiece.FreeSportCamp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.masterpiece.FreeSportCamp.dtos.CityViewDto;
import com.masterpiece.FreeSportCamp.entities.City;

public interface CityRepository extends JpaRepository<City, Long>{
	
	 List<CityViewDto> getAllProjectedBy();

}
