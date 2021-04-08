package com.masterpiece.FreeSportCamp.entities;

import java.time.LocalDate;

import java.time.LocalTime;
import java.util.Collection;
import java.util.List;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="events", indexes = {
	@Index(name = "events_city_id_IDX", columnList = "city_id" ),
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
	private LocalDate appointment;
	
	@Column(name="time",  nullable = false)
	private LocalTime time;
	
	@Column(name="description", length=1000)
	private String description;
	
	@ManyToOne(optional=false)
	@JoinColumn(nullable = false, name="city_id", foreignKey = @ForeignKey(name= "events_city_id_FK"))
	private City city;
	
	@ManyToOne(optional=false)
	@JoinColumn(nullable = false, name="level_id", foreignKey = @ForeignKey(name= "events_level_id_FK"))
	private Level level;
	
	@ManyToOne(optional=false)
	@JoinColumn(nullable = false, name="sport_id", foreignKey = @ForeignKey(name= "events_sport_id_FK"))
	private Sport sport;
	
	@OneToOne(optional=false)
	@JoinColumn(nullable = false, name="organizer_id", foreignKey = @ForeignKey(name= "events_organizer_id_FK"))
	private User organizer;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
	  name = "participations", 
	  joinColumns = @JoinColumn(name = "event_id"), 
	  inverseJoinColumns = @JoinColumn(name = "user_id"))
	Collection<User> subscribers;
	
	public Event() {
		
	}
	
	public Event(Long eventId) {
		this.id = eventId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getAppointment() {
		return appointment;
	}

	public void setAppointment(LocalDate appointment) {
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

	public LocalTime getTime() {
		return time;
	}

	public void setTime(LocalTime time) {
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
	
	public Collection<User> getSubscribers(){
		return this.subscribers;
	}
	
	public void setSubscribers(Collection<User> subscribers) {
		this.subscribers = subscribers;
	}
	

}
