package com.masterpiece.FreeSportCamp.entities;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class AbstractEntity {
	
	
	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)   
	@Column(name="id", length= 10, columnDefinition = "INT UNSIGNED")
	private Long id;
	
	@Column(name="name", nullable = false, length=45)
	private String name;

	protected AbstractEntity() {
		
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	

}
