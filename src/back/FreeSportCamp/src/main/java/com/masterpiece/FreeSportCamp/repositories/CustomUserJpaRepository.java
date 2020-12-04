package com.masterpiece.FreeSportCamp.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.masterpiece.FreeSportCamp.dtos.CustomUserAuthDto;
import com.masterpiece.FreeSportCamp.dtos.CustomUserInfoDto;
import com.masterpiece.FreeSportCamp.entities.CustomUser;
import com.masterpiece.FreeSportCamp.entities.CustomUser;

public interface CustomUserJpaRepository extends JpaRepository<CustomUser, Long>{
	
	   /**
     * Retrieves a projected view of the {@code CustomUser} with given userName.
     *
     * @param username a userName
     * @return a projected view
     */
    Optional<CustomUserAuthDto> findByUserName(String userName);

    /**
     * Retrieves a projected view of the current authenticated
     * {@code CustomUser}.
     *
     * @param id user id
     * @return a projected view
     */
    Optional<CustomUserInfoDto> getById(Long id);
}


