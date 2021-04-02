package com.masterpiece.FreeSportCamp.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.masterpiece.FreeSportCamp.config.SecurityHelper;
import com.masterpiece.FreeSportCamp.dtos.ProfileDto;
import com.masterpiece.FreeSportCamp.dtos.ProfileViewDto;
import com.masterpiece.FreeSportCamp.dtos.PublicProfileViewDto;
import com.masterpiece.FreeSportCamp.entities.City;
import com.masterpiece.FreeSportCamp.entities.User;
import com.masterpiece.FreeSportCamp.repositories.UserRepository;

import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;

@Service
public class ProfileServiceImpl implements ProfileService {

	private final UserRepository userRepository;
	
    protected ProfileServiceImpl(UserRepository userRepository) {
    	this.userRepository = userRepository;
        }
    
    public ProfileViewDto get() {
    	return userRepository.getProfileById(SecurityHelper.getUserId());
    }
    
    public PublicProfileViewDto getPublic(Long id) {
    	return userRepository.getPublicProfileById(id);
    }
	public void update(ProfileDto dto) {
		Optional<User> optional = this.userRepository.findById(SecurityHelper.getUserId());
		if(optional.isEmpty()) {
			throw new NullPointerException();
		}
		else {
			User user = optional.get();
			user.setCity(new City(dto.getCityId()));
			user.setPresentation(Jsoup.clean(dto.getPresentation(),Whitelist.none()));
			user.setPhoneNumber(Jsoup.clean(dto.getPhoneNumber(),Whitelist.none()));
			user.setSex(dto.getSex());
			user.setBirthdate(dto.getBirthDate());
			this.userRepository.save(user);
		}
		
	}
	
	public void delete() {
		Optional<User> optional = this.userRepository.findById(SecurityHelper.getUserId());
		if(optional.isEmpty()) {
			throw new NullPointerException();
		}else {
			User user = optional.get();
			user.setEnabled(false);
			this.userRepository.save(user);
		}
		
	}
}
