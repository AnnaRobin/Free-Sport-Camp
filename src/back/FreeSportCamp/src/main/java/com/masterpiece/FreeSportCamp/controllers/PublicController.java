package com.masterpiece.FreeSportCamp.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping ("/public") // "/api/public/*"
public class PublicController {
	
	/**
     * Accessible for anyone even anonymous.
     *
     * @return "Hello anyone!"
     */
    @GetMapping("/hello")
    public String hello() {
	return "Hello anyone!";
    }

}
