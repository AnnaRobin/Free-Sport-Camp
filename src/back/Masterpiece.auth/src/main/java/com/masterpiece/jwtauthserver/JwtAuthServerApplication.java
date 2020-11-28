package com.masterpiece.jwtauthserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

@SpringBootApplication
public class JwtAuthServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(JwtAuthServerApplication.class, args);
			
	}

	 @Bean
	    protected LocalValidatorFactoryBean validator(MessageSource messageSource) {
		// messageSource = messages.properties in src/main/resources
		LocalValidatorFactoryBean validatorFactoryBean = new LocalValidatorFactoryBean();
		validatorFactoryBean.setValidationMessageSource(messageSource);
		return validatorFactoryBean;
	    }
	
	
}
