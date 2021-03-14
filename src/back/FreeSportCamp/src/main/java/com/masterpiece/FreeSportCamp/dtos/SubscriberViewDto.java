package com.masterpiece.FreeSportCamp.dtos;

public class SubscriberViewDto {
	private Long id;
	private String userName;
	public SubscriberViewDto(Long id, String userName) {
		super();
		this.id = id;
		this.userName = userName;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	
}
