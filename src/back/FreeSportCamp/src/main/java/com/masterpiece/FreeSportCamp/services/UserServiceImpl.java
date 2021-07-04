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

@Service // defines this class as a service
public class UserServiceImpl implements UserService {

	/**
	 * Injected service interface for encoding passwords.
	 */
	private final PasswordEncoder encoder;

	/**
	 * The injected repositories by Spring during startup of the application
	 */
	private final UserRepository users;
	private final RoleRepository roles;

	/**
	 * Creates a new {@code UserServiceImpl} with given injected repositories.
	 * 
	 * @param encoder : Service interface for encoding passwords.
	 * @param users
	 * @param roles
	 */
	public UserServiceImpl(PasswordEncoder encoder, UserRepository users, RoleRepository roles) {
		this.encoder = encoder;
		this.users = users;
		this.roles = roles;
	}

	/**
	 * Creation and saving of user with a default role (user)
	 */
	@Override
	public void create(UserDto userDto) {
		User user = new User();
		user.setEmail(Jsoup.clean(userDto.getEmail(), Whitelist.none())); // Convert dto to entity with jsoup (HTML
																			// Cleaner) to avoid XSS attacks with a
																			// configuration specified by a Whitelist.
		user.setUserName(Jsoup.clean(userDto.getUserName(), Whitelist.none())); // This whitelist allows only simple
																				// text
		user.setFullName(Jsoup.clean(userDto.getFullName(), Whitelist.none()));
		user.setPassword(encoder.encode(userDto.getPassword()));
		Role role = roles.findByDefaultRoleTrue();
		Set<Role> roles = new HashSet<>();
		roles.add(role);
		user.setRoles(roles); // role par défaut
		user.setEnabled(true);
		users.save(user);
	}

	/**
	 * Update a password
	 */
	public void update(PasswordDto passwordDto) {
		Optional<User> optional = users.findById(SecurityHelper.getUserId());
		if (optional.isEmpty()) {
			throw new NullPointerException(); // Constructs a {@code NullPointerException} with no detail message.
		}
		User user = optional.get();

		if (!encoder.matches(passwordDto.getPreviousPassword(), user.getPassword())) {
			throw new NullPointerException();
		}
		user.setPassword(encoder.encode(passwordDto.getPassword()));
		users.save(user);
	}

	/**
	 * UniqueNamaValidator implements ConstraintValidator which defines the logic to
	 * validate a given constraint for a given object type
	 */
	public boolean uniqueName(String userName) {
		return !users.existsByUserName(userName);
	}

	/**
	 * UniqueMailValidator implements ConstraintValidator which defines the logic to
	 * validate a given constraint for a given object type
	 */
	public boolean uniqueMail(String email) {
		return !users.existsByEmail(email);
	}

	/**
	 * Throws UsernameNotFoundException (Spring contract)
	 * <p>
	 * Method for authentication
	 */
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserAuthDto user = users.findByUserName(username)
				.orElseThrow(() -> new UsernameNotFoundException("Ce n'est pas votre nom d'utilisateur: " + username));
		return new UserDetails(user);

	}

	/**
	 * Throws ResourceNotFoundException (restful practice)
	 * <p>
	 * {@code UserInfoDto} : a projected view of the current authenticated
	 * {@code User}
	 */
	@Override
	public UserInfoDto getCurrentUserInfo(Long id) {
		return users.getById(id).orElseThrow(() -> new ResourceNotFoundException("with id:" + id));
	}
}
