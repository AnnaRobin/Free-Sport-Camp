package com.masterpiece.FreeSportCamp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class FreeSportCampApplication {

	public static void main(String[] args) {
		SpringApplication.run(FreeSportCampApplication.class, args);
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
}
