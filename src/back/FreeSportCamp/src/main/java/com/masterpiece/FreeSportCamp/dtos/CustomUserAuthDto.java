package com.masterpiece.FreeSportCamp.dtos;

import java.util.Set;

import com.masterpiece.FreeSportCamp.entities.Role;

public interface CustomUserAuthDto {


    Long getId();

    String getUsername();

    String getPassword();

    Set<Role> getRoles();

    boolean isEnabled();

    boolean isAccountNonExpired();

    boolean isAccountNonLocked();

    boolean isCredentialsNonExpired();
	
}
