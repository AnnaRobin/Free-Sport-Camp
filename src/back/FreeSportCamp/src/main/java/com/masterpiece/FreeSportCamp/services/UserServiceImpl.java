package com.masterpiece.FreeSportCamp.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.masterpiece.FreeSportCamp.dtos.UserDto;
import com.masterpiece.FreeSportCamp.entities.Role;
import com.masterpiece.FreeSportCamp.entities.User;
/*
import com.masterpiece.FreeSportCamp.config.UserDetails;
import com.masterpiece.FreeSportCamp.config.ResourceNotFoundException;
import com.masterpiece.FreeSportCamp.dtos.UserAuthDto;
import com.masterpiece.FreeSportCamp.dtos.UserInfoDto;
*/
import com.masterpiece.FreeSportCamp.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	
	
	
	  private final PasswordEncoder encoder;
	  
	  private final UserRepository users;
	  
	//  private final RoleJpaRepository roles;
	  
	  
	 
	  public UserServiceImpl (PasswordEncoder encoder,
			  UserRepository users//, RoleJpaRepository roles
			  ) {
		  this.encoder = encoder;
		  this.users = users;
		//  this.roles = roles;
	  }
	  
	  @Override
	  public void create(UserDto userDto) {
		 
		  User user = new User();
		  user.setUserName(userDto.getUserName());
		  user.setFullName(userDto.getFullName());
		  user.setEmail(userDto.getEmail());
		  String raw = userDto.getPassword();
		  String encoded =encoder.encode(raw);
		  user.setPassword(encoded);
		 /* Role role = roles.findByDefaultRoleTrue();
		  user.setRole(role); // role par défaut*/
		  user.setEnabled(true);
		  users.save(user);
	  }
	    
	  @Override
	  public  boolean alreadyExistsUserName(String userName) {
		  return userName != null && !users.existsByUserName(userName);
	  }
	  
	  public  boolean alreadyExistsEmail(String email) {
		  return email !=null && !users.existsByEmail(email);
	  }
	    

	    // Throws UsernameNotFoundException (Spring contract)
	    
	    @Override
	    public UserDetails loadUserByUsername(String username)
		    throws UsernameNotFoundException {
	    	/*
		UserAuthDto user = repo.findByUserName(username)
			.orElseThrow(() -> new UsernameNotFoundException(
				"no user found with username: " + username));
		return new UserDetails(user);
		*/
	    	return null;
	    }

	    // Throws ResourceNotFoundException (restful practice)
	    /*
	    @Override
	    public UserInfoDto getCurrentUserInfo(Long id) {
		return repo.getById(id).orElseThrow(
			() -> new ResourceNotFoundException("with id:" + id));
	    }
	    */

}
