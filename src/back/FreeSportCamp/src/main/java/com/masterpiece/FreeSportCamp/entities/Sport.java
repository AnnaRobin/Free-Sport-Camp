package com.masterpiece.FreeSportCamp.entities;


import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="sports")
public class Sport extends AbstractEntity{

	public Sport() {}
	public Sport(Long id) {
		this.setId(id); 
	}

	
	
}


