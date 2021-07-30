package com.masterpiece.FreeSportCamp.dtos;

import java.util.List;

/**
 * @author Anna Cuilhé
 * A class representing a view of a {@code Criteria}. 
 * Exposes getter and setter methods which will be implemented by Spring.
 *
 */
// aggregation of the four lists of DTO
public class CriteriaViewDto {

	private List<CityViewDto> cities;

	private List<LevelViewDto> levels;

	private List<TimeViewDto> times;

	private List<SportViewDto> sports;

	public CriteriaViewDto() {

	}

	/**
	 * @return a list of cities
	 */
	public List<CityViewDto> getCities() {
		return cities;
	}

	/**
	 * Allows to request a change of status of the list of cities
	 * @param cities
	 */
	public void setCities(List<CityViewDto> cities) {
		this.cities = cities;
	}

	/**
	 * @return a list of levels
	 */
	public List<LevelViewDto> getLevels() {
		return levels;
	}

	/**
	 * Allows to request a change of status of the list of levels
	 * @param levels
	 */
	public void setLevels(List<LevelViewDto> levels) {
		this.levels = levels;
	}

	/**
	 * @return a list of times
	 */
	public List<TimeViewDto> getTimes() {
		return times;
	}

	/**
	 * Allows to request a change of status of the list of times
	 * @param times
	 */
	public void setTimes(List<TimeViewDto> times) {
		this.times = times;
	}

	/**
	 * @return a list of sports
	 */
	public List<SportViewDto> getSports() {
		return sports;
	}

	/**
	 * Allows to request a change of status of the list of sports
	 * @param sports
	 */
	public void setSports(List<SportViewDto> sports) {
		this.sports = sports;
	}

}
