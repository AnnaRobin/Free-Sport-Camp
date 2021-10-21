package com.masterpiece.FreeSportCamp.services;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.masterpiece.FreeSportCamp.config.SecurityHelper;
import com.masterpiece.FreeSportCamp.dtos.ProfileDto;
import com.masterpiece.FreeSportCamp.dtos.ProfileViewDto;
import com.masterpiece.FreeSportCamp.dtos.PublicProfileViewDto;
import com.masterpiece.FreeSportCamp.dtos.UserListViewDto;
import com.masterpiece.FreeSportCamp.entities.City;
import com.masterpiece.FreeSportCamp.entities.Event;
import com.masterpiece.FreeSportCamp.entities.User;
import com.masterpiece.FreeSportCamp.repositories.UserRepository;

import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

@Service // defines this class as a service
public class ProfileServiceImpl implements ProfileService, AdminProfileService {

	/**
	 * userRepository is injected by Spring during startup of the application
	 */
	private final UserRepository userRepository;

	/**
	 * Creates a new {@code ProfileServiceImpl} with given injected repository.
	 * 
	 * @param userRepository is an injected {@code UserRepository}
	 */
	protected ProfileServiceImpl(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	/**
	 * retrieve a view of a profile (the given id is the currently authenticated
	 * user identifier)
	 */
	public ProfileViewDto get() {
		return userRepository.getProfileById(SecurityHelper.getUserId());
	}

	/**
	 * retrieve a view of a profile with a given id
	 */
	public PublicProfileViewDto getPublic(Long id) {
		return userRepository.getPublicProfileById(id);
	}

	/**
	 * Update a profile - if exist (the given id is the currently authenticated user
	 * identifier)
	 */
	public void update(ProfileDto dto) {
		Optional<User> optional = this.userRepository.findById(SecurityHelper.getUserId());
		if (optional.isEmpty()) {
			throw new NullPointerException(); // Constructs a {@code NullPointerException} with no detail message.
		} else {
			User user = optional.get();
			if (dto.getCityId() == null) {
				user.setCity(null);
			} else {
				user.setCity(new City(dto.getCityId()));
			}
			if (dto.getPresentation() == null)
				user.setPresentation(dto.getPresentation()); // Convert dto to entity
			else {
				user.setPresentation(Jsoup.clean(dto.getPresentation(), Whitelist.none()));
			}
			if (dto.getPhoneNumber() == null)
				user.setPhoneNumber(dto.getPhoneNumber());
			else {
				user.setPhoneNumber(Jsoup.clean(dto.getPhoneNumber(), Whitelist.none()));
			}
			user.setSex(dto.getSex());
			user.setBirthdate(dto.getBirthDate());
			this.userRepository.save(user); // Save the changing(s) to database
		}

	}

	/**
	 * Deactivate a user - if exist (the given id is the currently authenticated
	 * user identifier)
	 */
	public void delete() {
		delete(SecurityHelper.getUserId());
	}
	
	
	/**
	 * Deactivate a user - if exist - by id
	 */
	public void delete(Long id) {
		Optional<User> optional = this.userRepository.findById(id);
		if (optional.isEmpty()) {
			throw new NullPointerException();
		} else {
			User user = optional.get();
			user.setEnabled(false);
			this.userRepository.save(user); // Save the changing(s) to database
		}

	}
	
	
	public Page<UserListViewDto> getAllUsers(int page, int size) {
		return userRepository.getAllProjectedByEnabledTrue(PageRequest.of(page, size));
	}
}
