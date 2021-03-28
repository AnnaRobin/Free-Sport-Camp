package com.masterpiece.FreeSportCamp.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.masterpiece.FreeSportCamp.dtos.ProfileViewDto;
import com.masterpiece.FreeSportCamp.dtos.PublicProfileViewDto;
import com.masterpiece.FreeSportCamp.dtos.UserAuthDto;
import com.masterpiece.FreeSportCamp.dtos.UserInfoDto;
import com.masterpiece.FreeSportCamp.entities.User;

public interface UserRepository extends JpaRepository<User, Long>{
	
	   /**
     * Retrieves a projected view of the {@code CustomUser} with given userName.
     *
     * @param username a userName
     * @return a projected view
     */
    Optional<UserAuthDto> findByUserName(String userName);
    Optional<User> findById(Long id);

    /**
     * Retrieves a projected view of the current authenticated
     * {@code CustomUser}.
     *
     * @param id user id
     * @return a projected view
     */
    Optional<UserInfoDto> getById(Long id);
    
    PublicProfileViewDto getPublicProfileById(Long userId);
    ProfileViewDto getProfileById(Long userId);
    
    boolean existsByUserName(String userName);
    boolean existsByEmail(String email);
}


