package com.masterpiece.FreeSportCamp;


//import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.context.annotation.Bean;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;


/**
 * Class that can be used to bootstrap and launch a Spring application from a Java main
 * method.
 */
@SpringBootApplication
public class FreeSportCampApplication {
	
	public static void main(String[] args) { 
		//main method is the entry point of any java program
		SpringApplication.run(FreeSportCampApplication.class, args);
	}	
}
			