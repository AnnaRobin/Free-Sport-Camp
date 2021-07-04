package com.masterpiece.FreeSportCamp.entities;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import java.time.LocalTime;

/**
 * @author Anna Cuilhé
 * The Time class mapped to the database
 *
 */
@Entity
@Table(name="time_slots")
public class Time extends AbstractEntity {

	@Column(name="min_time", nullable = false)  // Column specifications
	private LocalTime minTime;
	
	@Column(name="max_time", nullable = false)
	private LocalTime maxTime;


	public LocalTime getMinTime() {
		return minTime;
	}

	public void setMinTime(LocalTime minTime) {
		this.minTime = minTime;
	}

	public LocalTime getMaxTime() {
		return maxTime;
	}

	public void setMaxTime(LocalTime maxTime) {
		this.maxTime = maxTime;
	}

	
}
