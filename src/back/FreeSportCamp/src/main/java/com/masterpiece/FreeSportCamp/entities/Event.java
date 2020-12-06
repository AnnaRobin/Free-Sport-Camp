package com.masterpiece.FreeSportCamp.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="events", indexes = {
	@Index(name = "events_city_id_IDX", columnList = "city_id" ),
	@Index(name = "events_time_id_IDX", columnList = "time_id" ),
	@Index(name = "events_level_id_IDX", columnList = "level_id" ),
	@Index(name = "events_sport_id_IDX", columnList = "sport_id" ),
	@Index(name = "events_organizer_id_IDX", columnList = "organizer_id")	
})
public class Event {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id", columnDefinition = "INT UNSIGNED")
	private Long id;
	
	@Column(name="appointment",  nullable = false)
	private LocalDateTime appointment;
	
	@Column(name="description", length=1000)
	private String description;
	
	@OneToOne(optional=false)
	@JoinColumn(nullable = false, name="city_id", foreignKey = @ForeignKey(name= "events_city_id_FK"))
	private City city;
	
	@OneToOne(optional=false)
	@JoinColumn(nullable = false, name="time_id", foreignKey = @ForeignKey(name= "events_time_id_FK"))
	private Time time;
	
	@OneToOne(optional=false)
	@JoinColumn(nullable = false, name="level_id", foreignKey = @ForeignKey(name= "events_level_id_FK"))
	private Level level;
	
	@OneToOne(optional=false)
	@JoinColumn(nullable = false, name="sport_id", foreignKey = @ForeignKey(name= "events_sport_id_FK"))
	private Sport sport;
	
	@OneToOne(optional=false)
	@JoinColumn(nullable = false, name="organizer_id", foreignKey = @ForeignKey(name= "events_organizer_id_FK"))
	private User organizer;

	public Event() {
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDateTime getAppointment() {
		return appointment;
	}

	public void setAppointment(LocalDateTime appointment) {
		this.appointment = appointment;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public City getCity() {
		return city;
	}

	public void setCity(City city) {
		this.city = city;
	}

	public Time getTime() {
		return time;
	}

	public void setTime(Time time) {
		this.time = time;
	}

	public Level getLevel() {
		return level;
	}

	public void setLevel(Level level) {
		this.level = level;
	}

	public Sport getSport() {
		return sport;
	}

	public void setSport(Sport sport) {
		this.sport = sport;
	}

	public User getOrganizer() {
		return organizer;
	}

	public void setOrganizer(User organizer) {
		this.organizer = organizer;
	}
	
	

}
