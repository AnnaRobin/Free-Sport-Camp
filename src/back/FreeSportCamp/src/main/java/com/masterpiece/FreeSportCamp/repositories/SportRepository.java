package com.masterpiece.FreeSportCamp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.masterpiece.FreeSportCamp.dtos.SportViewDto;
import com.masterpiece.FreeSportCamp.entities.Sport;

public interface SportRepository extends JpaRepository<Sport, Long> {
	
	 List<SportViewDto> getAllProjectedBy();

}
