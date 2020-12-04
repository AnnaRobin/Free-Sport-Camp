package com.masterpiece.FreeSportCamp.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.masterpiece.FreeSportCamp.config.CustomUserDetails;
import com.masterpiece.FreeSportCamp.config.ResourceNotFoundException;
import com.masterpiece.FreeSportCamp.dtos.CustomUserAuthDto;
import com.masterpiece.FreeSportCamp.dtos.CustomUserInfoDto;
import com.masterpiece.FreeSportCamp.repositories.CustomUserJpaRepository;

@Service
public class CustomUserDetailsServiceImpl implements CustomUserDetailsService {
	
	  private final CustomUserJpaRepository repo;

	    protected CustomUserDetailsServiceImpl(CustomUserJpaRepository repo) {
		this.repo = repo;
	    }

	    // Throws UsernameNotFoundException (Spring contract)
	    @Override
	    public UserDetails loadUserByUsername(String username)
		    throws UsernameNotFoundException {
		CustomUserAuthDto user = repo.findByUserName(username)
			.orElseThrow(() -> new UsernameNotFoundException(
				"no user found with username: " + username));
		return new CustomUserDetails(user);
	    }

	    // Throws ResourceNotFoundException (restful practice)
	    @Override
	    public CustomUserInfoDto getCurrentUserInfo(Long id) {
		return repo.getById(id).orElseThrow(
			() -> new ResourceNotFoundException("with id:" + id));
	    }

}
