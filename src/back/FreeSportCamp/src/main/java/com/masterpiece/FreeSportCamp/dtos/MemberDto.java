package com.masterpiece.FreeSportCamp.dtos;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class MemberDto {
	@NotEmpty
	@Size(min=4, max=50)
private String userName;
	@NotEmpty
	@Size(min=4, max=50)
	@Pattern(regexp = "^(?=.{4,50})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$")
private String password;
	@NotEmpty
private String fullName;
	@NotEmpty
	@Pattern(regexp = "^[A-Za-z0-9+_.-]+@(.+)$")
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

}
	
