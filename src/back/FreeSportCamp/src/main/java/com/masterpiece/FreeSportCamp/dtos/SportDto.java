package com.masterpiece.FreeSportCamp.dtos;

import javax.validation.constraints.NotEmpty;

public class SportDto {
	
	@NotEmpty
	private Long id;
	
	@NotEmpty
	private String name;

	public String getName() {
		return name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setName(String name) {
		this.name = name;
	}

	public SportDto() {
		
	}
	
	

}
