package com.masterpiece.FreeSportCamp.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

import com.masterpiece.FreeSportCamp.dtos.UserDto;
import com.masterpiece.FreeSportCamp.services.UserService;

public class PwConfirmationValidator implements ConstraintValidator<PwConfirmation, UserDto> {
	

	
	 @Override
	    public boolean isValid(UserDto value,
		    ConstraintValidatorContext context) {
		String password = value.getPassword();
		String confirmation = value.getConfirmation(); 
		
		if (password == null) {
		    return true;
		}
	
		return password.equals(confirmation);
	    }

}
