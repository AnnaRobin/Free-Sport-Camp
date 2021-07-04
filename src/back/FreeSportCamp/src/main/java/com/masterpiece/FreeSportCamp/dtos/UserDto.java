package com.masterpiece.FreeSportCamp.dtos;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;

import com.masterpiece.FreeSportCamp.validation.PwConfirmation;
import com.masterpiece.FreeSportCamp.validation.UniqueMail;
import com.masterpiece.FreeSportCamp.validation.UniqueName;

@PwConfirmation
public class UserDto {
	@NotBlank
	@Length(max=45)
	@UniqueName
	private String userName;
	
	@NotBlank
	@Length(min=5, max=45)
	private String password;
	
	@NotBlank
	private String confirmation;
	
	@NotBlank
	@Length(max=45)
	@Pattern(regexp = "[a-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ]+\\s[a-zàáâãäåçèéêëìíîïðòóôõöùúûüýÿ]+$", flags=Pattern.Flag.CASE_INSENSITIVE) 
	private String fullName;
	
	@NotBlank
	@Length(max=45)
	@Email
	@UniqueMail
	private String email;
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getConfirmation() {
		return confirmation;
	}
	public void setConfirmation(String confirmation) {
		this.confirmation = confirmation;
	}
}
