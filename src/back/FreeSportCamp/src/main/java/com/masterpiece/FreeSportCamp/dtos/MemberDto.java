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

}
