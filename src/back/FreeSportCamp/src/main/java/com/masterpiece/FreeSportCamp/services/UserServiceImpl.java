package com.masterpiece.FreeSportCamp.services;

import java.util.HashSet;
import java.util.Set;

import org.modelmapper.ModelMapper;
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
		/*
		 * UserAuthDto user = repo.findByUserName(username) .orElseThrow(() -> new
		 * UsernameNotFoundException( "no user found with username: " + username));
		 * return new UserDetails(user);
		 */
		return null;
	}

	// Throws ResourceNotFoundException (restful practice)
	/*
	 * @Override public UserInfoDto getCurrentUserInfo(Long id) { return
	 * repo.getById(id).orElseThrow( () -> new ResourceNotFoundException("with id:"
	 * + id)); }
	 */

}
