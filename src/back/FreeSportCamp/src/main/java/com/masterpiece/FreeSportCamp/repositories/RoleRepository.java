package com.masterpiece.FreeSportCamp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.masterpiece.FreeSportCamp.entities.Role;

/**
 * @author Anna Cuilhé
 * "@Repository" is optional, a JpaRepository is already a Repository
 *
 */
public interface RoleRepository extends JpaRepository<Role, Long> {

	/**
	 * @return an Object {@code Role} with it's default role ("user")
	 */
	Role findByDefaultRoleTrue();

}
