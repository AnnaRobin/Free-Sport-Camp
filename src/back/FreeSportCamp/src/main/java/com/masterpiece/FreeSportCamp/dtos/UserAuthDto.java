package com.masterpiece.FreeSportCamp.dtos;

import java.util.Set;

import com.masterpiece.FreeSportCamp.entities.Role;
/**
 * A projection of a {@code User} for authentication.
 */
public interface UserAuthDto {

    Long getId();

    String getUserName();

    String getPassword();

    Set<Role> getRoles();

    boolean isEnabled();

	
}
