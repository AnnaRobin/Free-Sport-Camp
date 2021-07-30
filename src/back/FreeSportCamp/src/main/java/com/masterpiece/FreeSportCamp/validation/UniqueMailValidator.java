package com.masterpiece.FreeSportCamp.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import com.masterpiece.FreeSportCamp.services.UserService;

public class UniqueMailValidator implements ConstraintValidator<UniqueMail, String> {

	@Autowired
	private UserService service;
	
	@Override
	public boolean isValid(String email, ConstraintValidatorContext context) {
		if (email == null) {
			return true;
		}
		return service.uniqueMail(email);
	}
}
