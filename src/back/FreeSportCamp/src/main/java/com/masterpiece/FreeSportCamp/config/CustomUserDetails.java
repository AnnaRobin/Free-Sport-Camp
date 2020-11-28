package com.masterpiece.FreeSportCamp.config;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;

import com.masterpiece.FreeSportCamp.dtos.CustomUserAuthDto;
import com.masterpiece.FreeSportCamp.entities.Role;
import com.masterpiece.FreeSportCamp.entities.User;

public class CustomUserDetails extends User {

	private static final long serialVersionUID = 5803283930339051994L;

    private Long id;

    public CustomUserDetails(CustomUserAuthDto user) {
	super(user.getUsername(), user.getPassword(), user.isEnabled(),
		user.isAccountNonExpired(), user.isCredentialsNonExpired(),
		user.isAccountNonLocked(), buildAuthorities(user.getRoles()));
	id = user.getId();
    }

    private static Set<GrantedAuthority> buildAuthorities(Set<Role> roles) {
	return roles.stream().map(r -> new SimpleGrantedAuthority(r.getCode()))
		.collect(Collectors.toUnmodifiableSet());
    }

    public Long getId() {
	return id;
    }

    @Override
    public String toString() {
	return "{id=" + id + ", authorities=" + getAuthorities()
		+ ", password=[PROTECTED], username=" + getUsername()
		+ ", enabled=" + isEnabled() + ", accountNonExpired="
		+ isAccountNonExpired() + ", accountNonLocked="
		+ isAccountNonLocked() + ", credentialsNonExpired="
		+ isCredentialsNonExpired() + "}";
    }
}
