package com.masterpiece.FreeSportCamp.validation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = UniqueMailValidator.class)
public @interface UniqueMail {
	
	String message() default "{errors.user.mail.notUnique}";

	Class<?>[] groups() default { };

	Class<? extends Payload>[] payload() default { };


}
