package com.masterpiece.FreeSportCamp.services;

import com.masterpiece.FreeSportCamp.config.ResourceNotFoundException;
import com.masterpiece.FreeSportCamp.config.SecurityHelper;
import com.masterpiece.FreeSportCamp.config.UserDetails;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.masterpiece.FreeSportCamp.dtos.PasswordDto;
import com.masterpiece.FreeSportCamp.dtos.UserAuthDto;
import com.masterpiece.FreeSportCamp.dtos.UserDto;
import com.masterpiece.FreeSportCamp.dtos.UserInfoDto;
import com.masterpiece.FreeSportCamp.entities.Role;
import com.masterpiece.FreeSportCamp.entities.User;
/*
import com.masterpiece.FreeSportCamp.config.UserDetails;
import com.masterpiece.FreeSportCamp.config.ResourceNotFoundException;
import com.masterpiece.FreeSportCamp.dtos.UserAuthDto;
import com.masterpiece.FreeSportCamp.dtos.UserInfoDto;
*/
import com.masterpiece.FreeSportCamp.repositories.UserRepository;
import com.masterpiece.FreeSportCamp.repositories.RoleRepository;

@Service
public class UserServiceImpl implements UserService {

	private final ModelMapper mapper;

	private final PasswordEncoder encoder;

	private final UserRepository users;

	private final RoleRepository roles;

	public UserServiceImpl(ModelMapper mapper, PasswordEncoder encoder, UserRepository users, RoleRepository roles) {
		this.mapper = mapper;
		this.encoder = encoder;
		this.users = users;
		this.roles = roles;
	}

	@Override
	public void create(UserDto userDto) {
		User user = mapper.map(userDto, User.class);
		user.setEmail(Jsoup.clean(userDto.getEmail(), Whitelist.none()));
		user.setUserName(Jsoup.clean(userDto.getUserName(), Whitelist.none()));
		user.setFullName(Jsoup.clean(userDto.getFullName(), Whitelist.none()));
		String raw = userDto.getPassword();
		String encoded = encoder.encode(raw);
		user.setPassword(encoded);
		Role role = roles.findByDefaultRoleTrue();
		Set<Role> roles = new HashSet<>();
		roles.add(role);
		user.setRoles(roles); // role par défaut
		user.setEnabled(true);
		users.save(user);
	}

	public void update(PasswordDto passwordDto) {
		Optional<User> optional = users.findById(SecurityHelper.getUserId());
		if(optional.isEmpty()) {
			throw new NullPointerException();
		}
		User user = optional.get();
		
		if(!encoder.matches(passwordDto.getPreviousPassword(), user.getPassword())) {
			throw new NullPointerException();
		}
		user.setPassword(encoder.encode(passwordDto.getPassword()));
		users.save(user);
	}
	
	@Override
	public boolean uniqueName(String userName) {
		return !users.existsByUserName(userName);

	}

	@Override
	public boolean uniqueMail(String email) {
		return !users.existsByEmail(email);

	}

	// Throws UsernameNotFoundException (Spring contract)

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		  UserAuthDto user = users.findByUserName(username) .orElseThrow(() -> new
		  UsernameNotFoundException( "Ce n'est pas votre nom d'utilisateur: " + username));
		 return new UserDetails(user);
		 
		
	}

	// Throws ResourceNotFoundException (restful practice)
	
	  @Override 
	  public UserInfoDto getCurrentUserInfo(Long id) { 
	  return users.getById(id).orElseThrow(
	   () -> new ResourceNotFoundException("with id:"+ id)); 
	   }
	 

}
