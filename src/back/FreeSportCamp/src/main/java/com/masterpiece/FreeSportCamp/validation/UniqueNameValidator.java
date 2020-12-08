package com.masterpiece.FreeSportCamp.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import com.masterpiece.FreeSportCamp.services.UserService;

public class UniqueNameValidator implements ConstraintValidator<UniqueName, String> {

	@Autowired
	private UserService service;
	
	
	
	@Override
	public boolean isValid(String userName, ConstraintValidatorContext context) {
		if (userName == null) {
			return true;
		}
		return service.uniqueName(userName);
	}

}
