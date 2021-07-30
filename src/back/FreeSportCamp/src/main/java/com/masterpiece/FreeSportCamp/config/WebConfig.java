package com.masterpiece.FreeSportCamp.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.method.HandlerTypePredicate;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer{
	
	/**
     * Defines the "/api" prefix for all {@code @RestController} in the
     * application.
     * <p>
     * Configuring this way prevents conflicts and ease configuration with oauth
     * authentication endpoints (<i>i.e.</i> {@code "/oauth/token"}). Specified
     * in application properties would change the endpoint to
     * {@code "/api/oauth/token"}) and impact security endpoints configuration.
     *
     * @param configurer a path configurer
     */
	
	 @Override
	    public void configurePathMatch(PathMatchConfigurer configurer) {
		configurer.addPathPrefix("/api",
			HandlerTypePredicate.forAnnotation(RestController.class));
	    }
	 
	 /**
	     * The password encoder bean for the application.
	     *
	     * @return a password encoder
	     */
	    @Bean
	    protected PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	    }
	    
	    @Bean
	    public ModelMapper mapper() {
	    	return new ModelMapper();
	    }

}
