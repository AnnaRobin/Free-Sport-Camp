package com.masterpiece.FreeSportCamp.dtos;

import java.util.List;

public class CriteriaViewDto {
	
	private List<CityViewDto> cities;
	
	private List<LevelViewDto> levels;
	
	private List<TimeViewDto> times;
	
	private List<SportViewDto> sports;

	public CriteriaViewDto() {
		
	}

	public List<CityViewDto> getCities() {
		return cities;
	}

	public void setCities(List<CityViewDto> cities) {
		this.cities = cities;
	}

	public List<LevelViewDto> getLevels() {
		return levels;
	}

	public void setLevels(List<LevelViewDto> levels) {
		this.levels = levels;
	}

	public List<TimeViewDto> getTimes() {
		return times;
	}

	public void setTimes(List<TimeViewDto> times) {
		this.times = times;
	}

	public List<SportViewDto> getSports() {
		return sports;
	}

	public void setSports(List<SportViewDto> sports) {
		this.sports = sports;
	}

	
	

}
