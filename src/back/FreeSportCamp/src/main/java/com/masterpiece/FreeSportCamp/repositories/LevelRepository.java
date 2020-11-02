package com.masterpiece.FreeSportCamp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.masterpiece.FreeSportCamp.dtos.LevelViewDto;
import com.masterpiece.FreeSportCamp.entities.Level;

public interface LevelRepository extends JpaRepository<Level, Long> {
	
	 List<LevelViewDto> getAllProjectedBy();

}
