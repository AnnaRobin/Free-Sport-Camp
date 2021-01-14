package com.masterpiece.FreeSportCamp.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/private") // "/api/private/*"
public class PrivateController {
	
	  /**
     * Accessible with "ROLE_USER".
     *
     * @return "Hello user!"
     */
    @PreAuthorize("hasRole('USER')") // == @Secured("ROLE_USER")
    @GetMapping("/user")
    public String user() {
    	return "Hello user!";
    }

    /**
     * Accessible with "ROLE_ADMIN".
     *
     * @return "Hello admin!"
     */
    @PreAuthorize("hasRole('ADMIN')") // == @Secured("ROLE_ADMIN")
    @GetMapping("/admin")
    public String admin() {
	return "Hello admin!";
    }

    /**
     * Accessible if fully authenticated (not anonymous).
     *
     * @return "Hello fully authenticated!"
     */
    @GetMapping("/authenticated")
    public String secured() {
	return "Hello fully authenticated!";
    }
	

}
