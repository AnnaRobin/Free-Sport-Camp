package com.masterpiece.FreeSportCamp.dtos;


import javax.validation.constraints.NotNull;

public class SearchDto {
	
	@NotNull
	private Long cityId;
	
	@NotNull
	private Long sportId;
	
	@NotNull
	private Long levelId;
	
	@NotNull
	private Long timeId;

	public Long getCityId() {
		return cityId;
	}

	public void setCityId(Long cityId) {
		this.cityId = cityId;
	}

	public Long getSportId() {
		return sportId;
	}

	public void setSportId(Long sportId) {
		this.sportId = sportId;
	}

	public Long getLevelId() {
		return levelId;
	}

	public void setLevelId(Long levelId) {
		this.levelId = levelId;
	}

	public Long getTimeId() {
		return timeId;
	}

	public void setTimeId(Long timeId) {
		this.timeId = timeId;
	}
	
	

}
