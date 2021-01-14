package com.masterpiece.FreeSportCamp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.masterpiece.FreeSportCamp.dtos.TimeViewDto;
import com.masterpiece.FreeSportCamp.entities.Time;

public interface TimeRepository extends JpaRepository<Time, Long>{
	
	 Time getById(Long id);
	 List<TimeViewDto> getAllProjectedBy();
}
