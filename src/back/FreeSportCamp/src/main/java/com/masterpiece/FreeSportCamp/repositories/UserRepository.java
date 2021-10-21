package com.masterpiece.FreeSportCamp.repositories;


import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.masterpiece.FreeSportCamp.dtos.ProfileViewDto;
import com.masterpiece.FreeSportCamp.dtos.PublicProfileViewDto;
import com.masterpiece.FreeSportCamp.dtos.UserAuthDto;
import com.masterpiece.FreeSportCamp.dtos.UserInfoDto;
import com.masterpiece.FreeSportCamp.dtos.UserListViewDto;
import com.masterpiece.FreeSportCamp.entities.User;

/**
 * @author Anna Cuilhé "@Repository" is optional, a JpaRepository is already a
 *         Repository
 *
 */
public interface UserRepository extends JpaRepository<User, Long> {

	/**
	 * @param userName Retrieves a projected view of a user with a given
	 *                 {@code userName} - if exist
	 */
	Optional<UserAuthDto> findByUserName(String userName);

	/**
	 * Retrieves a user with a given {@code id} - if exist
	 */
	Optional<User> findById(Long id);

	/**
	 * @param id Retrieves a projected view of the current authenticated
	 *           {@code User}.
	 */
	Optional<UserInfoDto> getById(Long id);

	/**
	 * @param userId
	 * @return a view of a {@Code PublicProfile} with given id A projection of one
	 *         {@code PublicProfile} in a {@code PublicProfileViewDto}
	 */
	PublicProfileViewDto getPublicProfileById(Long userId);

	/**
	 * @param userId
	 * @return a view of a {@Code Profile} with given id. A projection of one
	 *         {@code Profile} in a {@code ProfileViewDto}
	 */
	ProfileViewDto getProfileById(Long userId);

	/**
	 * @param userName
	 * @return a boolean to verify if the user name is already exist (or not) in the
	 *         DB
	 */
	boolean existsByUserName(String userName);

	/**
	 * @param email
	 * @return a boolean to verify if the user name is already exist (or not) in the
	 *         DB
	 */
	boolean existsByEmail(String email);

	
	//@Query("SELECT new com.masterpiece.FreeSportCamp.dtos.UserListViewDto(u.id,u.fullName,u.userName,u.emali,u.phoneNumber) " 
	//+ "FROM User u "
	//+ "WHERE u.enabled = true")
	Page<UserListViewDto> getAllProjectedByEnabledTrue(Pageable pageable);
	
	
	
	
	
	
	
	
	
	
	
	
}
