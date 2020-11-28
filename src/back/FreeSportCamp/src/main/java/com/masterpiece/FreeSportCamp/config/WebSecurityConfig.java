package com.masterpiece.FreeSportCamp.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;

@Configuration
public class WebSecurityConfig {
	
	 @Override
	    @Bean
	    public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	    }

}
