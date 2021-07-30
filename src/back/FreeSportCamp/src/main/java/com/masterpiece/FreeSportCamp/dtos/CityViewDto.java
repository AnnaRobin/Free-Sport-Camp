package com.masterpiece.FreeSportCamp.dtos;

/**
 * @author Anna Cuilhé 
 * An interface representing a view of a {@code City}. 
 * Exposes getter methods which will be implemented by Spring.
 *
 */
public interface CityViewDto {

	/**
	 * @return the id of the city
	 */
	Long getId();

	/**
	 * @return the name of the city
	 */
	String getName();

	// String getZipCode();

}
