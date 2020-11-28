package com.masterpiece.FreeSportCamp.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.masterpiece.FreeSportCamp.dtos.CustomUserAuthDto;
import com.masterpiece.FreeSportCamp.entities.CustomUser;
import com.masterpiece.FreeSportCamp.entities.User;

public interface CustomUserJpaRepository extends JpaRepository<CustomUser, Long>{
	
	   /**
     * Retrieves a projected view of the {@code CustomUser} with given username.
     *
     * @param username a username
     * @return a projected view
     */
    Optional<CustomUserAuthDto> findByUsername(String username);

    /**
     * Retrieves a projected view of the current authenticated
     * {@code CustomUser}.
     *
     * @param id user id
     * @return a projected view
     */
   // Optional<CustomUserInfoDto> getById(Long id);
}


