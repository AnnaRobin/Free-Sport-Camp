package com.masterpiece.FreeSportCamp.dtos;

import javax.validation.constraints.NotEmpty;

public class CityDto {
	@NotEmpty
	private Long id;
	
	@NotEmpty
	private String name;
	

}
