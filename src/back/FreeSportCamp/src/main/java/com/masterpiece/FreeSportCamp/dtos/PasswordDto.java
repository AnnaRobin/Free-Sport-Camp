package com.masterpiece.FreeSportCamp.dtos;

import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

public class PasswordDto {
	@NotBlank
	@Length(max=45)
	private String previousPassword;
	
	@NotBlank
	@Length(max=45)
	private String password;
	
	public String getPreviousPassword() {
		return previousPassword;
	}

	public void setPreviousPassword(String previousPassword) {
		this.previousPassword = previousPassword;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
